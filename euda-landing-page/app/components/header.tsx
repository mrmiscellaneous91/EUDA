"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, MessageCircle, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { EudaLogo } from "./euda-logo";

export function Header() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const otherLocale = locale === "en" ? "es" : "en";
    const localeLabel = locale === "en" ? "ES" : "EN";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function handleNavClick(href: string) {
        setMobileOpen(false);
        if (href.startsWith("#") && href !== "#") {
            const el = document.querySelector(href);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
                : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href={`/${locale === "en" ? "" : locale}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <EudaLogo />
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Tools dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setToolsOpen(true)}
                        onMouseLeave={() => setToolsOpen(false)}
                    >
                        <button
                            className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors py-4"
                        >
                            {t("tools")}
                            <ChevronDown
                                size={14}
                                className="transition-transform group-hover:rotate-180"
                            />
                        </button>
                        <div className="absolute top-full left-0 w-56 bg-card border border-border rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                            <a
                                href="/tax-calculator/spain"
                                className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                            >
                                {t("taxCalculator")}
                            </a>
                        </div>
                    </div>

                    {/* Community */}
                    <a
                        href="https://discord.gg/wVpEAtb3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                        <MessageCircle size={16} className="text-[#5865F2]" />
                        {t("community")}
                    </a>

                    {/* About */}
                    <a
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick("#about");
                        }}
                        className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                    >
                        {t("about")}
                    </a>

                    {/* Language toggle */}
                    <a
                        href={`/${otherLocale}`}
                        className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Globe size={16} />
                        {localeLabel}
                    </a>

                    <button
                        onClick={() => handleNavClick("#waitlist")}
                        className="px-5 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-[#0e44b0] active:scale-[0.97] transition-all"
                    >
                        {t("joinWaitlist")}
                    </button>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
                    <div className="px-6 py-4 space-y-1">
                        {/* Tools */}
                        <div>
                            <button
                                onClick={() => setToolsOpen(!toolsOpen)}
                                className="w-full flex items-center justify-between py-3 text-base font-semibold text-muted-foreground"
                            >
                                {t("tools")}
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {toolsOpen && (
                                <div className="pl-4 space-y-1">
                                    <a
                                        href="/tax-calculator/spain"
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {t("taxCalculator")}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Community */}
                        <a
                            href="https://discord.gg/wVpEAtb3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-left py-3 text-base font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
                        >
                            <MessageCircle size={20} className="text-[#5865F2]" />
                            {t("community")}
                        </a>

                        {/* About */}
                        <a
                            href="#about"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("#about");
                            }}
                            className="w-full text-left py-3 text-base font-semibold text-muted-foreground hover:text-primary transition-colors"
                        >
                            {t("about")}
                        </a>

                        {/* Language toggle */}
                        <a
                            href={`/${otherLocale}`}
                            className="w-full text-left py-3 text-base font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
                        >
                            <Globe size={20} />
                            {localeLabel === "ES" ? "🇪🇸 Español" : "🇬🇧 English"}
                        </a>

                        <button
                            onClick={() => handleNavClick("#waitlist")}
                            className="w-full mt-2 px-5 py-3 bg-primary text-primary-foreground font-bold rounded-lg text-base"
                        >
                            {t("joinWaitlist")}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
