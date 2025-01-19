/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    UPLOAD_DIR: process.env.UPLOAD_DIR,
  },
  // Remove the experimental options that are causing warnings
  experimental: {
    // Add any valid experimental options here if needed
  },
}

export default nextConfig;

