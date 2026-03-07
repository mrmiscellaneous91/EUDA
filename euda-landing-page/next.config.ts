import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        const taxCalcUrl = process.env.TAX_CALCULATOR_URL || 'https://euda-5gdk.vercel.app';
        return [
            {
                source: '/tax-calculator/spain',
                destination: `${taxCalcUrl}/`,
            },
            {
                source: '/tax-calculator/spain/:path*',
                destination: `${taxCalcUrl}/:path*`,
            },
        ];
    },
};

export default nextConfig;
