/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.59.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
