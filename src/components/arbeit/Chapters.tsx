import { Link } from "@tanstack/react-router";
import { Chapter, Recap } from "./shell";

export function Abstract() {
  return (
    <section id="kurzfassung" aria-labelledby="kurzfassung-titel" className="mt-14 scroll-mt-24 md:mt-16">
      <p className="text-xs font-medium tracking-widest text-subtle uppercase">Kurz</p>
      <h2 id="kurzfassung-titel" className="mt-3 font-display text-3xl text-fg md:text-4xl">
        Kurzfassung
      </h2>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-fg">
        <p>Pedda steht in der Mitte seines Studios in Ehrenfeld. Nicht am Rechner.</p>
        <p>
          Im Blick: Lichtschalter an der Wand, Rollladen am Fenster. Beides sichtbar. Zu beidem muss
          er hingehen.
        </p>
        <p>
          Ein Mensch würde schalten und den Gurt ziehen. Jemand, der hier Software baut, sieht zuerst
          den Rechner und die Dose. Ein Roboter sieht Boden, Türmaß, Schwelle.
        </p>
        <p>
          <a href="#gibson" className="underline-offset-4 hover:underline">
            Gibson
          </a>
          : der Schalter ist ein Angebot, keine weiße Platte.{" "}
          <a href="#uexkuell" className="underline-offset-4 hover:underline">
            Uexküll
          </a>
          : das ist nicht dieselbe Welt für alle drei.{" "}
          <a href="#lewin" className="underline-offset-4 hover:underline">
            Lewin
          </a>
          : der Rand dieser Welt verschiebt sich, wenn jemand Hunger hat oder die Bäckerei zu ist.
        </p>
        <p>
          In{" "}
          <a href="#kern" className="underline-offset-4 hover:underline">
            Kapitel 7
          </a>{" "}
          steht, warum eine gemeinsame Geräteliste die Verdrahtung falsch macht. Das{" "}
          <Link to="/feld" className="underline-offset-4 hover:underline">
            Feld
          </Link>{" "}
          zeichnet die drei Listen.
        </p>
      </div>
    </section>
  );
}

export function HowToRead() {
  return (
    <Chapter
      id="lesen"
      number="0"
      title="Wie man diese Arbeit liest"
      about="Tablet. Dieselben Wörter nach der ersten Erklärung. Das Feld gehört zur Arbeit."
    >
      <p>Geschrieben für ein Tablet. Am Telefon geht es auch. Drucken lässt die Leiste weg.</p>
      <p>Jedes Kapitel endet mit zwei Zeilen.</p>
      <p>
        Drei Wörter bleiben fest: Angebot. Umwelt. Lebensraum. Erklärung einmal. Danach dieselben
        Wörter. Das{" "}
        <a href="#glossar" className="underline-offset-4 hover:underline">
          Glossar
        </a>{" "}
        liegt hinten.
      </p>
      <p>
        Das{" "}
        <Link to="/feld" className="underline-offset-4 hover:underline">
          Feld
        </Link>{" "}
        ist die Prüfung. Oben drei Schalter: Mensch, Entwickler, Roboter.
      </p>
      <Recap>Kurzfassung, Kapitel 1, Kapitel 7, dann das Feld.</Recap>
    </Chapter>
  );
}

export function Case() {
  return (
    <Chapter
      id="fall"
      number="1"
      title="Pedda steht im Zimmer"
      about="Der Fall ist der Ort. Kein Beispiel nebenbei."
    >
      <p>Mitte des Studios. Nicht am Schreibtisch.</p>
      <p>Vor ihm das Fenster und der Gurt des Rollladens. Rechts an der Wand der Lichtschalter. Daneben die Tür.</p>
      <p>Beides im Gesichtsfeld. Zu beidem ein paar Schritte.</p>
      <p>Ein Mensch würde hier das Licht ändern, den Blick zumuten, lüften.</p>
      <h3 className="pt-2 font-display text-2xl">Was er weiß, ohne es zu sehen</h3>
      <p>Die Gitarre steht hinter ihm.</p>
      <p>Der Rechner steht an der Westwand. In dieser Haltung ist der Rechner nicht das Angebot des Raumes.</p>
      <h3 className="pt-2 font-display text-2xl">Wenn der Rand wächst</h3>
      <p>Nachbarräume: Wasserkocher, Sofa, Dusche.</p>
      <p>Weiter: die Bäckerei an der Venloer. Nicht als Adresse. Als Bestand, der sich über den Tag leert.</p>
      <Recap>Der Fall beginnt in der Raummitte. Keine Karte. Kein Rechner als Zentrum.</Recap>
    </Chapter>
  );
}

export function Question() {
  return (
    <Chapter
      id="frage"
      number="2"
      title="Eine Geräteliste kennt den Standpunkt nicht"
      about="Wohnungs-App, Navigation, Stadtkarte zählen, was da ist. Sie zählen nicht, wer da steht."
    >
      <p>Viele Systeme kennen den Raum als Liste.</p>
      <ul className="list-disc space-y-3 pl-5">
        <li>Die Wohnung als Geräte. Licht, Heizung, Rollladen, alle gleich lang in einer App.</li>
        <li>Die Stadt als kürzeste Linie. Asphalt, Minuten, kein Hunger.</li>
        <li>Die Bäckerei als Punkt. Name, Öffnungszeit, kein Bestand.</li>
      </ul>
      <p>Die Listen beantworten: Was ist dort?</p>
      <p>Hier zählt: Was würde Pedda von der Raummitte aus jetzt nutzen. Und was ein anderer Körper.</p>
      <p>Dann reicht eine gemeinsame Liste nicht.</p>
      <Recap>Was existiert, ist noch kein Angebot.</Recap>
    </Chapter>
  );
}

export function GibsonChapter() {
  return (
    <Chapter
      id="gibson"
      number="3"
      kicker="James J. Gibson · 1904–1979"
      title="Der Schalter ist kein Gegenstand"
      about="Gibson war Psychologe. Er hat zugesehen, wie Menschen sich in der Welt bewegen. Nicht nur im Labor."
    >
      <h3 className="font-display text-2xl">Was ihn störte</h3>
      <p>In den Lehrbüchern sehen wir Wellenlängen. Kanten. Flächen.</p>
      <p>Im Leben sehen wir etwas anderes.</p>
      <p>Wir sehen, worauf man sich setzen kann. Was sich greifen lässt. Wo eine Lücke ist, durch die man passt.</p>
      <h3 className="pt-2 font-display text-2xl">Das Wort</h3>
      <p>
        Gibson nannte das <em>affordance</em>. In dieser Arbeit heißt es Angebot.
      </p>
      <p>Der Lichtschalter ist nicht zuerst eine weiße Platte. Er ist: drücken. Helligkeit ändern.</p>
      <p>Das Angebot sitzt nicht im Plastik. Es sitzt nicht in deinem Kopf.</p>
      <p>Es sitzt dazwischen. Zwischen einem Körper, der Hände hat. Und einer Wand, die so gebaut ist, dass eine Hand dort etwas tun kann.</p>
      <h3 className="pt-2 font-display text-2xl">Deshalb reicht Inventar nicht</h3>
      <p>Ein Kleinkind bekommt vom Mischpult ein anderes Angebot als du.</p>
      <p>Eine Katze bekommt vom Fensterbrett ein anderes Angebot als ein Gast.</p>
      <p>Dieselbe Sache. Verschiedene Körper. Verschiedene Angebote.</p>
      <h3 className="pt-2 font-display text-2xl">Ein häufiges Missverständnis</h3>
      <p>Später hat Don Norman das Wort in die Gestaltung von Dingen geholt.</p>
      <p>Bei Norman geht es oft darum, was ein Ding zu tun scheint. Ein Griff sieht aus, als könne man ziehen.</p>
      <p>Bei Gibson existiert das Angebot auch, wenn du es nicht siehst.</p>
      <p>Die Gitarre hinter dir ist ein Angebot. Du siehst sie nicht. Du könntest sie holen.</p>
      <p>Diese Arbeit folgt Gibson. Das Blickfeld ist wichtig. Es ist nicht die ganze Welt der Angebote.</p>
      <Recap>Ein Angebot ist eine Handlung zwischen Körper und Ort. Kein Eintrag in einer Liste von Dingen.</Recap>
    </Chapter>
  );
}

export function UexkuellChapter() {
  return (
    <Chapter
      id="uexkuell"
      number="4"
      kicker="Jakob von Uexküll · 1864–1944"
      title="Die Zecke kennt keinen Wald"
      about="Uexküll war Biologe. Er hat gefragt, welche Welt ein Lebewesen überhaupt hat."
    >
      <h3 className="font-display text-2xl">Die Zecke</h3>
      <p>Uexküll hat sich eine Zecke auf einem Zweig angesehen.</p>
      <p>Für uns ist da ein Wald. Stämme. Vögel. Moos. Wetter.</p>
      <p>Für die Zecke gibt es drei Dinge.</p>
      <ul className="list-disc space-y-3 pl-5">
        <li>Der Geruch von Buttersäure. Ein Säugetier ist unterwegs.</li>
        <li>Wärme.</li>
        <li>Haare.</li>
      </ul>
      <p>Alles andere existiert in ihrer Welt nicht.</p>
      <h3 className="pt-2 font-display text-2xl">Zwei Wörter, die man nicht tauschen darf</h3>
      <p>
        <strong className="font-medium">Umgebung</strong> ist alles, was physikalisch da ist.
      </p>
      <p>
        <strong className="font-medium">Umwelt</strong> ist der Schnitt, der für dieses Wesen vorkommt.
      </p>
      <p>Die Umgebung ist der Wald. Die Umwelt der Zecke sind drei Zeichen.</p>
      <h3 className="pt-2 font-display text-2xl">Im Studio</h3>
      <p>Dein Studio hat eine andere Umwelt als die der Nachbarin.</p>
      <p>Eine andere als die der Katze auf dem Sims.</p>
      <p>Eine andere als die des Rechners, der hier steht und nichts riecht.</p>
      <p>Die Bäckerei kommt in deiner Umwelt als Brötchen vor. Nicht als Grundbuchblatt.</p>
      <p>Nachts fällt sie oft ganz heraus. Geschlossen. Kein Bestand. Kein Sinn zu gehen.</p>
      <p>Eine Stadtkarte zeichnet alle Häuser gleich. Das Möglichkeitensystem zeichnet nur das, was in dieser Umwelt gerade trägt.</p>
      <Recap>Umwelt ist nicht Umgebung. Die Zecke lebt nicht im Wald. Sie lebt in drei Zeichen.</Recap>
    </Chapter>
  );
}

export function LewinChapter() {
  return (
    <Chapter
      id="lewin"
      number="5"
      kicker="Kurt Lewin · 1890–1947"
      title="Der Horizont hat Hunger"
      about="Lewin war Psychologe. Er hat gefragt, welche Lage für einen Menschen jetzt wirklich ist."
    >
      <h3 className="font-display text-2xl">Ein Wort, das man hier sauber halten muss</h3>
      <p>Lewin sagt Lebensraum.</p>
      <p>Er meint nicht ein politisches Gebiet. Er meint den Raum, der für dich jetzt zählt.</p>
      <p>Hunger. Müdigkeit. Ein Termin. Ein geschlossenes Gitter. Das alles verschiebt den Raum.</p>
      <h3 className="pt-2 font-display text-2xl">Die kurze Formel</h3>
      <p>Lewin hat Verhalten in einen Satz gepresst.</p>
      <p>
        <span lang="en">B = f(P, E)</span>. Verhalten ist Funktion von Person und Lage.
      </p>
      <p>Was du tust, hängt von dir ab. Und von der Lage.</p>
      <p>Die Lage, die zählt, ist nicht das GPS.</p>
      <p>Es ist der Lebensraum. Alles, was für dich jetzt psychisch wirklich ist.</p>
      <ul className="list-disc space-y-3 pl-5">
        <li>Der Rollladen, wenn die Sonne stört.</li>
        <li>Die Bäckerei, wenn der Magen leer ist.</li>
        <li>Das Sofa, wenn der Tag zu lang war.</li>
      </ul>
      <h3 className="pt-2 font-display text-2xl">Der Rand bewegt sich</h3>
      <p>Hunger macht die Bäckerei größer.</p>
      <p>Nacht macht sie kleiner.</p>
      <p>Ein Termin in der Stadt zieht einen fernen Platz in den Horizont. Obwohl er kilometerweit liegt.</p>
      <p>Der Radius im Instrument ist deshalb keine Entfernung auf dem Asphalt. Er ist die Kante dieses Lebensraums.</p>
      <p>Ziehst du ihn auf, kommen Dinge ins Feld, die vorher nur gewusst waren.</p>
      <p>Ziehst du ihn zu, bleiben die zwei, drei Angebote, die der Körper jetzt braucht.</p>
      <Recap>Lebensraum ist die Lage, die für dich jetzt wirklich ist. Der Horizont ist ihr Rand.</Recap>
    </Chapter>
  );
}

export function Together() {
  return (
    <Chapter
      id="drei"
      number="6"
      title="Drei Namen, eine Beobachtung"
      about="Sie haben einander nicht als Schule gehört. Zusammen sagen sie dasselbe. Von drei Seiten. Und sie trennen sich an einer Stelle."
    >
      <p>Gibson hat wahrgenommen. Uexküll hat Lebewesen unterschieden. Lewin hat Felder gezeichnet.</p>
      <p>Zusammen:</p>
      <p>Die Welt ist kein Lagerhaus voller Dinge, dem wir später Bedeutung überstülpen.</p>
      <p>Was zählt, ist schon im Greifen da. Im Sehen. Im Hunger.</p>
      <p>Ein Ort ist die Menge seiner Angebote für jemanden, der hier steht.</p>
      <h3 className="pt-2 font-display text-2xl">Wo sie sich trennen</h3>
      <p>Bei Gibson bleibt das Angebot oft stehen. Auch wenn du gerade keinen Hunger hast. Der Stuhl trägt dich trotzdem.</p>
      <p>Bei Lewin ändert die Lage das Feld. Hunger macht die Bäckerei größer. Satt macht sie kleiner.</p>
      <p>Bei Uexküll ist die Trennung härter. Verschiedene Wesen. Verschiedene Welten. Nicht nur verschiedene Stimmungen.</p>
      <p>Diese Arbeit braucht alle drei Schnitte.</p>
      <ul className="list-disc space-y-3 pl-5">
        <li>Gibson: Was der Ort diesem Körper anbietet.</li>
        <li>Lewin: Was davon jetzt zählt.</li>
        <li>Uexküll: Wer dieser Körper überhaupt ist.</li>
      </ul>
      <p>Deshalb beginnt die Arbeit nicht mit einer Karte von Köln. Sie beginnt in der Raummitte.</p>
      <p>Und sie bleibt ehrlich, wenn der Horizont wächst. Die Bäckerei ist kein Punkt. Sie ist ein Bestand, der sich über den Tag leert.</p>
      <Recap>Angebot: was möglich ist. Lebensraum: was jetzt zählt. Umwelt: für welches Wesen.</Recap>
    </Chapter>
  );
}

export function Kernel() {
  return (
    <Chapter
      id="kern"
      number="7"
      title="Maschinen haben andere Angebote"
      about="Im selben Studio stehen ein Mensch, jemand der Software baut, und ein Apparat."
    >
      <p>Ein Mensch sieht den Schalter und den Gurt.</p>
      <p>Jemand, der Software baut, sieht den Rechner, das Netz, Tokens, Logs, eine Dose unter dem Tisch.</p>
      <p>Ein Roboter sieht Boden, Türmaß, Schwelle, Steckdose, Glas.</p>
      <p>Der Rollladen bleibt derselbe Gegenstand.</p>
      <ul className="list-disc space-y-3 pl-5">
        <li>Für Pedda: Licht dosieren.</li>
        <li>Für den Schirm: Blendung.</li>
        <li>Für den Arm: ein Tuch an einer Schnur.</li>
      </ul>
      <h3 className="pt-2 font-display text-2xl">Der Kern</h3>
      <p>Ein Roboter hat in diesem Zimmer Angebote. Es sind nicht die des Menschen.</p>
      <p>Software und Hardware werden oft so verdrahtet, als gäbe es eine Liste für alle.</p>
      <p>Die erste Frage ist: wessen Umwelt.</p>
      <p>Uexküll: Wesen, nicht Stimmung. Gibson: Handlung, nicht Ding. Lewin: Horizont, nicht Meter.</p>
      <Recap>Wer die drei Listen vermengt, verdrahtet falsch. Auch mit guter Technik.</Recap>
    </Chapter>
  );
}

export function Method() {
  return (
    <Chapter
      id="methode"
      number="8"
      title="Das Feld ist die Methode"
      about="Dieselbe Behauptung, gezeichnet."
    >
      <p>Im Instrument stehst du in der Raummitte.</p>
      <p>Oben die Umwelt. Mensch. Entwickler. Roboter.</p>
      <p>Derselbe Grundriss. Andere Marken.</p>
      <ul className="list-disc space-y-3 pl-5">
        <li>Der Keil ist das Blickfeld.</li>
        <li>Der Kreis ist der Horizont.</li>
        <li>Jede Marke ist ein Angebot. Kein Stecknadel-Ort.</li>
      </ul>
      <p>Wechsle zuerst die Umwelt. Dann weite den Radius.</p>
      <p>Dann siehst du, warum Verdrahtung nicht bei einer gemeinsamen Liste beginnen kann.</p>
      <p>Die Bäckerei bleibt dasselbe Haus. Im Feld des Menschen ist sie Bestand. Im Feld des Entwicklers ist sie Dose und Funk. Im Feld des Roboters ist sie Stufe, Knauf, Dichte.</p>
      <p>
        <Link
          to="/feld"
          className="inline-flex min-h-12 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-fg"
        >
          Feld öffnen
        </Link>
      </p>
      <Recap>Das Feld prüft die Behauptung. Wenn die Marken gleich bleiben, ist die Umwelt nicht gewechselt.</Recap>
    </Chapter>
  );
}

export function Wiring() {
  return (
    <Chapter
      id="verdrahtung"
      number="9"
      title="Was sich verdrahten lässt"
      about="Folgen der Beobachtung. Keine Produktliste."
    >
      <p>Eine App, die alle Geräte der Wohnung auflistet, ist noch kein Möglichkeitensystem. Sie kennt Inventar, nicht den Standpunkt.</p>
      <p>Eine Navigation kennt Asphalt. Sie kennt nicht, dass um halb acht nur das Milchbrötchen zählt.</p>
      <p>Eine Stadtkarte kennt Häuser. Sie kennt Peddas Umwelt nicht.</p>
      <h3 className="pt-2 font-display text-2xl">Wohin die Schnur gehen kann</h3>
      <p>Ein Haus gibt dem Körper den Schalter und der Maschine die Dose.</p>
      <p>Ein Laden zeigt den Bestand und dem Apparat die Stufe.</p>
      <p>Ein Modell kennt den Horizont dessen, der fragt, nicht „die Stadt“.</p>
      <p>Die Verdrahtung kommt nach der Differenz. Nicht davor.</p>
      <p>
        <Link to="/schnitt" className="underline-offset-4 hover:underline">
          Fünf Schnitte, umweltgetrennt
        </Link>
        . Haus. Bestand. Gehen. Modell. Apparat. Zuerst simuliert.
      </p>
      <Recap>Die Schnitte folgen aus den drei Listen. Sie sind kein Extra-Produkt.</Recap>
    </Chapter>
  );
}
