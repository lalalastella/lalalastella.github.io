import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.GITHUB_PAGES === 'true'
  ? { output: 'export', images: { unoptimized: true }, trailingSlash: true }
  : {};

export default nextConfig;
