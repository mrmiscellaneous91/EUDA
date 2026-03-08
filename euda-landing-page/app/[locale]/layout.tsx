import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
    variable: "--font-dm-serif",
    weight: "400",
    style: ["normal", "italic"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "EUDA - Make Rent Work",
    description:
        "EUDA turns everyday spending, bill switching, and smart timing into automatic rent reductions.",
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon.png", type: "image/png" },
        ],
    },
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as 'en' | 'es')) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${inter.variable} ${dmSerif.variable} font-[family-name:var(--font-inter)]`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
