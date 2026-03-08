import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for API routes, static files, and tax calculator rewrites
    matcher: ['/', '/(en|es)/:path*', '/((?!api|_next|_vercel|tax-calculator|.*\\..*).*)']
};
