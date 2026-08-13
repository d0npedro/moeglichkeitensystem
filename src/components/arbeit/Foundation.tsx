import { useEffect, useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { WorkTools } from "@/components/site/WorkTools";
import { GITHUB_REPO, CANONICAL_URL } from "@/lib/share";
import { publicUrl } from "@/lib/paths";
import { Glossary } from "./Glossary";
import { Literature } from "./Literature";
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

const READER_KEY = "pvm-reader";

export function Foundation() {
  const [reader, setReader] = useState(false);

  useEffect(() => {
    try {
      setReader(sessionStorage.getItem(READER_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  function toggleReader() {
    setReader((on) => {
      const next = !on;
      try {
        sessionStorage.setItem(READER_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <div className="min-h-dvh bg-bg text-fg" data-reader={reader ? "on" : undefined}>
      <SkipLinks />
      <div className="reader-chrome">
        <SiteNav current="arbeit" />
      </div>

      <main id="inhalt" className="mx-auto max-w-2xl px-5 pb-24 pt-10 md:max-w-3xl md:px-8 md:pt-16">
        <p className="text-xs font-medium tracking-widest text-subtle uppercase">
          Möglichkeitensystem
        </p>
        <h1 className="mt-4 font-display text-4xl text-fg md:text-5xl">
          Pedda steht in der Mitte seines Studios
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">
          Ehrenfeld, Köln. Lichtschalter an der Wand. Rollladen am Fenster. Beides im Blick. Zu
          beidem ein paar Schritte.
        </p>

        <div className="mt-8">
          <WorkTools reader={reader} onReader={toggleReader} />
        </div>

        <Contents />

        <figure className="reader-hide mt-12 overflow-hidden rounded-xl bg-wash shadow-soft md:mt-16">
          <img
            src={publicUrl("studio.jpg")}
            alt="Blick aus der Mitte eines Wohnstudios. Fenster mit Rollladen geradeaus. Lichtschalter an der Wand rechts. Eine Gitarre steht im Rücken."
            className="aspect-photo w-full object-cover"
            crossOrigin="anonymous"
          />
          <figcaption className="px-4 py-3 text-base text-muted">
            Raummitte. Der Rechner steht an der Westwand.
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
        <Literature />

        <footer className="mt-20 border-t border-border pt-8 text-base leading-relaxed text-muted">
          <p>Pedda vom Mond · Köln</p>
          <p className="mt-2">
            <a href={CANONICAL_URL} className="text-fg underline-offset-4 hover:underline">
              peddavommond.de/moeglichkeitensystem
            </a>
            {" · "}
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
              className="text-fg underline-offset-4 hover:underline"
            >
              GitHub
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
