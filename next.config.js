// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.icons8.com', 'neufert-cdn.archdaily.net', 'did-app-files.s3.amazonaws.com'],
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
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
