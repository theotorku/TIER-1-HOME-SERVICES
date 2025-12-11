# Tier 1 Home Services

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)](https://vitejs.dev)

A modern, production-ready website for Tier 1 Home Services, specializing in remodeling bathrooms, kitchens, and flooring in the Dallas-Fort Worth area.

---

## ✨ Features

### Core Features
- �️ **Construction Theme**: Industrial aesthetic with "broken glass" background and rugged styling
- 🤖 **Smart Assistant**: Integrated chatbot with scheduling flow and FAQ awareness
- �🎨 **Modern Design**: Clean, professional design with CSS custom properties
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- ♿ **Accessible**: WCAG 2.1 compliant with ARIA labels and keyboard navigation
- ⚡ **Performance Optimized**: Vite build system with code splitting and minification
- 🔍 **SEO Ready**: Meta tags, Open Graph, structured data, and sitemap
- 🎭 **Interactive**: Service selection modals, Lightbox gallery, and smooth scrolling

### Technical Features
- 🛠️ **Modern Build System**: Vite for fast development and optimized production builds
- 📦 **Modular JavaScript**: ES6 modules with class-based architecture
- 🎯 **Code Quality**: ESLint and Prettier for consistent code style
- 🔒 **Security**: Environment variables, security headers, and form validation
- 📊 **Analytics Ready**: Google Analytics and Tag Manager support
- 🚀 **Deploy Ready**: Netlify and Vercel configurations included

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/theotorku/TIER-1-HOME-SERVICES.git
cd TIER-1-HOME-SERVICES

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
.
├── index.html                  # Homepage
├── pages/                      # Additional pages
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── gallery.html
│   ├── estimate.html
│   └── contact.html
├── styles/                     # Stylesheets
│   ├── variables.css          # CSS custom properties
│   ├── main.css               # Main styles
│   ├── utilities.css          # Utility classes
│   └── responsive.css         # Responsive styles
├── js/                        # JavaScript modules
│   ├── main.js                # Entry point
│   ├── navigation.js          # Navigation logic
│   ├── form-validation.js     # Form validation
│   ├── gallery.js             # Gallery lightbox
│   └── structured-data.js     # SEO structured data
├── images/                    # Images and assets
├── scripts/                   # Build scripts
│   └── generate-sitemap.js
├── vite.config.js            # Vite configuration
├── netlify.toml              # Netlify deployment config
├── vercel.json               # Vercel deployment config
├── .env.example              # Environment variables template
├── .eslintrc.json            # ESLint configuration
├── .prettierrc.json          # Prettier configuration
└── package.json              # Dependencies and scripts
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate sitemap
npm run generate-sitemap

# Lint JavaScript and HTML
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_SITE_URL=http://localhost:3000
VITE_SITE_NAME=Tier 1 Home Services
VITE_BUSINESS_PHONE=(555) 123-4567
VITE_BUSINESS_EMAIL=info@tier1homeservices.com
VITE_FORMSPREE_ID=your-formspree-id
```

---

## 🌐 Deployment

### Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or connect your Git repository in the Netlify dashboard.

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or import your repository in the Vercel dashboard.

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains production-ready files
# Upload to any static hosting service
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

---

## 📝 Configuration

### Update Site Information

1. **Environment Variables**: Edit `.env` with your business details
2. **Sitemap**: Update hostname in `scripts/generate-sitemap.js`
3. **Robots.txt**: Update sitemap URL in `robots.txt`
4. **Structured Data**: Update business info in `js/structured-data.js`

### Add Images

- Logo: `images/hero/logo/logo.png`
- Favicon: `images/hero/logo/favicon.ico`
- Portfolio: `images/hero/portfolio/project*/`
- Hero: `images/hero/hero-desktop.jpg`

---

## 🎨 Customization

### Colors and Theming

Edit `styles/variables.css` to customize colors, fonts, spacing, and more:

```css
:root {
  --color-primary: #004c6d;
  --color-primary-light: #0074a6;
  --font-family-primary: 'Segoe UI', sans-serif;
  /* ... more variables */
}
```

### Adding New Pages

1. Create HTML file in `pages/`
2. Add to `vite.config.js` rollupOptions.input
3. Add to `scripts/generate-sitemap.js`
4. Update navigation in all pages

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation works on mobile and desktop
- [ ] Forms validate and submit
- [ ] Gallery lightbox functions
- [ ] Images load properly
- [ ] No console errors

### Performance Testing

Run Lighthouse audit:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for Performance, Accessibility, SEO

Target scores: 90+ in all categories

---

## 📊 Analytics Setup

### Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `.env`: `VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X`
3. Add tracking code to HTML files

### Google Tag Manager

1. Get container ID from GTM
2. Add to `.env`: `VITE_GTM_ID=GTM-XXXXXXX`
3. Add GTM code to HTML files

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support

For issues or questions:
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Check [MODERNIZATION_SUMMARY.md](MODERNIZATION_SUMMARY.md) for technical details
- Open an issue on GitHub

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev)
- Icons from [Font Awesome](https://fontawesome.com)
- Deployed on [Netlify](https://netlify.com) / [Vercel](https://vercel.com)

---

**Version**: 2.0.0
**Last Updated**: 2025-12-11
**Status**: Production Ready

---

## 👷‍♂️ Built by Tier 1 Home Services
