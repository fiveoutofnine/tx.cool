/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ipfs.io', 'arweave.net'],
  },
  reactStrictMode: false,
  swcMinify: false,
  webpack5: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
};

module.exports = nextConfig;
