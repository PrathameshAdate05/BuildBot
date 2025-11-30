#!/usr/bin/env node

/**
 * Build script to convert templates to CDN-ready JSON format
 * Usage: node scripts/build-cdn-templates.js
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'packages', 'templates');
const OUTPUT_DIR = path.join(__dirname, '..', 'cdn-templates');
const TEMPLATES = ['nextjs-starter', 'react-spa', 'node-express'];

/**
 * Read all files from a template directory
 */
function readTemplateFiles(templateName) {
  const templateDir = path.join(TEMPLATES_DIR, templateName);
  const files = [];

  function walkDir(dir, baseDir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      // Skip node_modules and hidden files
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);
      
      if (entry.isDirectory()) {
        walkDir(fullPath, baseDir);
      } else {
        const content = fs.readFileSync(fullPath);
        const isBinary = isBinaryFile(entry.name);
        
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

/**
 * Check if file is binary
 */
function isBinaryFile(filename) {
  const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip', '.woff', '.woff2', '.ttf', '.eot'];
  return binaryExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

/**
 * Build all templates
 */
function buildTemplates() {
  console.log('🚀 Building CDN templates...\n');

  // Create output directory
  const latestDir = path.join(OUTPUT_DIR, 'latest');
  fs.mkdirSync(latestDir, { recursive: true });

  const versions = [];

  TEMPLATES.forEach(templateName => {
    console.log(`📦 Building ${templateName}...`);
    
    try {
      const files = readTemplateFiles(templateName);
      
      // Save to latest
      const outputPath = path.join(latestDir, `${templateName}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
      
      console.log(`   ✓ Built ${files.length} files`);
      console.log(`   ✓ Saved to ${path.relative(process.cwd(), outputPath)}\n`);
      
      versions.push(templateName);
    } catch (error) {
      console.error(`   ✗ Error building ${templateName}:`, error.message);
    }
  });

  // Create versions manifest
  const versionsPath = path.join(OUTPUT_DIR, 'versions.json');
  fs.writeFileSync(versionsPath, JSON.stringify({
    latest: versions,
    updated: new Date().toISOString()
  }, null, 2));

  console.log('✅ All templates built successfully!');
  console.log(`📁 Output directory: ${path.relative(process.cwd(), OUTPUT_DIR)}`);
  console.log('\n📝 Next steps:');
  console.log('   1. Push cdn-templates/ to your CDN or GitHub');
  console.log('   2. Set NEXT_PUBLIC_TEMPLATE_CDN in .env.local');
  console.log('   3. Set NEXT_PUBLIC_ENABLE_TEMPLATE_CDN=true');
}

// Run the build
buildTemplates();
