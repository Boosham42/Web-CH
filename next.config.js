/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      // Agrega más dominios aquí
    ],
  },
};

module.exports = nextConfig;
module.exports = {
  reactStrictMode: true,
  experimental: {},
}
