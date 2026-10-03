import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "cream" | "dark";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const textColor = variant === "dark" ? "text-ink" : "text-cream-paper";

  return (
    <div className={cn("group flex items-center gap-3", className)}>
      {/* Símbolo Creativo C */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-clay to-ochre shadow-[0_4px_15px_rgba(244,63,94,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_25px_rgba(139,92,246,0.5)]">
        <div className="absolute inset-[2px] rounded-[10px] bg-ink-2 flex items-center justify-center transition-colors group-hover:bg-ink">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-5 w-5 text-white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0px 0px 4px rgba(244,63,94,0.8))" }}
          >
            <path d="M16.5 6.5A8 8 0 1 0 16.5 17.5" />
          </svg>
        </div>
      </div>

      {/* Texto de la marca */}
      <div className="flex flex-col">
        <span className={cn("font-sans text-xl font-extrabold tracking-tight transition-colors group-hover:text-clay", textColor)}>
          creo<span className="text-ochre">vanta</span>
        </span>
      </div>
    </div>
  );
}