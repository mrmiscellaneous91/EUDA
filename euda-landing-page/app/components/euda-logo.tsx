import Image from "next/image";

export function EudaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/euda-wordmark.svg"
        alt="EUDA"
        width={94}
        height={42}
        className="h-8 w-auto"
        priority
      />
    </div>
  );
}

export function EudaLogoMuted({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center opacity-30 ${className}`}>
      <Image
        src="/euda-wordmark.svg"
        alt="EUDA"
        width={94}
        height={42}
        className="h-6 w-auto grayscale"
      />
    </div>
  );
}
