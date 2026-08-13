import { useId, useState } from "react";
import { allLoci, ownAtlas, writeOwnAtlas } from "@/lib/moeglichkeiten/atlas";
import { DIMENSIONS } from "@/lib/moeglichkeiten/model";
import { exportAtlasJson, parseAtlasJson, type SavedAtlas } from "@/lib/moeglichkeiten/persist";
import { useField } from "@/lib/moeglichkeiten/store";
import type { Affordance, DimensionId, Locus, UmweltId } from "@/lib/moeglichkeiten/types";
import { UMWELTEN } from "@/lib/moeglichkeiten/umwelten";
import { Button } from "@/components/ui/button";

function slug(name: string) {
  const s = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "ort";
}

export function OwnPlace({ onClose }: { onClose: () => void }) {
  const { bumpAtlas, goTo } = useField();
  const titleId = useId();
  const [name, setName] = useState("");
  const [kind, setKind] = useState("Raum");
  const [blurb, setBlurb] = useState("");
  const [title, setTitle] = useState("");
  const [verb, setVerb] = useState("");
  const [umwelt, setUmwelt] = useState<UmweltId>("mensch");
  const [dimension, setDimension] = useState<DimensionId>("handeln");
  const [draftOffers, setDraftOffers] = useState<Affordance[]>([]);
  const [error, setError] = useState<string | null>(null);

  function addOffer() {
    if (!title.trim() || !verb.trim()) {
      setError("Jedes Angebot braucht einen Namen und ein Verb.");
      return;
    }
    setError(null);
    const id = `eigen-${slug(title)}-${draftOffers.length + 1}`;
    setDraftOffers((rows) => [
      ...rows,
      {
        id,
        locusId: "pending",
        title: title.trim(),
        verb: verb.trim(),
        description: `${verb.trim()} an diesem Ort.`,
        humanUse: `Für diese Umwelt: ${verb.trim()}.`,
        dimension,
        umwelt,
        lx: (rows.length % 3) - 1,
        ly: Math.floor(rows.length / 3) - 0.2,
        visibleStanding: true,
        requiresWalk: true,
        walkSeconds: 6,
        salience: 0.8,
        source: "eigen",
      },
    ]);
    setTitle("");
    setVerb("");
  }

  function save() {
    if (!name.trim()) {
      setError("Der Ort braucht einen Namen.");
      return;
    }
    if (draftOffers.length === 0) {
      setError("Mindestens ein Angebot. Sonst ist es Inventar ohne Welt.");
      return;
    }
    const missing = draftOffers.find((a) => !a.umwelt);
    if (missing) {
      setError("Ein Angebot ohne Umwelt ist ein Fehler.");
      return;
    }
    const id = `eigen-${slug(name)}-${Date.now().toString(36)}`;
    const used = allLoci().some((l) => l.x === 0 && l.y === 0);
    const locus: Locus = {
      id,
      name: name.trim(),
      kind: kind.trim() || "Ort",
      district: "Eigene Mitte",
      x: used ? 24 + Math.random() * 8 : 0,
      y: used ? -18 + Math.random() * 6 : 0,
      defaultFacing: 0,
      blurb: blurb.trim() || "Eigene Mitte. Dieselbe Frage: wessen Körper?",
      source: "eigen",
    };
    const angebote = draftOffers.map((a) => ({ ...a, locusId: id }));
    const prev = ownAtlas();
    const next: SavedAtlas = {
      version: 1,
      theorie: "angebot-umwelt-lebensraum",
      loci: [...prev.loci, locus],
      angebote: [...prev.angebote, ...angebote],
    };
    writeOwnAtlas(next);
    bumpAtlas();
    goTo(id);
    onClose();
  }

  function download() {
    const blob = new Blob([exportAtlasJson(ownAtlas())], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "atlas.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function onImport(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const next = parseAtlasJson(String(reader.result ?? ""));
        writeOwnAtlas(next);
        bumpAtlas();
        setError(null);
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : "JSON unlesbar.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <section
      role="dialog"
      aria-labelledby={titleId}
      className="rounded-xl border border-border bg-elevated p-5 shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Eigene Mitte</p>
          <h3 id={titleId} className="mt-1 font-display text-2xl text-fg">
            Ich stehe hier
          </h3>
        </div>
        <button type="button" className="min-h-11 text-xs text-subtle hover:text-fg" onClick={onClose}>
          Schließen
        </button>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Raum skizzieren. Angebote benennen. Jedes Angebot gehört zu einer Umwelt.
      </p>

      <div className="mt-5 grid gap-3">
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-widest text-subtle">Ort</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
            placeholder="Studio, Küche, Hof"
          />
        </label>
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-widest text-subtle">Art</span>
          <input
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
            placeholder="Raum"
          />
        </label>
        <label className="block text-sm">
          <span className="text-xs uppercase tracking-widest text-subtle">Was man hier sieht</span>
          <textarea
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-fg"
          />
        </label>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-xs font-medium uppercase tracking-widest text-subtle">Angebot</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-xs text-subtle">Name</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
              placeholder="Lichtschalter"
            />
          </label>
          <label className="block text-sm">
            <span className="text-xs text-subtle">Verb</span>
            <input
              value={verb}
              onChange={(e) => setVerb(e.target.value)}
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
              placeholder="drücken"
            />
          </label>
          <label className="block text-sm">
            <span className="text-xs text-subtle">Umwelt</span>
            <select
              value={umwelt}
              onChange={(e) => setUmwelt(e.target.value as UmweltId)}
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
            >
              {UMWELTEN.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-xs text-subtle">Dimension</span>
            <select
              value={dimension}
              onChange={(e) => setDimension(e.target.value as DimensionId)}
              className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
            >
              {DIMENSIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <Button type="button" variant="outline" size="sm" className="mt-3" onClick={addOffer}>
          Angebot hinzufügen
        </Button>
        {draftOffers.length > 0 ? (
          <ul className="mt-3 space-y-1 text-sm">
            {draftOffers.map((a) => (
              <li key={a.id} className="text-muted">
                {a.title} · {a.verb} · {a.umwelt}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="button" onClick={save}>
          Speichern
        </Button>
        <Button type="button" variant="outline" onClick={download}>
          JSON holen
        </Button>
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-md border border-border px-3 text-sm">
          JSON legen
          <input
            type="file"
            accept="application/json"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImport(file);
            }}
          />
        </label>
      </div>
      <p className="mt-3 text-xs text-subtle">Nur auf diesem Gerät. Kein Konto nötig.</p>
    </section>
  );
}
