/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const ContentSecurityPolicy = `
    frame-src 'self' blob: *.reteissa.it;
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
