import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cnfbjdozpfkqlxtqoudy.supabase.co',
      },
    ],
  },
};

export default nextConfig;
