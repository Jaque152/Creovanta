import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "ink",
  wordmark = true,
}: {
  className?: string;
  variant?: "ink" | "cream";
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-clay shadow-[0_3px_10px_rgba(0,229,255,0.4)]">
        <span className="display -translate-x-[0.5px] text-[1.2rem] font-black leading-none text-ink">
          D
        </span>
        <span className="absolute -right-[4px] -top-[4px] grid h-[14px] w-[14px] place-items-center rounded-sm bg-ochre ring-2 ring-[var(--cream-paper)]">
          <span className="h-1.5 w-1.5 bg-cream-paper" />
        </span>
      </span>
      {wordmark && (
        <span
          className={cn(
            "display text-[1.5rem] font-bold leading-none tracking-tight",
            variant === "cream" ? "text-cream-paper" : "text-ink",
          )}
        >
          Dev<span className="text-clay-deep">ion</span>
        </span>
      )}
    </span>
  );
}