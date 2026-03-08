import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { EudaLogoMuted } from "./components/euda-logo";
import { Header } from "./components/header";
import { WaitlistForm } from "./components/waitlist-form";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <Header />

      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-32">
        {/* Hero Section */}
        <section className="pt-8 md:pt-24 space-y-10 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-balance">
              You&apos;ve paid tens of thousands in rent.
              <br />
              <span className="text-primary font-[family-name:var(--font-dm-serif)] italic">
                What do you have to show for it?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed text-balance">
              EUDA is the first platform that takes a slice of what rent costs
              you and puts it somewhere it can grow. You pay the same. Your
              landlord gets the same.{" "}
              <span className="text-foreground font-semibold">
                You just stop leaving empty-handed.
              </span>
            </p>
          </div>

          <WaitlistForm id="waitlist" />
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="scroll-mt-24 space-y-12"
        >
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              How it Works
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-muted/50 rounded-2xl border border-border p-8 md:p-12 space-y-6 relative overflow-hidden group">
              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                Every month you pay rent through EUDA, a portion goes into your{" "}
                <span className="text-primary font-bold">Rent Pot</span> — built
                from interest, savings on utilities, and cashback on local
                spending.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                It adds up quietly. After two years, you have real money that
                came entirely from rent you were already paying.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-sm font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  No fees
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-sm font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  No catches
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-sm font-semibold">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Your landlord doesn&apos;t need to do anything
                </div>
              </div>
              <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/8 transition-colors" />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-muted/50 border border-border rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                >
                  <span className="text-[10px] font-bold text-primary">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              Built by lifelong renters who are done watching it disappear.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">
              About EUDA
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
              <p>
                Renting was supposed to be temporary. For most of us, it
                isn&apos;t anymore.
              </p>
              <p>
                The average renter spends{" "}
                <span className="text-foreground font-bold">
                  40% of their take-home pay
                </span>{" "}
                on rent. None of it comes back.
              </p>
              <p>
                EUDA doesn&apos;t change what you pay. It changes what happens to
                it.
              </p>
              <p>
                We intercept a small portion of what was already leaving — from
                interest on your payment, from utility switches, from local
                spending — and we put it in a{" "}
                <span className="text-primary font-bold">Rent Pot</span> with
                your name on it. It&apos;s yours. It moves with you when you
                move. And it grows every single month, whether you think about it
                or not.
              </p>
              <p className="text-foreground font-semibold">
                We&apos;re building this now. If you&apos;re a renter who&apos;s
                done watching rent disappear, get on the list.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-muted py-24 rounded-2xl px-6 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-none tracking-tight">
              Be one of the first renters
              <br />
              <span className="text-primary font-[family-name:var(--font-dm-serif)] italic">
                to lower your rent.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#waitlist"
              className="px-10 py-5 bg-primary text-primary-foreground font-extrabold rounded-xl text-xl hover:bg-[#0e44b0] hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-3"
            >
              Join the Waitlist
              <ArrowRight size={20} />
            </a>
            <a
              href="https://discord.gg/wVpEAtb3"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-card border-2 border-border text-foreground font-extrabold rounded-xl text-xl hover:bg-muted transition-all flex items-center gap-3 active:scale-95"
            >
              <MessageCircle size={24} className="text-[#5865F2]" />
              Join Community
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
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a
              href="mailto:hello@euda.dev"
              className="hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>
          <p className="text-xs text-muted-foreground font-medium">
            &copy; 2026 EUDA. Built with love in Spain.
          </p>
        </div>
      </footer>
    </div>
  );
}
