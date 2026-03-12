import { useState, useMemo } from 'react';
import {
  Share2,
  PieChart as PieChartIcon,
  Wallet,
  LayoutGrid,
  BarChart3,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Info,
  Globe,
  MessageCircle
} from 'lucide-react';
import { loadLocale } from 'wuchale/load-utils';
import { EmailModal } from './components/EmailModal';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { getTaxBreakdown } from './lib/taxCalculations';
import type { SpendingCategory } from './lib/taxCalculations';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// @ts-ignore - Wuchale generated loader has no type declarations
import { getRuntime } from './locales/main.loader.js';
import spendingTranslationsEs from './lib/translations-es.json';

/** @ts-ignore */
const _w_runtime_ = getRuntime();

/** Module-level locale tracker */
let _currentLocale = 'en';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Translation helper: for dynamic content (spending data), uses the hardcoded
 * Spanish map. For static UI strings, Wuchale transforms the call at build time.
 * @ts-ignore */
let _ = (s: string): string => {
  // For dynamic content (spending data), use the hardcoded translation map
  if (_currentLocale === 'es') {
    const translated = (spendingTranslationsEs as Record<string, string>)[s];
    if (translated) return translated;
  }
  // For static UI strings transformed by Wuchale, or fallback
  return s;
};

export default function App() {
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<'autonomo' | 'employee'>('autonomo');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [viewMode, setViewMode] = useState<'bar' | 'pie'>('bar');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('en');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  const breakdown = useMemo(() => {
    const val = parseFloat(amount) || 0;
    return getTaxBreakdown(val, type, period);
  }, [amount, type, period]);

  const activeData = useMemo(() => {
    if (!selectedCategory) {
      return breakdown.spending.map(s => ({
        name: s.name,
        value: s.amount,
        percentage: (s.percentage * 100).toFixed(1),
        hasSubcategories: s.subcategories.length > 0
      }));
    }
    const cat = breakdown.spending.find(s => s.name === selectedCategory);
    return (cat?.subcategories || []).map(sub => ({
      name: sub.name,
      value: sub.amount,
      percentage: (sub.percentage * 100).toFixed(1),
      hasSubcategories: false
    })).sort((a, b) => b.value - a.value);
  }, [breakdown, selectedCategory]);

  // EUDA blue palette - using hex values for Recharts compatibility
  const COLORS = [
    '#1152d4', // EUDA primary blue
    '#3b82f6', // Sky blue
    '#6366f1', // Indigo
    '#f59e0b', // Amber
    '#0ea5e9', // Cyan
    '#8b5cf6', // Violet
    '#14b8a6', // Teal
    '#ef4444', // Red
    '#64748b', // Slate
    '#22c55e', // Green
  ];

  const handleShare = () => {
    const text = `I contributed €${breakdown.totalTax.toLocaleString()} to Spanish public services! 🇪🇸\nSee where your tax goes:`;
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({ title: 'Tax Spend Calculator', text, url });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
    }
  };

  const handleBarClick = (data: any) => {
    // Recharts pass the clicked object properties
    if (data && data.name && !selectedCategory) {
      const cat = breakdown.spending.find(s => s.name === data.name);
      if (cat && cat.subcategories.length > 0) {
        setSelectedCategory(data.name);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 pb-8 flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <img src="/euda-wordmark.svg" alt="EUDA" className="h-8 w-auto" />
              <div className="w-px h-8 bg-border/40" />
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">{_('Where do your taxes really go?')}</h1>
                <span className="text-2xl" title="Spain">🇪🇸</span>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://discord.gg/wVpEAtb3"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 hover:bg-card/50 transition-all text-sm font-medium"
            >
              <MessageCircle size={16} className="text-[#5865F2]" />
              {_('Join Community')}
            </a>
            <button
              onClick={async () => {
                const newLocale = currentLocale === 'en' ? 'es' : 'en';
                await loadLocale(newLocale);
                document.documentElement.lang = newLocale;
                _currentLocale = newLocale;
                setCurrentLocale(newLocale);
              }}
              className="px-3 py-1.5 rounded-full border border-border/40 hover:bg-card/50 transition-all text-sm font-medium flex items-center gap-2"
              title={currentLocale === 'en' ? "Change to Spanish" : "Cambiar a Inglés"}
            >
              <Globe size={14} />
              {currentLocale === 'en' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm font-medium text-sm"
            >
              <Share2 size={16} />
              {_('Share Result')}
            </button>
          </div>
        </div>
      </header>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        translate={_}
        onSubmit={async (email, city) => {
          try {
            const res = await fetch('/api/waitlist', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, city }),
            });
            if (res.ok) {
              alert(_('Welcome to the waitlist! We will be in touch soon.'));
            } else {
              const data = await res.json();
              alert(data.error || _('Something went wrong. Please try again.'));
            }
          } catch (error) {
            console.error('Waitlist error:', error);
            alert(_('Something went wrong. Please try again.'));
          }
        }}
      />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-8">
            <section className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{_('Calculate your impact')}</h2>
                <p className="text-muted-foreground">{_('See exactly where your tax and social security contributions go.')}</p>
              </div>

              {/* Type Toggle */}
              <div className="p-1 bg-muted rounded-2xl flex gap-1">
                <button
                  onClick={() => setType('autonomo')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all",
                    type === 'autonomo' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {_('Autonomo')}
                </button>
                <button
                  onClick={() => setType('employee')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all",
                    type === 'employee' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {_('Employee')}
                </button>
              </div>

              {/* Amount Input */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Wallet size={20} />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAmount(val);
                      if (parseFloat(val) > 0 && !hasShownModal) {
                        setIsEmailModalOpen(true);
                        setHasShownModal(true);
                      }
                    }}
                    placeholder={_('Earnings...')}
                    className="w-full bg-card border-2 border-border/50 rounded-2xl py-6 pl-12 pr-28 text-2xl font-bold focus:border-primary focus:ring-0 transition-all outline-none"
                  />
                  <div className="absolute right-3 top-3 bottom-3 flex gap-1 bg-muted p-1 rounded-xl">
                    <button
                      onClick={() => setPeriod('monthly')}
                      className={cn(
                        "px-3 text-xs font-bold rounded-lg transition-all",
                        period === 'monthly' ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
                      )}
                    >
                      {_('/ mo')}
                    </button>
                    <button
                      onClick={() => setPeriod('yearly')}
                      className={cn(
                        "px-3 text-xs font-bold rounded-lg transition-all",
                        period === 'yearly' ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
                      )}
                    >
                      {_('/ yr')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{_('Total Contribution')}</span>
                  <span className="text-4xl font-black text-primary">€{breakdown.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="h-px bg-primary/20" />
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">{_('Income Tax (IRPF)')}</span>
                    <span className="font-bold">€{breakdown.irpf.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">{_('Social Security')}</span>
                    <span className="font-bold">€{breakdown.ss.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">{_('Net Take Home')}</span>
                    <span className="text-success">€{breakdown.net.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Explainer Section - Collapsible */}
              <div className="bg-muted/30 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setIsExplainerOpen(!isExplainerOpen)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/40 transition-colors"
                >
                  <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                    <Info size={16} className="text-primary" />
                    {_('How Your Contribution is Calculated')}
                  </h4>
                  <div className="text-muted-foreground">
                    {isExplainerOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isExplainerOpen && (
                  <div className="px-6 pb-6 space-y-5 text-sm">
                    {type === 'autonomo' && breakdown.details ? (
                      <div className="space-y-5">
                        {/* Step-by-step calculation */}
                        <div className="space-y-3">
                          <p className="text-muted-foreground">
                            <strong className="text-foreground">{_('Step 1: 7% Expense Deduction')}</strong>
                          </p>
                          <div className="bg-card/50 rounded-xl p-4 space-y-2 font-mono text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{_('Gross income')}</span>
                              <span className="text-foreground">€{breakdown.gross.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-destructive/80">
                              <span>{_('− 7% expense deduction')}</span>
                              <span>−€{breakdown.details.expenseDeduction?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="border-t border-border/30 pt-2 flex justify-between font-bold">
                              <span className="text-foreground">{_('= Net yields')}</span>
                              <span className="text-foreground">€{breakdown.details.netYields?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/{_currentLocale === 'es' ? 'año' : 'yr'} (€{breakdown.details.monthlyNetYields?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/{_currentLocale === 'es' ? 'mes' : 'mo'})</span>
                            </div>
                          </div>
                        </div>

                        {/* SS Breakdown - Tramo System */}
                        <div className="space-y-3">
                          <p className="text-muted-foreground">
                            <strong className="text-foreground">{_('Step 2: Social Security Quota')}</strong>
                            {breakdown.details.ssTramo && (
                              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Tramo {breakdown.details.ssTramo.tramoNumber} • {_(breakdown.details.ssTramo.description)}
                              </span>
                            )}
                          </p>
                          <div className="bg-card/50 rounded-xl p-4 space-y-2 font-mono text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{_('Your income bracket')}</span>
                              <span className="text-foreground">{_('Tramo')} {breakdown.details.ssTramo?.tramoNumber} {_('of')} 15</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{_('Contribution base range')}</span>
                              <span className="text-foreground">€{breakdown.details.ssTramo?.minBase.toLocaleString()} – €{breakdown.details.ssTramo?.maxBase.toLocaleString()}/{_currentLocale === 'es' ? 'mes' : 'mo'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{_('Your base (minimum)')}</span>
                              <span className="text-foreground">€{breakdown.details.ssTramo?.chosenBase.toLocaleString()}/{_currentLocale === 'es' ? 'mes' : 'mo'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{_('Rate applied')}</span>
                              <span className="text-foreground">31.4%</span>
                            </div>
                            <div className="border-t border-border/30 pt-2 flex justify-between font-bold">
                              <span className="text-foreground">{_('= Monthly quota')}</span>
                              <span className="text-primary">€{breakdown.details.ssTramo?.monthlyQuota.toLocaleString(undefined, { maximumFractionDigits: 0 })}/{_currentLocale === 'es' ? 'mes' : 'mo'}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                              <span className="text-foreground">{_('= Annual SS')}</span>
                              <span className="text-foreground">€{breakdown.ss.toLocaleString(undefined, { maximumFractionDigits: 0 })}/{_currentLocale === 'es' ? 'año' : 'yr'}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground/70">
                            💡 {_currentLocale === 'es' ? `La mayoría de los autónomos pagan la base mínima de su tramo. Puedes elegir una base más alta (hasta €${breakdown.details.ssTramo?.maxBase.toLocaleString()}/mes) para mejores prestaciones de jubilación.` : `Most autónomos pay the minimum base for their tramo. You can choose a higher base (up to €${breakdown.details.ssTramo?.maxBase.toLocaleString()}/mo) for better pension benefits.`}
                          </p>
                        </div>

                        {/* IRPF Breakdown */}
                        <div className="space-y-3">
                          <p className="text-muted-foreground">
                            <strong className="text-foreground">{_('Step 3: Income Tax (IRPF)')}</strong> — {_('Progressive brackets')}
                          </p>
                          <div className="bg-card/50 rounded-xl p-4 space-y-2 font-mono text-xs">
                            <div className="flex justify-between text-muted-foreground/60 text-[10px] uppercase tracking-wider pb-1">
                              <span>{_('Bracket')}</span>
                              <span>{_('Rate')}</span>
                              <span>{_('Taxable')}</span>
                              <span>{_('Tax')}</span>
                            </div>
                            {breakdown.details.irpfBrackets.map((bracket, i) => (
                              <div key={i} className="flex justify-between items-center">
                                <span className="text-muted-foreground w-24">€{bracket.from.toLocaleString()}–€{bracket.to.toLocaleString()}</span>
                                <span className="text-primary font-bold w-12 text-center">{(bracket.rate * 100).toFixed(0)}%</span>
                                <span className="text-foreground w-20 text-right">€{bracket.taxableInBracket.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                <span className="text-foreground w-20 text-right font-bold">€{bracket.taxPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                              </div>
                            ))}
                            <div className="border-t border-border/30 pt-2 flex justify-between font-bold">
                              <span className="text-foreground">{_('= Total IRPF')}</span>
                              <span className="text-foreground">€{breakdown.irpf.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground/70">
                            {_('Taxable base:')} €{breakdown.details.netYields?.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({_('net yields')}) − €{breakdown.ss.toLocaleString(undefined, { maximumFractionDigits: 0 })} (SS) = €{breakdown.details.taxableBase.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">{_("Your contribution is lower than what's really paid.")}</strong> {_("You pay 6.35% in Social Security, but your employer contributes an additional ~30% on top of your gross salary that doesn't appear on your payslip.")}
                        </p>
                        <p>
                          {_('Your 6.35% breaks down as:')} <span className="text-foreground">4.7%</span> {_('for common contingencies,')} <span className="text-foreground">1.55%</span> {_('for unemployment, and')} <span className="text-foreground">0.1%</span> {_('for professional training.')}
                        </p>
                        {breakdown.details && (
                          <div className="bg-card/50 rounded-xl p-4 space-y-2 font-mono text-xs mt-4">
                            <div className="flex justify-between text-muted-foreground/60 text-[10px] uppercase tracking-wider pb-1">
                              <span>{_('IRPF Bracket')}</span>
                              <span>{_('Rate')}</span>
                              <span>{_('Taxable')}</span>
                              <span>{_('Tax')}</span>
                            </div>
                            {breakdown.details.irpfBrackets.map((bracket, i) => (
                              <div key={i} className="flex justify-between items-center">
                                <span className="text-muted-foreground w-24">€{bracket.from.toLocaleString()}–€{bracket.to.toLocaleString()}</span>
                                <span className="text-primary font-bold w-12 text-center">{(bracket.rate * 100).toFixed(0)}%</span>
                                <span className="text-foreground w-20 text-right">€{bracket.taxableInBracket.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                <span className="text-foreground w-20 text-right font-bold">€{bracket.taxPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                              </div>
                            ))}
                            <div className="border-t border-border/30 pt-2 flex justify-between font-bold">
                              <span className="text-foreground">{_('= Total IRPF')}</span>
                              <span className="text-foreground">€{breakdown.irpf.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-8 space-y-8">

            {/* Visual Breakdown */}
            <section className="bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden flex flex-col min-h-[600px]">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <PieChartIcon size={200} />
              </div>

              <div className="relative z-10 space-y-8 flex-1 flex flex-col">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    {selectedCategory && (
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm group"
                      >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        {_('Back to Overview')}
                      </button>
                    )}
                    <div className="space-y-1">
                      <h3 className="text-3xl font-bold">{selectedCategory ? _(selectedCategory) : _('Your Tax at work')}</h3>
                      <p className="text-muted-foreground max-w-lg">
                        {selectedCategory
                          ? _(`Specific breakdown of how your contributions are spent within {0}.`).replace('{0}', _(selectedCategory))
                          : _(`Based on 2024 state budgets, here is how your €{0} is distributed.`).replace('{0}', breakdown.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 }))
                        }
                      </p>
                    </div>
                  </div>

                  {/* Chart Toggle */}
                  <div className="flex bg-muted p-1 rounded-xl w-fit h-fit shrink-0">
                    <button
                      onClick={() => setViewMode('bar')}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        viewMode === 'bar' ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                      title={_('Bar Chart')}
                    >
                      <BarChart3 size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('pie')}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        viewMode === 'pie' ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                      title={_('Pie Chart')}
                    >
                      <LayoutGrid size={20} />
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <ResponsiveContainer width="100%" height={400}>
                    {viewMode === 'bar' ? (
                      <BarChart
                        data={activeData}
                        layout="vertical"
                        margin={{ left: 40, right: 30, top: 20 }}
                      >
                        <XAxis type="number" hide />
                        <YAxis
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          width={120}
                          tick={(props) => {
                            const { x, y, payload } = props;
                            return (
                              <g transform={`translate(${x},${y})`}>
                                <text
                                  x={-10}
                                  y={0}
                                  dy={4}
                                  textAnchor="end"
                                  fill="var(--foreground)"
                                  className="text-[11px] font-bold"
                                >
                                  {_(payload.value).length > 20 ? _(payload.value).substring(0, 17) + '...' : _(payload.value)}
                                </text>
                              </g>
                            );
                          }}
                        />
                        <Tooltip
                          cursor={{ fill: 'var(--primary)', opacity: 0.05 }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const p = payload[0].payload;
                              return (
                                <div className="bg-popover border border-border p-4 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
                                  <p className="font-bold text-sm mb-1">{_(String(payload[0].name ?? ''))}</p>
                                  <p className="text-primary text-xl font-black mb-1">€{Number(payload[0].value).toLocaleString()}</p>
                                  <p className="text-xs text-muted-foreground">{p.percentage}% {_('of your total tax')}</p>
                                  {p.hasSubcategories && !selectedCategory && (
                                    <p className="text-[10px] text-primary font-bold mt-2 uppercase tracking-tight">{_('Click to drill down')}</p>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="value"
                          radius={[0, 8, 8, 0]}
                          barSize={selectedCategory ? 20 : 32}
                          onClick={(data) => handleBarClick(data)}
                          style={{ cursor: !selectedCategory ? 'pointer' : 'default' }}
                        >
                          {activeData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={activeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={selectedCategory ? 100 : 80}
                          outerRadius={selectedCategory ? 140 : 120}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                          onClick={(data) => handleBarClick(data)}
                          style={{ cursor: !selectedCategory ? 'pointer' : 'default' }}
                        >
                          {activeData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const p = payload[0].payload;
                              return (
                                <div className="bg-popover border border-border p-4 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
                                  <p className="font-bold text-sm mb-1">{_(String(payload[0].name ?? ''))}</p>
                                  <p className="text-primary text-xl font-black mb-1">€{Number(payload[0].value).toLocaleString()}</p>
                                  <p className="text-xs text-muted-foreground">{p.percentage}% {_('of total')}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>

                {!selectedCategory && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-auto">
                    {activeData.slice(0, 4).map((item, i) => (
                      <button
                        key={item.name}
                        onClick={() => setSelectedCategory(item.name)}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all text-left group"
                      >
                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase truncate">{_(item.name)}</p>
                          <p className="text-lg font-black truncate">€{Number(item.value).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{_('Full Spending Table')}</h2>
              <p className="text-muted-foreground">{_('Every euro accounted for, down to the subcategory level.')}</p>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  <th className="px-8 py-4">{_('Category / Subcategory')}</th>
                  <th className="px-8 py-4 text-right">{_('% of Total')}</th>
                  <th className="px-8 py-4 text-right">{_('Contribution')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {breakdown.spending.map((cat, idx) => (
                  <CategoryRow key={cat.name} category={cat} color={COLORS[idx % COLORS.length]} />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Lead Capture Section */}
        <section className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-12 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">{_("Lower next month's rent. Without moving.")}</h2>
            <p className="text-muted-foreground">
              {_('EUDA helps renters turn everyday spending, bill switching, and smart timing into automatic rent reductions. Be the first to know when we launch.')}
            </p>
          </div>

          <form 
            className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3" 
            onSubmit={async (e) => { 
                e.preventDefault(); 
                const form = e.target as HTMLFormElement;
                const emailInput = form.elements.namedItem('email') as HTMLInputElement;
                const cityInput = form.elements.namedItem('city') as HTMLInputElement;
                const emailVal = emailInput.value;
                const cityVal = cityInput.value;

                try {
                  const res = await fetch('/api/waitlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailVal, city: cityVal }),
                  });
                  if (res.ok) {
                    alert(_('Welcome to the waitlist! We will be in touch soon.'));
                    emailInput.value = '';
                    cityInput.value = '';
                  } else {
                    const data = await res.json();
                    alert(data.error || _('Something went wrong. Please try again.'));
                  }
                } catch (error) {
                  console.error('Waitlist error:', error);
                  alert(_('Something went wrong. Please try again.'));
                }
            }}
          >
            <input
              type="email"
              name="email"
              placeholder={_('Enter your email')}
              required
              className="flex-1 bg-card border-2 border-border/50 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
            />
            <input
              type="text"
              name="city"
              placeholder={_('Enter your city')}
              required
              className="flex-1 bg-card border-2 border-border/50 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg"
            >
              {_('Interested')}
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-border/40 mt-auto">
        <div className="space-y-6">
          {/* Created by EUDA */}
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <span className="text-sm font-medium text-muted-foreground">{_('Created by')}</span>
            <span className="text-4xl opacity-80 hover:opacity-100 transition-opacity" style={{ fontFamily: "'DM Serif Display', serif" }}><span className="text-foreground">Eu</span><span className="text-primary">da</span></span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border/20">
            <p className="text-xs">{_('Data sourced from Spain General State Budgets 2024')}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <a href="https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/paginas/iacogof.aspx" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline-offset-2 hover:underline">{_('IGAE COFOG Data')}</a>
              <a href="https://transparencia.gob.es/en/publicidad-activa/por-materias/informacion-economico-presupuestaria/presupuestos-generales-estado/pge-gastos" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline-offset-2 hover:underline">{_('Presupuestos Generales')}</a>
              <a href="https://sede.agenciatributaria.gob.es/Sede/en_gb/educacion-civico-tributaria/programa-educacion-civico-tributaria/que-son-impuestos/contenidos/gastos-publicos/distribucion-funcional-gasto-publico.html" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline-offset-2 hover:underline">{_('Tax Agency')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryRow({ category, color }: { category: SpendingCategory, color: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr
        className={cn(
          "group cursor-pointer hover:bg-muted/20 transition-colors",
          isOpen && "bg-muted/10"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <td className="px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full ring-4 ring-background shrink-0" style={{ backgroundColor: color }} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-foreground font-semibold">{_(category.name)}</span>
                {category.subcategories.length > 0 && (
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                )}
              </div>
              {category.description && (
                <p className="text-xs text-muted-foreground mt-1 max-w-md">{_(category.description)}</p>
              )}
            </div>
          </div>
        </td>
        <td className="px-8 py-5 text-right font-medium text-muted-foreground align-top">{(category.percentage * 100).toFixed(1)}%</td>
        <td className="px-8 py-5 text-right font-bold align-top">€{category.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
      </tr>
      {isOpen && category.subcategories.map((sub) => (
        <tr key={sub.name} className="bg-muted/5 text-[13px]">
          <td className="px-16 py-4 border-l-2 border-primary/20 ml-8">
            <div className="min-w-0">
              <span className="text-foreground/80">{_(sub.name)}</span>
              {sub.description && (
                <p className="text-[11px] text-muted-foreground/70 mt-0.5 max-w-sm">{_(sub.description)}</p>
              )}
            </div>
          </td>
          <td className="px-8 py-4 text-right text-muted-foreground/60 align-top">{(sub.percentage * 100).toFixed(1)}%</td>
          <td className="px-8 py-4 text-right font-medium opacity-80 align-top">€{sub.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
        </tr>
      ))}
    </>
  );
}
