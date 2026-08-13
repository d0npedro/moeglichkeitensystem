export function Glossary() {
  return (
    <section id="glossar" aria-labelledby="glossar-titel" className="mt-20 scroll-mt-24 md:mt-24">
      <p className="text-xs font-medium tracking-widest text-subtle uppercase">Anhang</p>
      <h2 id="glossar-titel" className="mt-3 font-display text-3xl text-fg md:text-4xl">
        Glossar
      </h2>
      <p className="mt-4 text-base text-muted md:text-lg">
        Dieselben Wörter, jedes Mal gleich. Kein Wechsel der Namen.
      </p>
      <dl className="mt-8 space-y-6">
        {ENTRIES.map((e) => (
          <div key={e.term} id={e.id} className="scroll-mt-24 border-t border-border pt-5">
            <dt className="font-display text-xl text-fg">{e.term}</dt>
            <dd className="mt-2 text-lg leading-relaxed text-fg">{e.def}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const ENTRIES = [
  {
    id: "wort-angebot",
    term: "Angebot",
    def: "Was dieser Ort diesem Körper zu tun gibt. Der Lichtschalter heißt: drücken. Nicht: weiße Platte.",
  },
  {
    id: "wort-affordance",
    term: "Affordance",
    def: "Gibsons englisches Wort für Angebot. In dieser Arbeit steht danach immer das deutsche Wort.",
  },
  {
    id: "wort-umwelt",
    term: "Umwelt",
    def: "Die Welt, die für jemanden überhaupt vorkommt. Nicht die ganze Gegend. Die Zecke hat eine andere Umwelt als du.",
  },
  {
    id: "wort-umgebung",
    term: "Umgebung",
    def: "Alles, was physikalisch da ist. Wände, Luft, Häuser. Die Umgebung ist größer als jede Umwelt.",
  },
  {
    id: "wort-lebensraum",
    term: "Lebensraum",
    def: "Bei Lewin: alles, was für dich jetzt zählt. Nicht ein politisches Gebiet. Hunger macht die Bäckerei größer.",
  },
  {
    id: "wort-horizont",
    term: "Horizont",
    def: "Der Rand des Lebensraums. Im Instrument der Radius. Was dahinter liegt, existiert. Es trägt gerade nicht.",
  },
  {
    id: "wort-lage",
    term: "Lage",
    def: "Bei Lewin der Zustand der Person im Feld. Hunger, Müdigkeit, ein Termin. Die Lage ändert den Lebensraum. Nicht die Umgebung.",
  },
  {
    id: "wort-sinn",
    term: "Sinn",
    def: "Was jetzt das Nächste ist. Sichtbar. Erreichbar. Passend zur Lage. Nicht: alles, was möglich wäre.",
  },
  {
    id: "wort-verdrahtung",
    term: "Verdrahtung",
    def: "Später: Software und Hardware so bauen, dass sie die Differenz der Umwelten halten. Nicht eine gemeinsame Liste erzwingen.",
  },
];
