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
    def: "Was ein Ort einem bestimmten Körper zu tun gibt. Nicht der Gegenstand selbst. Der Lichtschalter als Angebot heißt: drücken.",
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
    id: "wort-sinn",
    term: "Sinn",
    def: "Was jetzt das Nächste ist. Sichtbar. Erreichbar. Passend zur Lage. Nicht: alles, was möglich wäre.",
  },
  {
    id: "wort-aura",
    term: "Aura",
    def: "Der Nahbereich, in dem Ort und Körper über ein Regelwerk sprechen dürfen. Zwei Richtungen: Empfang und Ausstrahlung. Kein Funk-Marketing. Ein Horizont mit Erlaubnis.",
  },
  {
    id: "wort-ausstrahlung",
    term: "Ausstrahlung",
    def: "Was du der Nähe zu lesen gibst. Umwelt, Horizont, Blick, Freigabe. Nicht alles, was messbar wäre.",
  },
  {
    id: "wort-empfang",
    term: "Empfang",
    def: "Was der Ort dir anbietet. Die erste Richtung dieser Arbeit. Lichtschalter. Bestand. Stufe.",
  },
  {
    id: "wort-regelwerk",
    term: "Regelwerk",
    def: "Die Sätze, nach denen Nähe sprechen darf. Standard, nicht Plattform. Ein fremdes Ding kann sie lernen. Ohne Konto.",
  },
  {
    id: "wort-verdrahtung",
    term: "Verdrahtung",
    def: "Später: Software und Hardware so bauen, dass sie die neun Sätze halten. Nicht eine gemeinsame Liste erzwingen.",
  },
];
