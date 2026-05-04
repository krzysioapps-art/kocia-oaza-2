/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "192.168.1.14",
    "192.168.1.17",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hosting.photobucket.com",
      },
      {
        protocol: "https",
        hostname: "pleso.me",
      },
    ],
  },
};

module.exports = nextConfig;