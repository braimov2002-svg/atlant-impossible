import path from 'node:path';
import type { NextConfig } from 'next';

// GitHub Pages serves project sites from /<repo>; the deploy workflow sets this.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const config: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ['@ovozyoz/core'],
  turbopack: { root: path.join(__dirname, '../..') },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default config;
