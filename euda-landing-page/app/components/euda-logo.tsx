export function EudaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shrink-0">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" fill="white" fillOpacity="0.25" />
          <circle cx="9" cy="9" r="4" fill="white" fillOpacity="0.5" />
          <circle cx="9" cy="9" r="2" fill="white" />
        </svg>
      </div>
      <span className="font-[family-name:var(--font-dm-serif)] italic text-2xl tracking-tight">
        <span className="text-foreground">Eu</span>
        <span className="text-primary">da</span>
      </span>
    </div>
  );
}

export function EudaLogoMuted({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 opacity-30 ${className}`}>
      <div className="w-7 h-7 bg-muted-foreground rounded-md flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" fill="white" fillOpacity="0.25" />
          <circle cx="9" cy="9" r="4" fill="white" fillOpacity="0.5" />
          <circle cx="9" cy="9" r="2" fill="white" />
        </svg>
      </div>
      <span className="font-[family-name:var(--font-dm-serif)] italic text-xl tracking-tight text-muted-foreground">
        Euda
      </span>
    </div>
  );
}
