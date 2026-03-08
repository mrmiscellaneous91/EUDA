import {
    CheckCircle2,
    MessageCircle,
    ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { EudaLogoMuted } from "../components/euda-logo";
import { Header } from "../components/header";
import { WaitlistForm } from "../components/waitlist-form";

export default function Page() {
    const t = useTranslations();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* Navigation */}
            <Header />

            <main className="max-w-7xl mx-auto px-6 pb-24 space-y-32">
                {/* Hero Section */}
                <section className="pt-8 md:pt-24 space-y-10 text-center">
                    <div className="space-y-6 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-balance">
                            {t("hero.headline")}
                            <br />
                            <span className="text-primary font-[family-name:var(--font-dm-serif)] italic text-4xl md:text-5xl">
                                {t("hero.headline2")}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed text-balance">
                            {t("hero.subheadline")}{" "}
                            <span className="text-foreground font-semibold">
                                {t("hero.subheadlineBold")}
                            </span>
                        </p>
                    </div>

                    <WaitlistForm id="waitlist" />
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="scroll-mt-24 space-y-12">
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            {t("howItWorks.title")}
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="bg-muted/50 rounded-2xl border border-border p-8 md:p-12 space-y-6 relative overflow-hidden group text-center">
                            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                                {t("howItWorks.p1")}{" "}
                                <span className="text-primary font-bold">{t("howItWorks.rentPot")}</span>.
                            </p>
                            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                                {t("howItWorks.p2")}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-sm font-semibold">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    {t("howItWorks.noFees")}
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-sm font-semibold">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    {t("howItWorks.noCatches")}
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-sm font-semibold">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    {t("howItWorks.landlord")}
                                </div>
                            </div>
                            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/8 transition-colors" />
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="max-w-3xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-3 bg-muted/50 border border-border rounded-full px-6 py-3">
                        <div className="flex -space-x-1.5">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-6 h-6 rounded-full bg-primary/70 border-2 border-background"
                                />
                            ))}
                        </div>
                        <p className="text-sm font-semibold text-muted-foreground">
                            {t("socialProof.text")}
                        </p>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="scroll-mt-24">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">
                            {t("about.title")}
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed text-center">
                            <p>{t("about.p1")}</p>
                            <p>
                                {t("about.p2pre")}{" "}
                                <span className="text-foreground font-bold">
                                    {t("about.p2bold")}
                                </span>{" "}
                                {t("about.p2post")}
                            </p>
                            <p>{t("about.p3")}</p>
                            <p>
                                {t("about.p4pre")}{" "}
                                <span className="text-primary font-bold">{t("howItWorks.rentPot")}</span>{" "}
                                {t("about.p4post")}
                            </p>
                            <p className="text-foreground font-semibold">
                                {t("about.p5")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-muted py-24 rounded-2xl px-6 text-center space-y-12">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-4xl md:text-6xl font-extrabold leading-none tracking-tight">
                            {t("cta.headline")}
                            <br />
                            <span className="text-primary font-[family-name:var(--font-dm-serif)] italic">
                                {t("cta.headline2")}
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#waitlist"
                            className="px-10 py-5 bg-primary text-primary-foreground font-extrabold rounded-xl text-xl hover:bg-[#0e44b0] hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-3"
                        >
                            {t("cta.joinWaitlist")}
                            <ArrowRight size={20} />
                        </a>
                        <a
                            href="https://discord.gg/wVpEAtb3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-5 bg-card border-2 border-border text-foreground font-extrabold rounded-xl text-xl hover:bg-muted transition-all flex items-center gap-3 active:scale-95"
                        >
                            <MessageCircle size={24} className="text-[#5865F2]" />
                            {t("cta.joinCommunity")}
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <EudaLogoMuted />
                    <nav className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">
                            {t("footer.terms")}
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            {t("footer.privacy")}
                        </a>
                        <a
                            href="mailto:hello@euda.dev"
                            className="hover:text-primary transition-colors"
                        >
                            {t("footer.contact")}
                        </a>
                    </nav>
                    <p className="text-xs text-muted-foreground font-medium">
                        {t("footer.copyright")}
                    </p>
                </div>
            </footer>
        </div>
    );
}
