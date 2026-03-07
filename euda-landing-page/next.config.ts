import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/tax-calculator/:path*',
                destination: `${process.env.TAX_CALCULATOR_URL || 'https://euda-gtm-tax-calculator.vercel.app'}/tax-calculator/:path*`,
            },
        ];
    },
};

export default nextConfig;
