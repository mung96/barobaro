import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['loremflickr.com', 'loremflickr.com', 'barobaro.s3.ap-northeast-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://j11a401.p.ssafy.io/api/:path*',
      }
    ]
  }
};

const pwaConfig = withPWA({
  dest: 'public',
  disable: false,
  register: true,
  skipWaiting: true,
});

export default pwaConfig(nextConfig);