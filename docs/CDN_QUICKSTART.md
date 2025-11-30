# CDN Templates (Quick Start)

## 1. Build Templates for CDN

```bash
npm run build:cdn
```

This creates `cdn-templates/` with JSON files ready for CDN deployment.

## 2. Deploy to GitHub (Easiest)

```bash
# Create a new repo on GitHub: buildbot-templates
git init cdn-templates
cd cdn-templates
git add .
git commit -m "Initial templates"
git remote add origin https://github.com/YOUR_USERNAME/buildbot-templates.git
git push -u origin main
```

## 3. Configure BuildBot

Add to `apps/web/.env.local`:

```bash
NEXT_PUBLIC_ENABLE_TEMPLATE_CDN=true
NEXT_PUBLIC_TEMPLATE_CDN=https://cdn.jsdelivr.net/gh/YOUR_USERNAME/buildbot-templates@main
```

## 4. Test

Restart your dev server and generate a project. Templates will now load from CDN!

---

For detailed instructions, see [cdn-deployment.md](./cdn-deployment.md)
