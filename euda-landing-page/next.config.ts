import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
    async rewrites() {
        const taxCalcUrl = process.env.TAX_CALCULATOR_URL || 'https://euda-5gdk.vercel.app';
        return [
            {
                source: '/tax-calculator/spain',
                destination: `${taxCalcUrl}/tax-calculator/spain/`,
            },
            {
                source: '/tax-calculator/spain/:path*',
                destination: `${taxCalcUrl}/tax-calculator/spain/:path*`,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
