// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.icons8.com', 'neufert-cdn.archdaily.net'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/styles/')],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    if (nextRuntime !== 'nodejs') return config
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
