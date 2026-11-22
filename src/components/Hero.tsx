"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Portrait, { type PortraitMode } from "./Portrait";
import Nav from "./Nav";
import { SITE } from "@/data/projects";

type Key = "games" | "soft" | "ai";

const WORDS: { key: Key; cls: string; href: string; lab: string; word: ReactNode }[] = [
  { key: "games", cls: "a1", href: "/game-dev/", lab: "Unity · C# · Play Store", word: "Game Dev" },
  { key: "soft", cls: "a2", href: "/software/", lab: "React · Python · SQL", word: "Software Dev" },
  { key: "ai", cls: "a3", href: "/ai/", lab: "n8n · LLM APIs · OCR", word: <>AI &amp;<br />Automation</> },
];

export default function Hero() {
  const [hover, setHover] = useState<Key | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState({ h: 672, w: 605 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const measure = () => {
      const mobile = window.innerWidth <= 900;
      if (mobile) {
        const w = Math.min(el.clientWidth, 520);
        setBox({ w, h: w * 1.12 });
      } else {
        // Same maths as the CSS --s unit: one design pixel of a 1240 x 756 stage.
        const sc = Math.min(el.clientWidth / 1240, el.clientHeight / 756);
        setBox({ h: 650 * sc, w: 540 * sc });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mode: PortraitMode = hover ? "bin" : "xo";

  return (
    <div className="top force-dark">
      <div className="wrap">
        <Nav />
        <section ref={heroRef} className="hero" aria-label="Introduction">
          <div className="hero-stage">
          <p className="hero-name" aria-hidden="true">
            Niveth VM
          </p>
          <h1 className="sr-only">Niveth VM, software developer working across game development, software and AI automation</h1>
          <Portrait mode={mode} maxHeight={box.h} maxWidth={box.w} />
          {WORDS.map((w) => (
            <Link
              key={w.key}
              href={w.href}
              className={`area ${w.cls}${hover && hover !== w.key ? " dim" : ""}`}
              onMouseEnter={() => setHover(w.key)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(w.key)}
              onBlur={() => setHover(null)}
            >
              <span className="mono lab">{w.lab}</span>
              <span className="word">{w.word}</span>
            </Link>
          ))}
          <div className="hero-info">
            <p>
              Software developer and CS undergrad at CUSAT, Kochi. <strong>CGPA 8.87.</strong> I&apos;ve shipped a
              Play Store game and AI tools that finance firms use.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="#selected" className="btn btn-accent">
                See my work →
              </a>
              <a href={SITE.resume} target="_blank" rel="noopener" className="btn btn-line">
                Résumé ↓
              </a>
            </div>
          </div>
          </div>
        </section>
        <div className="hstrip mono">
          <span className="hs-item hs-l">
            <span className="dot-live" aria-hidden="true" />
            Open to work
          </span>
          <span className="hs-item hs-mid">Kochi, India</span>
          <a href="#about" className="hs-item hs-scroll">
            Scroll <span className="hs-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
