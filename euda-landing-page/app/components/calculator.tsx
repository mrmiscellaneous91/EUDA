"use client";

import { useState } from "react";
import { Zap } from "lucide-react";

export function Calculator() {
  const [monthlySpend, setMonthlySpend] = useState(1500);
  const estimatedSavings = Math.round(monthlySpend * 0.035);

  return (
    <div className="md:col-span-4 md:row-span-3 bg-primary text-primary-foreground rounded-2xl p-8 flex flex-col justify-between shadow-2xl shadow-primary/20 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)]" />

      <div className="space-y-6 relative z-10">
        <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center">
          <Zap size={32} />
        </div>
        <h3 className="text-3xl font-extrabold leading-none tracking-tight">
          See your
          <br />
          potential.
        </h3>
        <p className="text-primary-foreground/70 font-medium text-sm">
          Slide to see your estimated monthly savings.
        </p>
      </div>

      <div className="space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-80">
            <span>Monthly Spend</span>
            <span>&euro;{monthlySpend.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={monthlySpend}
            onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        <div className="p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
            Estimated Rent Credit
          </p>
          <p className="text-5xl font-extrabold tracking-tighter">
            &euro;{estimatedSavings}
            <span className="text-lg opacity-50">/mo</span>
          </p>
        </div>
      </div>
    </div>
  );
}
