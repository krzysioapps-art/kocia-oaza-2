/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "192.168.1.14",
    "192.168.1.17",
  ],

  turbopack: {},

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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, s-maxage=60",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;