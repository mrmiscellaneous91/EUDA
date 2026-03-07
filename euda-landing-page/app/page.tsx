import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Landmark,
  Sparkles,
  ReceiptText,
  ShieldCheck,
  MinusCircle,
  Users,
  Home,
} from "lucide-react";
import { Calculator } from "./components/calculator";
import { EudaLogo, EudaLogoMuted } from "./components/euda-logo";

const steps = [
  {
    step: "01",
    title: "Pay rent early",
    desc: "Unlock a guaranteed bonus through EUDA.",
    icon: CircleDollarSign,
  },
  {
    step: "02",
    title: "Connect bank",
    desc: "We securely find savings opportunities.",
    icon: Landmark,
  },
  {
    step: "03",
    title: "Earn credits",
    desc: "Automatic rewards on every purchase.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Pay less",
    desc: "Credits apply to your next rent payment.",
    icon: ReceiptText,
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <nav className="p-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <EudaLogo />
        <button className="hidden md:block text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
          How it works
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-24">
        {/* Hero Section */}
        <section className="pt-8 md:pt-20 space-y-8 text-center">
          <div className="space-y-5 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-balance">
              Lower your rent.
              <br />
              <span className="text-primary font-[family-name:var(--font-dm-serif)] italic">
                Without moving.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto text-balance">
              EUDA turns everyday spending, bill switching, and smart timing
              into{" "}
              <span className="text-foreground font-semibold">
                automatic rent reductions.
              </span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-lg p-1.5 bg-card rounded-2xl border border-border shadow-lg focus-within:border-primary/40 transition-all">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-transparent outline-none text-base font-medium"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-[#0e44b0] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group whitespace-nowrap text-base">
                Join the Waitlist
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] text-muted-foreground"
                  >
                    <Users size={12} />
                  </div>
                ))}
              </div>
              Early users are reducing their rent by &euro;30&ndash;&euro;70/month.
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(160px,auto)]">
          {/* Main Feature: How it Works */}
          <div className="md:col-span-8 md:row-span-3 bg-muted/50 rounded-2xl border border-border p-8 md:p-12 space-y-12 relative overflow-hidden group">
            <div className="space-y-3 relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                How it Works
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                The simple path to a cheaper home.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
              {steps.map((item, i) => (
                <div key={i} className="flex gap-4 group/item">
                  <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center text-primary shrink-0 group-hover/item:border-primary/40 transition-colors">
                    <item.icon size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <span className="text-[10px] text-primary/50 font-mono tracking-widest uppercase">
                        {item.step}
                      </span>
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/8 transition-colors" />
          </div>

          {/* Interactive Calculator */}
          <Calculator />

          {/* Benefit: No Loans */}
          <div className="md:col-span-3 md:row-span-2 bg-card rounded-2xl border border-border p-6 flex flex-col justify-center items-center text-center space-y-3 hover:border-primary/40 transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
              <MinusCircle size={20} />
            </div>
            <div>
              <p className="text-lg font-extrabold leading-tight">No loans.</p>
              <p className="text-xs text-muted-foreground font-semibold">
                Ever.
              </p>
            </div>
          </div>

          {/* Benefit: No Moving */}
          <div className="md:col-span-3 md:row-span-2 bg-card rounded-2xl border border-border p-6 flex flex-col justify-center items-center text-center space-y-3 hover:border-primary/40 transition-colors duration-300">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Home size={20} />
            </div>
            <div>
              <p className="text-lg font-extrabold leading-tight">
                No moving.
              </p>
              <p className="text-xs text-muted-foreground font-semibold">
                Stay put.
              </p>
            </div>
          </div>

          {/* Trust/Security */}
          <div className="md:col-span-6 md:row-span-2 bg-[#101622] text-white rounded-2xl p-8 flex items-center gap-6 group">
            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3b76f5] group-hover:scale-110 transition-transform duration-500 shrink-0">
              <ShieldCheck size={36} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Secure by Design</h3>
              <p className="text-sm text-[#8ba0c0] font-medium">
                Bank-level encryption. No awkward landlord conversations. Just
                lower rent.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-muted py-24 rounded-2xl px-6 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-none tracking-tight">
              Ready to drop
              <br />
              your rent?
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              Join 2,400+ smart renters who are already seeing results.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-10 py-5 bg-primary text-primary-foreground font-extrabold rounded-xl text-xl hover:bg-[#0e44b0] hover:shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95">
              Start Saving Now
            </button>
            <p className="text-muted-foreground font-semibold text-sm flex items-center gap-2">
              <CheckCircle2 size={18} className="text-success" />
              No credit checks required
            </p>
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
