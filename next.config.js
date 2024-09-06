/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://54.180.232.29:8080/:path*", // Proxy to the external server
      },
    ];
  },
};
