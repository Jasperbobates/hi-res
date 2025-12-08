const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "gfx.nrk.no",
      },
    ],
  },
  // Bundle analyzer (uncomment to analyze bundle)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }
  //   return config;
  // },
  // Turbopack workspace root setting — ensures Next/Turbopack uses this
  // project directory as the workspace root and removes the warning
  turbopack: {
    root: path.join(__dirname),
  },
}

module.exports = nextConfig
