import type { ReactNode } from "react";

export function SkipLinks() {
  return (
    <nav aria-label="Sprungmarken">
      <a
        href="#inhalt"
        className="sr-only z-50 bg-primary px-4 py-3 text-sm font-medium text-primary-fg focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Zum Inhalt
      </a>
      <a
        href="#kapitel"
        className="sr-only z-50 bg-primary px-4 py-3 text-sm font-medium text-primary-fg focus:not-sr-only focus:absolute focus:left-4 focus:top-16"
      >
        Zu den Kapiteln
      </a>
    </nav>
  );
}

export function Recap({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-border bg-wash px-4 py-4" aria-label="Kurz gesagt">
      <p className="text-xs font-medium tracking-widest text-subtle uppercase">Kurz gesagt</p>
      <p className="mt-2 text-base leading-relaxed text-fg">{children}</p>
    </aside>
  );
}

export function Chapter({
  id,
  number,
  kicker,
  title,
  about,
  children,
}: {
  id: string;
  number: string;
  kicker?: string;
  title: string;
  about: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titel`} className="mt-20 scroll-mt-24 md:mt-24">
      <p className="text-xs font-medium tracking-widest text-subtle uppercase">
        Kapitel {number}
        {kicker ? ` · ${kicker}` : ""}
      </p>
      <h2 id={`${id}-titel`} className="mt-3 font-display text-3xl text-fg md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-muted md:text-lg">{about}</p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-fg">{children}</div>
    </section>
  );
}

export const CHAPTERS = [
  { id: "kurzfassung", label: "Kurzfassung" },
  { id: "lesen", label: "Wie man diese Arbeit liest" },
  { id: "fall", label: "1 · Das Büro" },
  { id: "frage", label: "2 · Die Liste" },
  { id: "gibson", label: "3 · Angebot" },
  { id: "uexkuell", label: "4 · Umwelt" },
  { id: "lewin", label: "5 · Lebensraum" },
  { id: "drei", label: "6 · Eine Beobachtung" },
  { id: "kern", label: "7 · Andere Angebote" },
  { id: "methode", label: "8 · Das Instrument" },
  { id: "verdrahtung", label: "9 · Verdrahtung" },
  { id: "glossar", label: "Glossar" },
  { id: "quellen", label: "Quellen" },
] as const;

export function Contents() {
  return (
    <nav id="kapitel" aria-label="Kapitel dieser Arbeit" className="mt-10 scroll-mt-24">
      <p className="text-xs font-medium tracking-widest text-subtle uppercase">Inhalt</p>
      <ol className="mt-4 space-y-2">
        {CHAPTERS.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} className="text-base text-muted underline-offset-4 hover:text-fg hover:underline">
              {c.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
