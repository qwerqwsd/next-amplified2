/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  async rewrites() {
    return [
      {
        source: "/api/reservations",
        destination:
          "http://k8s-default-reservat-355f9e5cb9-1740881489.ap-northeast-2.elb.amazonaws.com/reservations", // Proxy to Backend
      },
      {
        source: "/api/recommend",
        destination:
          "http://k8s-default-reservat-355f9e5cb9-1740881489.ap-northeast-2.elb.amazonaws.com/recommend", // Proxy to Backend
      },
    ];
  },

  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
