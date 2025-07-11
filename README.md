# Tier One Home Services

A modern, responsive website for Tier One Home Services, specializing in remodeling bathrooms, kitchens, and flooring in the Dallas-Fort Worth area.

---

## 🚀 Features

- Responsive design for all devices
- Accessible navigation and forms
- SEO optimized (meta tags, Open Graph, sitemap, robots.txt)
- Automated sitemap generation
- Easy to update and maintain
- Interactive hamburger menu for mobile navigation
- Dedicated Gallery page with lightbox functionality
- Modern horizontal header with logo (PNG supported)

---

## 📁 Project Structure

```
.
├── index.html
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── estimate.html
│   ├── contact.html
│   └── gallery.html
├── styles/
│   ├── main.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── form-validation.js
│   └── gallery.js
├── images/
│   └── hero/
│       ├── logo/
│       │   ├── logo.png
│       │   └── favicon.ico
│       ├── hero-desktop.jpg
│       ├── portfolio/
│       │   ├── project1/
│       │   ├── project2/
│       │   └── project3/
│       └── team/
├── scripts/
│   └── generate-sitemap.js
├── sitemap.xml
├── robots.txt
├── package.json
└── README.md
```

---

## 🛠️ Development

**Start local dev server:**

```bash
npm run dev
```

**Generate sitemap:**

```bash
npm run generate-sitemap
```

**Update images:**

- Place your logo in `images/hero/logo/logo.png`.
- Add gallery/portfolio images in the respective folders under `images/hero/portfolio/`.

**Navigation:**

- Hamburger menu is interactive on mobile screens.
- Gallery page is accessible from the main navigation.

---

## 🌐 Deployment

- Update `sitemap.xml` and `robots.txt` with your live domain before deploying.
- Deploy to Netlify, Vercel, or your preferred static hosting.

---

## 📄 License

MIT

---

## 👷‍♂️ Built by Tier One Home Services
