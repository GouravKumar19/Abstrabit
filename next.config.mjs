/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Suppress the specific warning about big strings serialization
        config.infrastructureLogging = {
            level: 'error',
        };
        return config;
    },
};

export default nextConfig;
