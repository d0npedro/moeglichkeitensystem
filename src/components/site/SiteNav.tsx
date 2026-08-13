import { Link } from "@tanstack/react-router";
import { AuthSlot } from "@/components/field/AuthSlot";
import { cn } from "@/lib/utils";

export function SiteNav({
  current,
  wide = false,
}: {
  current: "arbeit" | "feld";
  wide?: boolean;
}) {
  return (
    <header className="border-b border-border bg-bg/90 backdrop-blur-sm">
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-3 py-3",
          wide ? "max-w-[90rem] px-4 sm:px-6" : "max-w-3xl px-5 md:max-w-4xl md:px-8",
        )}
      >
        <Link to="/" className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Pedda vom Mond</p>
          <p className="truncate font-display text-lg text-fg md:text-xl">Möglichkeitensystem</p>
        </Link>
        <nav className="flex items-center gap-0.5">
          <Link
            to="/"
            className={cn(
              "inline-flex h-11 items-center px-3 text-sm",
              current === "arbeit" ? "text-fg" : "text-muted hover:text-fg",
            )}
            activeOptions={{ exact: true }}
            aria-current={current === "arbeit" ? "page" : undefined}
          >
            Arbeit
          </Link>
          <Link
            to="/feld"
            className={cn(
              "inline-flex h-11 items-center px-3 text-sm",
              current === "feld" ? "text-fg" : "text-muted hover:text-fg",
            )}
            aria-current={current === "feld" ? "page" : undefined}
          >
            Feld
          </Link>
          <AuthSlot />
        </nav>
      </div>
    </header>
  );
}
