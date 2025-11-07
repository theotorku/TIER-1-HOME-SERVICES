/**
 * Structured Data (Schema.org) for SEO
 * Add this script to your HTML pages for better search engine understanding
 */

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Tier 1 Home Services',
  description:
    'Expert remodeling for bathrooms, kitchens, and flooring in the Dallas-Fort Worth area',
  url: 'https://yourdomain.com',
  telephone: '(555) 123-4567',
  email: 'info@tier1homeservices.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lewisville',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.046233,
    longitude: -96.994174,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 33.046233,
      longitude: -96.994174,
    },
    geoRadius: '50000', // 50km radius
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Home Remodeling Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bathroom Remodeling',
          description: 'Custom tile showers, modern vanities, updated fixtures, and waterproofing',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kitchen Remodeling',
          description: 'Layout redesigns, cabinets, countertops, and backsplashes',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Flooring Installation',
          description: 'Professional installation of tile, hardwood, vinyl, and laminate',
        },
      },
    ],
  },
};

// Function to inject structured data into the page
function injectStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(businessSchema);
  document.head.appendChild(script);
}

// Auto-inject when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStructuredData);
} else {
  injectStructuredData();
}

export { businessSchema, injectStructuredData };
