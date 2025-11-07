const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Update this URL to your production domain
const hostname = process.env.VITE_SITE_URL || 'https://yourdomain.com';

const sitemap = new SitemapStream({ hostname });

// All pages in the website
const pages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/pages/services.html', changefreq: 'monthly', priority: 0.9 },
  { url: '/pages/portfolio.html', changefreq: 'weekly', priority: 0.8 },
  { url: '/pages/gallery.html', changefreq: 'weekly', priority: 0.8 },
  { url: '/pages/about.html', changefreq: 'monthly', priority: 0.7 },
  { url: '/pages/contact.html', changefreq: 'monthly', priority: 0.9 },
  { url: '/pages/estimate.html', changefreq: 'monthly', priority: 0.9 },
];

pages.forEach((page) => sitemap.write(page));

sitemap.end();

streamToPromise(sitemap)
  .then((sm) => {
    createWriteStream('sitemap.xml').end(sm);
    console.log('✅ Sitemap generated successfully!');
  })
  .catch((err) => {
    console.error('❌ Error generating sitemap:', err);
    process.exit(1);
  });
