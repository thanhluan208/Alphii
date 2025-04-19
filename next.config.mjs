/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    output: 'standalone', 
    
    env: {
        BASE_URL: process.env.BASE_URL || "http://backend-default",
        GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY || ""
    },

    async rewrites() {
        // Ensure BASE_URL is defined with a fallback
        const baseUrl = process.env.BASE_URL || "http://backend-default";
        return [
          {
            source: '/app-service/:path*',
            destination: `${baseUrl}/:path*`
          },
        ]
    },
}

export default withNextIntl(nextConfig)
