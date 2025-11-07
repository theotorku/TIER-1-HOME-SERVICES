# Deployment Guide - Tier 1 Home Services

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Account on deployment platform (Netlify, Vercel, or similar)

---

## Environment Setup

### 1. Configure Environment Variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

```env
# Production URL (update before deploying)
VITE_SITE_URL=https://yourdomain.com

# Contact Information
VITE_BUSINESS_PHONE=(555) 123-4567
VITE_BUSINESS_EMAIL=info@tier1homeservices.com
VITE_BUSINESS_ADDRESS=Lewisville, TX
VITE_BUSINESS_HOURS=Mon–Sat: 8:00am – 6:00pm

# Form Configuration (get from https://formspree.io)
VITE_FORMSPREE_ID=your-actual-formspree-id

# Analytics (optional)
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
VITE_GTM_ID=GTM-XXXXXXX
```

### 2. Update Sitemap Generator

Edit `scripts/generate-sitemap.js` and update the hostname:

```javascript
const sitemap = new SitemapStream({ hostname: 'https://yourdomain.com' });
```

### 3. Update robots.txt

Edit `robots.txt` and update the sitemap URL:

```
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Local Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Run Code Quality Checks

```bash
# Lint JavaScript and HTML
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

---

## Building for Production

### 1. Build the Project

```bash
npm run build
```

This will:
- Bundle and minify JavaScript
- Optimize CSS
- Process images
- Generate production-ready files in `dist/` directory

### 2. Generate Sitemap

```bash
npm run generate-sitemap
```

### 3. Preview Production Build

```bash
npm run preview
```

The production build will be available at `http://localhost:4173`

---

## Deployment Options

### Option 1: Netlify (Recommended)

#### Via Netlify CLI:

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize site:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

#### Via Netlify UI:

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variables in Netlify dashboard
7. Deploy!

### Option 2: Vercel

#### Via Vercel CLI:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. For production:
```bash
vercel --prod
```

#### Via Vercel UI:

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite configuration
6. Add environment variables
7. Deploy!

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

---

## Environment Variables in Deployment Platforms

### Netlify:
1. Go to Site Settings > Build & Deploy > Environment
2. Add each variable from `.env`
3. Redeploy the site

### Vercel:
1. Go to Project Settings > Environment Variables
2. Add each variable from `.env`
3. Redeploy the site

---

## Post-Deployment Checklist

### 1. Verify Deployment
- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Navigation works on mobile and desktop
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] No console errors

### 2. Test Functionality
- [ ] Contact form works
- [ ] Estimate form works
- [ ] Gallery lightbox works
- [ ] Mobile menu toggles correctly
- [ ] All links work

### 3. SEO & Performance
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt
- [ ] Verify meta tags on all pages
- [ ] Test social media sharing (Open Graph)

### 4. Analytics Setup (Optional)

#### Google Analytics:
1. Create GA4 property
2. Get tracking ID
3. Add to `.env` as `VITE_GA_TRACKING_ID`
4. Add tracking code to HTML files

#### Google Tag Manager:
1. Create GTM container
2. Get container ID
3. Add to `.env` as `VITE_GTM_ID`
4. Add GTM code to HTML files

---

## Custom Domain Setup

### Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS:
   - Add A record: `75.2.60.5`
   - Add CNAME: `www` → `your-site.netlify.app`
4. Enable HTTPS (automatic)

### Vercel:
1. Go to Project Settings > Domains
2. Add custom domain
3. Configure DNS as instructed
4. HTTPS is automatic

---

## Continuous Deployment

Both Netlify and Vercel support automatic deployments:

1. Push to `main` branch → Production deployment
2. Push to other branches → Preview deployments
3. Pull requests → Preview deployments with unique URLs

---

## Monitoring & Maintenance

### Regular Tasks:
- Update dependencies monthly: `npm update`
- Check for security vulnerabilities: `npm audit`
- Review analytics for user behavior
- Update content as needed
- Monitor form submissions

### Performance Monitoring:
- Use Lighthouse CI for automated audits
- Monitor Core Web Vitals
- Check uptime with monitoring service

---

## Troubleshooting

### Build Fails:
1. Check Node.js version (should be 18+)
2. Clear cache: `rm -rf node_modules package-lock.json && npm install`
3. Check for syntax errors: `npm run lint`

### Forms Not Working:
1. Verify Formspree ID is correct
2. Check environment variables are set
3. Test form action URL directly

### Images Not Loading:
1. Check image paths are correct
2. Verify images are in `images/` directory
3. Check file extensions match

### Styles Not Applied:
1. Verify CSS files are imported
2. Check for CSS syntax errors
3. Clear browser cache

---

## Support Resources

- **Vite Documentation**: https://vitejs.dev
- **Netlify Documentation**: https://docs.netlify.com
- **Vercel Documentation**: https://vercel.com/docs
- **Formspree Documentation**: https://help.formspree.io

---

## Security Best Practices

1. **Never commit `.env` file** (already in `.gitignore`)
2. **Use HTTPS only** (automatic with Netlify/Vercel)
3. **Keep dependencies updated**: `npm update`
4. **Review security advisories**: `npm audit`
5. **Use strong CSP headers** (configured in `netlify.toml`/`vercel.json`)

---

**Last Updated**: 2025-11-07
**Version**: 2.0.0

