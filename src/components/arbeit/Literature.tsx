export function Literature() {
  return (
    <section id="quellen" aria-labelledby="quellen-titel" className="mt-20 scroll-mt-24 md:mt-24">
      <p className="text-xs font-medium tracking-widest text-subtle uppercase">Anhang</p>
      <h2 id="quellen-titel" className="mt-3 font-display text-3xl text-fg md:text-4xl">
        Quellen
      </h2>
      <p className="mt-4 text-base text-muted md:text-lg">
        Knapp. Ehrlich. Keine Seitenzahlen aus dem Gedächtnis.
      </p>
      <ul className="mt-8 space-y-6 text-lg leading-relaxed text-fg">
        <li>
          <p>Gibson, James J. (1979). The Ecological Approach to Visual Perception. Boston: Houghton Mifflin.</p>
          <p className="mt-2 text-base text-muted">
            Das Wort affordance. Wahrnehmung als Angebot zwischen Körper und Ort, nicht als
            Konstruktion aus Sinnesdaten.
          </p>
        </li>
        <li>
          <p>
            Uexküll, Jakob von (1934). Streifzüge durch die Umwelten von Tieren und Menschen. Berlin:
            Springer.
          </p>
          <p className="mt-2 text-base text-muted">
            Die Zecke. Umwelt gegen Umgebung. Drei Zeichen, kein Wald.
          </p>
        </li>
        <li>
          <p>Lewin, Kurt (1936). Principles of Topological Psychology. New York: McGraw-Hill.</p>
          <p className="mt-2 text-base text-muted">
            Lebensraum. B = f(P, E). Verhalten hängt von der Person und von der Lage ab. Nicht vom
            GPS.
          </p>
        </li>
        <li>
          <p>Lewin, Kurt (1951). Field Theory in Social Science. New York: Harper.</p>
          <p className="mt-2 text-base text-muted">Felder, die sich mit der Lage ändern.</p>
        </li>
        <li>
          <p>Norman, Donald A. (1988). The Psychology of Everyday Things. New York: Basic Books.</p>
          <p className="mt-2 text-base text-muted">
            Nur weil das Wort affordance dort in die Gestaltung gewandert ist. Diese Arbeit folgt
            Gibson. Bei Norman scheint ein Griff etwas. Bei Gibson existiert das Angebot auch im
            Rücken.
          </p>
        </li>
      </ul>
    </section>
  );
}
