"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { EudaLogo } from "./euda-logo";

const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    {
        label: "Tools",
        children: [
            { label: "Tax Calculator — Spain", href: "/tax-calculator/spain" },
        ],
    },
    { label: "About", href: "#about" },
];

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Smooth scroll for anchor links
    function handleNavClick(href: string) {
        setMobileOpen(false);
        setToolsOpen(false);
        if (href.startsWith("#")) {
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
                <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <EudaLogo />
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) =>
                        link.children ? (
                            <div key={link.label} className="relative">
                                <button
                                    onClick={() => setToolsOpen(!toolsOpen)}
                                    onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
                                    className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {toolsOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {link.children.map((child) => (
                                            <a
                                                key={child.href}
                                                href={child.href}
                                                className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                                            >
                                                {child.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                key={link.label}
                                onClick={() => handleNavClick(link.href!)}
                                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </button>
                        )
                    )}
                    <button
                        onClick={() => handleNavClick("#waitlist")}
                        className="px-5 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-[#0e44b0] active:scale-[0.97] transition-all"
                    >
                        Join Waitlist
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
                        {navLinks.map((link) =>
                            link.children ? (
                                <div key={link.label}>
                                    <button
                                        onClick={() => setToolsOpen(!toolsOpen)}
                                        className="w-full flex items-center justify-between py-3 text-base font-semibold text-muted-foreground"
                                    >
                                        {link.label}
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {toolsOpen && (
                                        <div className="pl-4 space-y-1">
                                            {link.children.map((child) => (
                                                <a
                                                    key={child.href}
                                                    href={child.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavClick(link.href!)}
                                    className="w-full text-left py-3 text-base font-semibold text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => handleNavClick("#waitlist")}
                            className="w-full mt-2 px-5 py-3 bg-primary text-primary-foreground font-bold rounded-lg text-base"
                        >
                            Join Waitlist
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
