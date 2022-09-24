/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: '/old',
                destination: 'https://old.reteissa.it',
                permanent: true,
            },
            {
                source: '/statuto',
                destination: '/articolo/2',
                permanent: true,
            },
        ];
    },
});

module.exports = nextConfig;
