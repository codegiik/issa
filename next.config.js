/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const ContentSecurityPolicy = `
    frame-src 'self' blob: *.reteissa.it reteissa.it;
`;

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
    },
];

const nextConfig = withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: true,
    async headers() {
        const headers = [];
        if (process.env.NODE_ENV === 'production')
            headers.push({
                source: '/:path*',
                headers: securityHeaders,
            });

        return headers;
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/uploads/:path*`,
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/old',
                destination: 'https://old.reteissa.it',
                permanent: true,
            },
            {
                source: '/statuto',
                destination: '/articolo/statuto',
                permanent: true,
            },
        ];
    },
});

module.exports = nextConfig;
