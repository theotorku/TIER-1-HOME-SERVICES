const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const sitemap = new SitemapStream({ hostname: 'https://yourdomain.com' });

[
  '/',
  '/pages/services.html',
  '/pages/portfolio.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/estimate.html'
].forEach(url => sitemap.write({ url }));

sitemap.end();

streamToPromise(sitemap).then(sm =>
  createWriteStream('sitemap.xml').end(sm)
);