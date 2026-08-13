import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, Check, Github, Link2, Mail, Share2 } from "lucide-react";
import { GITHUB_REPO, SHARE_TEXT, SHARE_TITLE, publicShareUrl } from "@/lib/share";
import { cn } from "@/lib/utils";

export function WorkTools({
  path = "",
  reader,
  onReader,
}: {
  path?: "" | "/feld" | "/schnitt";
  reader?: boolean;
  onReader?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {onReader ? (
        <button
          type="button"
          onClick={onReader}
          aria-pressed={reader}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm",
            reader ? "bg-wash text-fg" : "text-muted hover:bg-wash hover:text-fg",
          )}
        >
          <BookOpen className="size-4" aria-hidden />
          Lesen
        </button>
      ) : null}
      {path === "" ? (
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-muted hover:bg-wash hover:text-fg"
        >
          Drucken
        </button>
      ) : null}
      <ShareMenu path={path} />
      <a
        href={GITHUB_REPO}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-muted hover:bg-wash hover:text-fg"
      >
        <Github className="size-4" aria-hidden />
        GitHub
      </a>
    </div>
  );
}

function ShareMenu({ path }: { path: "" | "/feld" | "/schnitt" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const url = () =>
    publicShareUrl(
      path,
      typeof window !== "undefined" ? window.location.hash : "",
      typeof window !== "undefined" && path !== "" ? window.location.search : "",
    );

  async function copy() {
    const link = url();
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      window.prompt("Link kopieren", link);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function nativeShare() {
    const link = url();
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: link });
        setOpen(false);
        return;
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
      }
    }
    await copy();
  }

  const link = url();
  const encoded = encodeURIComponent(`${SHARE_TITLE} — ${link}`);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-muted hover:bg-wash hover:text-fg"
      >
        <Share2 className="size-4" aria-hidden />
        Teilen
      </button>
      {open ? (
        <div
          role="menu"
          aria-labelledby={labelId}
          className="absolute left-0 z-20 mt-1 min-w-52 rounded-lg border border-border bg-elevated p-1 shadow-soft"
        >
          <p id={labelId} className="sr-only">
            Teilen
          </p>
          <button
            type="button"
            role="menuitem"
            onClick={() => void nativeShare()}
            className="flex min-h-11 w-full items-center gap-2 rounded-md px-3 text-left text-sm text-fg hover:bg-wash"
          >
            <Share2 className="size-4" aria-hidden />
            Gerät
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => void copy()}
            className="flex min-h-11 w-full items-center gap-2 rounded-md px-3 text-left text-sm text-fg hover:bg-wash"
          >
            {copied ? <Check className="size-4" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
            {copied ? "Kopiert" : "Link kopieren"}
          </button>
          <a
            role="menuitem"
            href={`https://wa.me/?text=${encoded}`}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-fg hover:bg-wash"
          >
            WhatsApp
          </a>
          <a
            role="menuitem"
            href={`mailto:?subject=${encodeURIComponent(SHARE_TITLE)}&body=${encoded}`}
            className="flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-fg hover:bg-wash"
          >
            <Mail className="size-4" aria-hidden />
            E-Mail
          </a>
          <p className="px-3 py-2 text-xs leading-snug text-subtle">{CANONICAL_HINT}</p>
        </div>
      ) : null}
    </div>
  );
}

const CANONICAL_HINT = "peddavommond.de/moeglichkeitensystem";
