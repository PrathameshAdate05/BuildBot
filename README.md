# BuildBot - CDN-Only Architecture

BuildBot now uses a **CDN-only architecture** for template delivery. Templates are no longer bundled with the web application.

## Why CDN-Only?

✅ **Smaller Bundle Size** - Web app is much lighter  
✅ **Faster Updates** - Update templates without redeploying  
✅ **Better Scalability** - CDN handles millions of requests  
✅ **Version Control** - Easy to version and rollback templates  
✅ **Global Performance** - Edge caching for fast delivery worldwide  

## Setup Required

### 1. Build Templates

```bash
npm run build:cdn
```

This creates `cdn-templates/` directory with JSON files.

### 2. Deploy to CDN

**Option A: GitHub + jsDelivr (Recommended - Free)**

```bash
cd cdn-templates
git init
git add .
git commit -m "BuildBot templates"
git remote add origin https://github.com/YOUR_USERNAME/buildbot-templates.git
git push -u origin main
```

**Option B: Other CDN providers**

See [docs/cdn-deployment.md](./docs/cdn-deployment.md) for Vercel Blob, Cloudflare R2, or AWS S3.

### 3. Configure Environment

Create `apps/web/.env.local`:

```bash
# For GitHub + jsDelivr
NEXT_PUBLIC_TEMPLATE_CDN=https://cdn.jsdelivr.net/gh/YOUR_USERNAME/buildbot-templates@main
```

### 4. Start Development

```bash
npm run dev
```

## Template Structure

Templates are stored as JSON files in the CDN:

```
cdn-templates/
├── latest/
│   ├── nextjs-starter.json
│   ├── react-spa.json
│   └── node-express.json
└── versions.json
```

Each JSON file contains an array of template files with their paths and contents.

## Updating Templates

1. Modify templates in `packages/templates/`
2. Run `npm run build:cdn`
3. Push `cdn-templates/` to your CDN repository
4. Changes are live immediately (respects CDN cache TTL)

## Troubleshooting

### "NEXT_PUBLIC_TEMPLATE_CDN is not configured"

Set the environment variable in `apps/web/.env.local`:

```bash
NEXT_PUBLIC_TEMPLATE_CDN=https://your-cdn-url.com
```

### Templates not loading

1. Check CDN URL is correct
2. Verify templates are deployed to CDN
3. Check browser console for errors
4. Test CDN URL directly in browser

### CDN is slow

1. Use a CDN with edge locations near your users
2. Enable compression (gzip/brotli)
3. Set appropriate cache headers
4. Consider using multiple CDN providers

## Development

For local development, you can use the built templates:

```bash
# Build templates
npm run build:cdn

# Serve locally (in another terminal)
cd cdn-templates
npx serve -p 3001

# Configure .env.local
NEXT_PUBLIC_TEMPLATE_CDN=http://localhost:3001
```

## Production Deployment

1. Deploy templates to production CDN
2. Set `NEXT_PUBLIC_TEMPLATE_CDN` in Vercel/production environment
3. Deploy web app
4. Templates are fetched from CDN on demand

## Cost

Using GitHub + jsDelivr is **100% free** with unlimited bandwidth.

For other providers, see [docs/cdn-deployment.md](./docs/cdn-deployment.md) for cost comparison.
