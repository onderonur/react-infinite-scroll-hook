/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/react-infinite-scroll-hook',
  images: {
    unoptimized: true,
  },
  eslint: {
    dirs: [
      'src',
      'lint-staged.config.mjs',
      'postcss.config.js',
      'tailwind.config.ts',
    ],
  },
};

export default nextConfig;
