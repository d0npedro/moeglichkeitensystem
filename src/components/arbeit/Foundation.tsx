import { useEffect } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { publicUrl } from "@/lib/paths";
import { Glossary } from "./Glossary";
import {
  Abstract,
  Case,
  GibsonChapter,
  HowToRead,
  Kernel,
  LewinChapter,
  Method,
  Question,
  Together,
  UexkuellChapter,
  Wiring,
} from "./Chapters";
import { Contents, SkipLinks } from "./shell";

export function Foundation() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SkipLinks />
      <SiteNav current="arbeit" />

      <main id="inhalt" className="mx-auto max-w-2xl px-5 pb-24 pt-10 md:max-w-3xl md:px-8 md:pt-16">
        <p className="text-xs font-medium tracking-widest text-subtle uppercase">
          Freiwillige Doktorarbeit
        </p>
        <h1 className="mt-4 font-display text-4xl text-fg md:text-5xl">
          Was ein Ort einem Körper gibt
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">
          Nicht, was irgendwo existiert. Was du von hier aus wirklich tun würdest. Und für wen.
        </p>

        <Contents />

        <figure className="mt-12 overflow-hidden rounded-xl bg-wash shadow-soft md:mt-16">
          <img
            src={publicUrl("studio.jpg")}
            alt="Blick aus der Mitte eines Wohnstudios. Fenster mit Rollladen geradeaus. Lichtschalter an der Wand rechts. Eine Gitarre steht im Rücken."
            className="aspect-photo w-full object-cover"
            crossOrigin="anonymous"
          />
          <figcaption className="px-4 py-3 text-base text-muted">
            Standpunkt: Raummitte. Der Rechner ist da. Er ist nicht das Zentrum.
          </figcaption>
        </figure>

        <Abstract />
        <HowToRead />
        <Case />
        <Question />
        <GibsonChapter />
        <UexkuellChapter />
        <LewinChapter />
        <Together />
        <Kernel />
        <Method />
        <Wiring />
        <Glossary />

        <footer className="mt-20 border-t border-border pt-8 text-base leading-relaxed text-muted">
          <p>Pedda vom Mond · Köln</p>
          <p className="mt-2">
            Grundbaustein:{" "}
            <a
              href="https://peddavommond.de/moeglichkeitensystem"
              className="text-fg underline-offset-4 hover:underline"
            >
              peddavommond.de/moeglichkeitensystem
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
