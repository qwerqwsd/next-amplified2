// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "https://www.taehyun35802.shop/:path*",
//       },
//       {
//         source: "/api/reservations",
//         destination: "https://www.taehyun35802.shop/reservation", // Proxy to Backend
//       },
//       {
//         source: "/api/recommend",
//         destination: "https://www.taehyun35802.shop/recommend",
//       },
//     ];
//   },

//   trailingSlash: true,
//   output: "export",
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://k8s-default-bookstor-601da9da3c-14882156.ap-northeast-2.elb.amazonaws.com/:path*`,
      },
    ];
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports;
