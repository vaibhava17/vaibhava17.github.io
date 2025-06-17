/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["github.com", "avatars.githubusercontent.com"],
    formats: ["image/webp", "image/avif"],
  },
  // Environment variables for build
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // Redirects
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/vaibhava17",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://linkedin.com/in/vaibhava17",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/heyvybav",
        permanent: true,
      },
    ];
  },
  // Rewrites for API routes
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
