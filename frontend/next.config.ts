import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

  images: {
    domains: [
        'picsum.photos',         // örnek görseller
      'res.cloudinary.com',    // Cloudinary gibi CDN'ler
      'images.unsplash.com',   // Unsplash görselleri
      'cdn.shopify.com',       // Shopify ürün görselleri
      'copilot.microsoft.com'
      
    ],
  },
};

export default nextConfig;
