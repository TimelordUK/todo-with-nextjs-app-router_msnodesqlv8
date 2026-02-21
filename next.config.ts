import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This is the key setting for native Node.js addons like msnodesqlv8.
  // It tells Next.js to keep these packages server-side only and not
  // attempt to bundle the native .node binary with webpack.
  serverExternalPackages: ['msnodesqlv8'],
}

export default nextConfig
