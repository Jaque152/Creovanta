import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "cream" | "dark";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  // Adaptamos el color del texto si alguna vez lo usas en fondos claros
  const textColor = variant === "dark" ? "text-ink" : "text-cream-paper";

  return (
    <div className={cn("group flex items-center gap-3", className)}>
      {/* Símbolo (Monograma D) */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-clay/40 bg-ink-2 shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all duration-300 group-hover:border-clay group-hover:shadow-[0_0_25px_rgba(0,229,255,0.5)]">
        <div className="absolute inset-0 rounded-lg bg-clay/10" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="relative z-10 h-4 w-4 text-clay"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 4v16" />
          <path d="M7 4h5a8 8 0 0 1 0 16H7" />
        </svg>
      </div>

      {/* Texto de la marca */}
      <div className="flex flex-col">
        <span className={cn("font-mono text-xl font-bold tracking-[0.15em] transition-colors group-hover:text-clay", textColor)}>
          devion
        </span>
      </div>
    </div>
  );
}