# CDN Template Deployment Guide

This guide explains how to deploy BuildBot templates to a CDN for faster, scalable template delivery.

## Quick Start (Recommended: GitHub + jsDelivr)

The easiest way to get started is using GitHub as your source and jsDelivr as the CDN.

### Step 1: Create a Templates Repository

```bash
# Create a new repository for templates
mkdir buildbot-templates
cd buildbot-templates
git init

# Copy templates
cp -r /path/to/BuildBot/packages/templates/* .

# Create versions directory
mkdir -p versions/latest
```

### Step 2: Convert Templates to JSON

Create a script to convert template files to JSON format:

```bash
# scripts/build-templates.js
const fs = require('fs');
const path = require('path');

const TEMPLATES = ['nextjs-starter', 'react-spa', 'node-express'];

function readTemplateFiles(templateName) {
  const templateDir = path.join(__dirname, '..', templateName);
  const files = [];

  function walkDir(dir, baseDir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);
      
      if (entry.isDirectory()) {
        walkDir(fullPath, baseDir);
      } else {
        const content = fs.readFileSync(fullPath);
        const isBinary = /\.(png|jpg|jpeg|gif|ico|pdf|zip)$/i.test(entry.name);
        
        files.push({
          path: relativePath,
          content: isBinary ? content.toString('base64') : content.toString('utf-8'),
          isBinary
        });
      }
    }
  }
  
  walkDir(templateDir, templateDir);
  return files;
}

// Build all templates
TEMPLATES.forEach(templateName => {
  console.log(`Building ${templateName}...`);
  const files = readTemplateFiles(templateName);
  
  // Save to versions/latest
  const outputPath = path.join(__dirname, '..', 'versions', 'latest', `${templateName}.json`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
  
  console.log(`✓ Built ${templateName} (${files.length} files)`);
});

console.log('✓ All templates built successfully!');
```

### Step 3: Run Build Script

```bash
# Add to package.json
{
  "scripts": {
    "build": "node scripts/build-templates.js"
  }
}

# Run it
npm run build
```

### Step 4: Push to GitHub

```bash
git add .
git commit -m "Add BuildBot templates"
git push origin main
```

### Step 5: Configure BuildBot

Update your `.env.local`:

```bash
NEXT_PUBLIC_ENABLE_TEMPLATE_CDN=true
NEXT_PUBLIC_TEMPLATE_CDN=https://cdn.jsdelivr.net/gh/yourusername/buildbot-templates@main/versions
```

That's it! jsDelivr will automatically serve your templates via CDN.

---

## Option 2: Vercel Blob Storage

If you're deploying on Vercel, use Vercel Blob for template storage.

### Setup

```bash
npm install @vercel/blob
```

### Upload Script

```typescript
// scripts/upload-to-vercel.ts
import { put } from '@vercel/blob';
import fs from 'fs';

async function uploadTemplate(templateName: string) {
  const files = readTemplateFiles(templateName); // Use function from above
  const blob = await put(
    `templates/${templateName}/latest.json`,
    JSON.stringify(files),
    { access: 'public' }
  );
  
  console.log(`Uploaded ${templateName}: ${blob.url}`);
  return blob.url;
}
```

### Configure

```bash
NEXT_PUBLIC_ENABLE_TEMPLATE_CDN=true
NEXT_PUBLIC_TEMPLATE_CDN=https://your-blob-url.vercel-storage.com
```

---

## Option 3: Cloudflare R2 + CDN

For production-grade setup with Cloudflare.

### Setup R2 Bucket

1. Go to Cloudflare Dashboard → R2
2. Create bucket: `buildbot-templates`
3. Enable public access

### Upload with Wrangler

```bash
npm install -g wrangler

# Upload templates
wrangler r2 object put buildbot-templates/templates/nextjs-starter/latest.json \
  --file=./versions/latest/nextjs-starter.json
```

### Configure

```bash
NEXT_PUBLIC_ENABLE_TEMPLATE_CDN=true
NEXT_PUBLIC_TEMPLATE_CDN=https://pub-xxxxx.r2.dev
```

---

## Option 4: AWS S3 + CloudFront

Enterprise-grade setup.

### Create S3 Bucket

```bash
aws s3 mb s3://buildbot-templates
aws s3 sync ./versions/latest s3://buildbot-templates/templates/ --acl public-read
```

### Create CloudFront Distribution

1. Origin: Your S3 bucket
2. Enable caching
3. Set TTL to 3600 seconds

### Configure

```bash
NEXT_PUBLIC_ENABLE_TEMPLATE_CDN=true
NEXT_PUBLIC_TEMPLATE_CDN=https://d1234567890.cloudfront.net/templates
```

---

## Automation with GitHub Actions

Automatically build and deploy templates on push:

```yaml
# .github/workflows/deploy-templates.yml
name: Deploy Templates

on:
  push:
    branches: [main]
    paths:
      - 'packages/templates/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Build templates
        run: npm run build
      
      - name: Deploy to CDN
        run: |
          # Option 1: Commit to templates repo
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add versions/
          git commit -m "Update templates [skip ci]"
          git push
          
          # Option 2: Upload to S3
          # aws s3 sync ./versions/latest s3://buildbot-templates/
          
          # Option 3: Upload to Vercel Blob
          # node scripts/upload-to-vercel.js
```

---

## Testing Your CDN Setup

```bash
# Test if CDN is working
curl https://cdn.jsdelivr.net/gh/yourusername/buildbot-templates@main/versions/latest/nextjs-starter.json

# Should return JSON with template files
```

---

## Versioning Templates

Create versioned releases:

```bash
# Tag a version
git tag v1.0.0
git push origin v1.0.0

# Use in BuildBot
NEXT_PUBLIC_TEMPLATE_CDN=https://cdn.jsdelivr.net/gh/yourusername/buildbot-templates@v1.0.0/versions/latest
```

---

## Best Practices

1. **Cache Headers**: Set appropriate cache headers (1 hour recommended)
2. **Compression**: Enable gzip/brotli compression
3. **Versioning**: Use git tags for stable versions
4. **Monitoring**: Track CDN hits and errors
5. **Fallback**: Always keep local templates as fallback

---

## Troubleshooting

### Templates not loading from CDN

1. Check browser console for CORS errors
2. Verify CDN URL is correct
3. Test URL directly in browser
4. Check environment variables are set

### Slow CDN performance

1. Use a CDN with edge locations near your users
2. Enable compression
3. Set longer cache TTL
4. Consider using multiple CDN providers

---

## Cost Comparison

| Provider | Free Tier | Cost After |
|----------|-----------|------------|
| jsDelivr (GitHub) | Unlimited | Free |
| Vercel Blob | 500MB | $0.15/GB |
| Cloudflare R2 | 10GB | $0.015/GB |
| AWS S3 + CloudFront | 5GB | $0.09/GB |

**Recommendation**: Start with jsDelivr (free), upgrade to Cloudflare R2 for production.
