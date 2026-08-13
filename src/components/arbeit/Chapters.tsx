import { Link } from "@tanstack/react-router";
import { PRINCIPLES } from "@/lib/moeglichkeiten/aura";
import { Chapter, Recap } from "./shell";

export function Abstract() {
  return (
    <section id="kurzfassung" aria-labelledby="kurzfassung-titel" className="mt-14 scroll-mt-24 md:mt-16">
      <p className="text-xs font-medium tracking-widest text-subtle uppercase">Zuerst dies</p>
      <h2 id="kurzfassung-titel" className="mt-3 font-display text-3xl text-fg md:text-4xl">
        Kurzfassung
      </h2>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-fg">
        <p>Diese Arbeit fragt eine Sache.</p>
        <p>Was kann jemand an einem Ort wirklich tun?</p>
        <p>Nicht: Was existiert dort?</p>
        <p>
          Die Antwort hängt davon ab, wer da steht. Ein Mensch. Ein Mensch, der Software baut. Ein
          Roboter. Dieselbe Raummitte. Drei verschiedene Welten.
        </p>
        <p>Drei Forscher haben das vorbereitet. Sie kannten einander nicht als Schule.</p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <a href="#gibson" className="underline-offset-4 hover:underline">
              Gibson
            </a>{" "}
            sah: Ein Ort bietet Handlungen an. Nicht nur Gegenstände.
          </li>
          <li>
            <a href="#uexkuell" className="underline-offset-4 hover:underline">
              Uexküll
            </a>{" "}
            sah: Jedes Wesen hat seine eigene Welt.
          </li>
          <li>
            <a href="#lewin" className="underline-offset-4 hover:underline">
              Lewin
            </a>{" "}
            sah: Diese Welt hat einen Rand. Der Rand ändert sich.
          </li>
        </ul>
        <p>
          Der Kern steht in{" "}
          <a href="#kern" className="underline-offset-4 hover:underline">
            Kapitel 7
          </a>
          . Die Vision steht in{" "}
          <a href="#aura" className="underline-offset-4 hover:underline">
            Kapitel 9
          </a>
          : eine Aura, die mit der Nähe über ein Regelwerk sprechen darf. Und eine Informationsaura,
          die du in die Umgebung ausstrahlst. Das gibt es so nicht. Deshalb kommen die Sätze vor der
          Verdrahtung.
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
      about="Tablet. Kurze Sätze. Dieselben Wörter. Das Feld ist die Methode, kein Extra."
    >
      <p>Diese Arbeit ist für ein Tablet geschrieben. Du kannst sie auch am Telefon lesen.</p>
      <p>Jedes Kapitel hat eine Aufgabe. Am Ende steht sie noch einmal in zwei Zeilen.</p>
      <p>
        Drei Wörter kehren immer wieder: Angebot. Umwelt. Lebensraum. Später kommt ein viertes: Aura.
        Sie werden beim ersten Mal erklärt. Danach bleiben sie. Ein{" "}
        <a href="#glossar" className="underline-offset-4 hover:underline">
          Glossar
        </a>{" "}
        sammelt sie hinten.
      </p>
      <p>
        Das{" "}
        <Link to="/feld" className="underline-offset-4 hover:underline">
          Feld
        </Link>{" "}
        ist kein Schmuck. Es ist die Methode. Dieselbe Mitte. Drei Schalter: Mensch, Entwickler,
        Roboter.
      </p>
      <Recap>Lies die Kurzfassung. Dann Kapitel 1, 7 und 9. Dann öffne das Feld.</Recap>
    </Chapter>
  );
}

export function Case() {
  return (
    <Chapter
      id="fall"
      number="1"
      title="Du stehst im Zimmer"
      about="Der Fall ist kein Beispiel neben der Theorie. Er ist der Ort, an dem die Theorie gilt."
    >
      <p>Nicht am Schreibtisch. In der Mitte.</p>
      <p>Vor dir das Fenster. Der Gurt des Rollladens. Rechts an der Wand der Lichtschalter. Daneben die Tür.</p>
      <p>Beides siehst du, ohne dich umzudrehen. Zu beidem müsstest du ein paar Schritte gehen.</p>
      <p>Das sind die nächsten sinnvollen Dinge, die dieser Raum dir jetzt gibt.</p>
      <p>Nicht weil sie teuer sind. Nicht weil sie smart sind. Weil ein Mensch genau das hier tun würde.</p>
      <p>Licht ändern. Blick dosieren. Lüften.</p>
      <h3 className="pt-2 font-display text-2xl">Was du weißt, ohne es zu sehen</h3>
      <p>Die Gitarre steht hinter dir. Du weißt das. Du siehst sie nicht.</p>
      <p>Der Rechner steht an der Westwand. Er ist da. In dieser Haltung ist er nicht das Angebot des Raumes.</p>
      <h3 className="pt-2 font-display text-2xl">Wenn der Rand wächst</h3>
      <p>Weitest du den Horizont, kommen die Nachbarräume. Wasserkocher. Sofa. Dusche.</p>
      <p>Noch weiter die Bäckerei an der Venloer. Nicht als Adresse. Als Bestand.</p>
      <p>Welche Brötchen heute da sind. Welche nach zehn schon weg sind.</p>
      <p>Genau das zeichnet das Möglichkeitensystem.</p>
      <Recap>Der Fall beginnt in der Raummitte. Nicht auf einer Karte. Nicht am Rechner.</Recap>
    </Chapter>
  );
}

export function Question() {
  return (
    <Chapter
      id="frage"
      number="2"
      title="Die Frage ist nicht: Was existiert?"
      about="Drei übliche Antworten verfehlen den Ort. Inventar. Route. Stadt. Alle zählen Dinge. Keine fragt nach dem Standpunkt."
    >
      <p>Viele Systeme kennen den Raum. Sie kennen ihn als Liste.</p>
      <ul className="list-disc space-y-3 pl-5">
        <li>Die Wohnung als Geräte. Licht. Heizung. Rollladen. Alle gleich lang in einer App.</li>
        <li>Die Stadt als kürzeste Linie. Asphalt. Minuten. Kein Hunger.</li>
        <li>Die Bäckerei als Punkt auf der Karte. Name. Öffnungszeit. Kein Bestand.</li>
      </ul>
      <p>Diese Listen sind nicht falsch. Sie sind eine andere Frage.</p>
      <p>Sie fragen: Was ist dort?</p>
      <p>Diese Arbeit fragt: Was würde man dort wirklich nutzen? Von hier aus. Jetzt. Mit diesem Körper.</p>
      <p>Sobald die Frage wechselt, reicht eine gemeinsame Liste nicht mehr.</p>
      <Recap>Existenz ist nicht Angebot. Die Doktorarbeit beginnt bei diesem Schnitt.</Recap>
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
      <Recap>Angebot sagt, was möglich ist. Lebensraum sagt, was jetzt zählt. Umwelt sagt, für wen.</Recap>
    </Chapter>
  );
}

export function Kernel() {
  return (
    <Chapter
      id="kern"
      number="7"
      title="Dieselbe Mitte, drei Welten"
      about="Die drei Namen reichen nicht. Im selben Studio stehen heute nicht nur Menschen."
    >
      <p>Ein Mensch sieht den Schalter und den Gurt.</p>
      <p>Ein Mensch, der Software baut, sieht den Rechner. Das Netz. Was sich anbinden lässt. Tokens. Logs. Eine Dose unter dem Tisch.</p>
      <p>Ein Roboter sieht Boden. Türmaß. Schwelle. Steckdose. Glas.</p>
      <p>Denselben Rollladen.</p>
      <ul className="list-disc space-y-3 pl-5">
        <li>Für dich: Licht.</li>
        <li>Für den Schirm: Blendung.</li>
        <li>Für den Arm: ein Tuch an einer Schnur.</li>
      </ul>
      <h3 className="pt-2 font-display text-2xl">Der Kern in einem Schnitt</h3>
      <p>Nicht, dass Maschinen auch Angebote haben.</p>
      <p>Sondern dass sie andere haben.</p>
      <p>Software und Hardware werden oft so verdrahtet, als gäbe es nur eine Welt, die alle teilen.</p>
      <p>Inventar. Karte. Schnittstelle.</p>
      <p>Die erste Frage ist immer: Wessen Umwelt?</p>
      <p>Uexküll an der härtesten Stelle. Nicht Stimmung. Wesen.</p>
      <p>Gibson an jeder Marke. Nicht Ding. Handlung.</p>
      <p>Lewin am Rand. Nicht Meter. Horizont.</p>
      <Recap>Drei Umwelten im selben Zimmer. Wer das verwischt, verdrahtet falsch. Auch mit guter Technik.</Recap>
    </Chapter>
  );
}

export function Method() {
  return (
    <Chapter
      id="methode"
      number="8"
      title="Das Feld ist die Methode"
      about="Kein Bild neben dem Text. Dieselbe Behauptung, diesmal gezeichnet."
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

export function AuraChapter() {
  return (
    <Chapter
      id="aura"
      number="9"
      title="Die Aura. Zwei Richtungen."
      about="Was es so noch nicht gibt. Deshalb müssen die Sätze stehen, bevor jemand verdrahtet. Sonst ändert sich die Welt nicht."
    >
      <p>Bisher beschreibt diese Arbeit, was ein Ort einem Körper gibt.</p>
      <p>Das ist nur eine Richtung. Empfang.</p>
      <p>Die andere Richtung fehlt in der Welt noch ganz.</p>
      <p>
        Ein Körper strahlt in die Nähe etwas aus. Nicht Stimmung. Information, die die Umgebung
        lesen darf.
      </p>
      <p>Wer du bist. Wie weit dein Horizont reicht. Wohin du blickst. Was du freigibst.</p>
      <p>Das ist die Informationsaura.</p>
      <p>
        Zusammen sind Empfang und Ausstrahlung eine Aura: der Nahbereich, in dem Ort und Körper über
        ein gemeinsames Regelwerk sprechen dürfen.
      </p>
      <p>Das gibt es so nicht.</p>
      <p>Es gibt Inventar in einer App. Befehle in die Cloud. Telemetrie zurück. Eine Firma in der Mitte.</p>
      <p>
        Es gibt keine Nähe, die ohne Konto sprechen darf. Keine Ausstrahlung, die der Raum lesen
        darf, ohne dich zu besitzen. Kein Regelwerk, das ein fremdes Ding lernen kann.
      </p>
      <p>Ohne diese Sätze verdrahtet jede Werkstatt ihre eigene Welt. Dann bleibt alles, wie es ist.</p>
      <h3 className="pt-2 font-display text-2xl">Neun Sätze</h3>
      <ol className="list-decimal space-y-4 pl-5">
        {PRINCIPLES.map((p) => (
          <li key={p.id}>
            <span className="font-medium">{p.title}.</span> {p.body}
          </li>
        ))}
      </ol>
      <h3 className="pt-2 font-display text-2xl">Im Studio</h3>
      <p>Du stehst in der Mitte. Der Schalter bietet: drücken. Das ist Empfang.</p>
      <p>Du strahlst aus: Mensch. Acht Meter. Blick zur Ecke. Bereit, zu gehen.</p>
      <p>Der Schalter darf das lesen. Die Bäckerei hinter dem Horizont darf es nicht.</p>
      <p>
        Wechselst du auf Roboter, ändert sich die Ausstrahlung. Maß. Boden. Strom. Derselbe Raum.
        Andere Aura.
      </p>
      <p>
        Das{" "}
        <Link to="/feld" className="underline-offset-4 hover:underline">
          Feld
        </Link>{" "}
        zeigt beides. Der äußere Kreis ist Empfang. Der gestrichelte Kreis in der Mitte ist
        Ausstrahlung.
      </p>
      <Recap>Aura ist Nähe mit Erlaubnis, in zwei Richtungen. Erst die Sätze. Dann die Drähte.</Recap>
    </Chapter>
  );
}

export function Wiring() {
  return (
    <Chapter
      id="verdrahtung"
      number="10"
      title="Was sich verdrahten lässt. Später."
      about="Keine Produktliste. Folgen der Sätze. Erst das Regelwerk. Dann die Drähte."
    >
      <p>
        Kapitel{" "}
        <a href="#aura" className="underline-offset-4 hover:underline">
          9
        </a>{" "}
        steht extra davor. Wer ohne die neun Sätze verdrahtet, baut wieder Inventar.
      </p>
      <p>Wenn das stimmt, ist eine App, die alle Geräte der Wohnung auflistet, noch kein Möglichkeitensystem.</p>
      <p>Sie kennt Inventar. Sie kennt nicht den Standpunkt.</p>
      <p>Eine Navigation kennt Asphalt. Sie kennt nicht, dass du um halb acht nur das Milchbrötchen willst.</p>
      <p>Eine Stadt, die alles erfasst, kennt Häuser. Sie kennt nicht deine Umwelt.</p>
      <h3 className="pt-2 font-display text-2xl">Wohin die Schnur gehen kann</h3>
      <p>Ein Haus, das dem Körper den Schalter gibt. Und der Maschine die Dose.</p>
      <p>Ein Laden, der dir den Bestand zeigt. Und dem Apparat die Stufe.</p>
      <p>Ein Modell, das nicht die Stadt kennt. Sondern den Horizont dessen, der fragt.</p>
      <p>Wohnen. Gehen. Einkaufen. Spielen. Pflegen. Lernen.</p>
      <p>Immer vom Körper aus. Immer mit einem Horizont, der sich ändern darf. Immer mit der Frage, wessen Körper das ist.</p>
      <p>Der Grundbaustein ist dasselbe Feld, dreimal gezeichnet.</p>
      <p>Die Verdrahtung kommt danach. Und nur, wenn die Differenz nicht verwischt wird.</p>
      <Recap>Anwendungen sind keine Extra-Ideen. Sie sind die Beobachtung, sobald man sie baut.</Recap>
    </Chapter>
  );
}
