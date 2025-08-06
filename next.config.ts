import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
