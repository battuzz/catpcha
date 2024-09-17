const nextConfig = {
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    output: 'export',
    basePath: '/catpcha',
}

module.exports = nextConfig