"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import Portrait, { type PortraitControl, type PortraitMode } from "./Portrait";
import Nav from "./Nav";
import { SITE } from "@/data/projects";

type Key = "games" | "soft" | "ai";

const WORDS: { key: Key; cls: string; href: string; lab: string; word: ReactNode }[] = [
  { key: "games", cls: "a1", href: "/game-dev/", lab: "Unity · C# · Play Store", word: "Game Dev" },
  { key: "soft", cls: "a2", href: "/software/", lab: "React · Python · SQL", word: "Software Dev" },
  {
    key: "ai",
    cls: "a3",
    href: "/ai/",
    lab: "n8n · LLM APIs · OCR",
    word: (
      <>
        AI &amp;
        <br />
        Automation
      </>
    ),
  },
];

// Intro timing, in seconds (portraitMs in milliseconds). About 6.6s in total.
const T = { hold: 0.8, expand: 2.5, portraitAt: 3.5, portraitMs: 3000, textAt: 6 };

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export default function Hero() {
  const [hover, setHover] = useState<Key | null>(null);
  const [intro, setIntro] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const portrait = useRef<PortraitControl | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const doneRef = useRef<() => void>(() => {});
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

  // The intro plays every time the home page opens.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const top = topRef.current;
    const name = nameRef.current;
    const end = () => {
      html.classList.remove("intro");
      lenis()?.start();
      setIntro(false);
    };
    // Only a full load or refresh of the home page sets this flag (see layout.tsx),
    // so coming back from another page shows the finished hero straight away.
    const w = window as unknown as { __intro?: boolean };
    const play = w.__intro === true;
    w.__intro = false;
    if (!play || !top || !name || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Portrait shows itself straight away when motion is reduced.
      requestAnimationFrame(() => portrait.current?.finish());
      end();
      return;
    }
    html.classList.add("intro");
    window.scrollTo(0, 0);
    lenis()?.stop();

    const grow = Array.from(name.querySelectorAll<HTMLElement>(".n-grow"));
    const dot = name.querySelector<HTMLElement>(".n-dot");
    const fades = Array.from(top.querySelectorAll<HTMLElement>(".intro-fade"));
    // Natural width of the letters that open up between N, V and M, measured when the
    // expansion starts so the real font is in place.
    const natural = (g: HTMLElement) => {
      const prev = g.style.width;
      g.style.width = "auto";
      const w = g.getBoundingClientRect().width;
      g.style.width = prev;
      return w;
    };

    let finished = false;
    const complete = () => {
      if (finished) return;
      finished = true;
      gsap.set([...grow, name, ...fades], { clearProps: "all" });
      if (dot) gsap.set(dot, { clearProps: "all" });
      end();
    };
    doneRef.current = complete;
    const tl = gsap.timeline({ onComplete: complete });
    tl.set(fades, { autoAlpha: 0, y: 18 })
      .to(grow, { width: (_: number, el: HTMLElement) => natural(el), duration: T.expand, ease: "power3.inOut" }, T.hold)
      .fromTo(
        name,
        { color: "#ECEAE4", textShadow: "0 0 0px rgba(255, 42, 31, 0)" },
        { color: "#FF2A1F", textShadow: "0 0 60px rgba(255, 42, 31, 0.35)", duration: T.expand, ease: "power1.inOut" },
        T.hold + 0.1
      )
      .call(() => portrait.current?.assemble(T.portraitMs), [], T.portraitAt)
      .to(fades, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" }, T.textAt);
    if (dot) tl.to(dot, { autoAlpha: 0, width: 0, duration: 0.35, ease: "power2.in" }, T.hold);
    tlRef.current = tl;
    // Hold the start until the fonts are ready (at most 0.6s), so the letters measure correctly.
    tl.pause();
    let started = false;
    const go = () => {
      if (!started) {
        started = true;
        tl.play();
      }
    };
    const wait = window.setTimeout(go, 600);
    document.fonts?.ready.then(go);

    return () => {
      window.clearTimeout(wait);
      tl.kill();
      tlRef.current = null;
      html.classList.remove("intro");
      lenis()?.start();
    };
  }, []);

  const skip = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tl.progress(1);
    tl.kill();
    portrait.current?.finish();
    doneRef.current();
  };

  useEffect(() => {
    if (!intro) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro]);

  const mode: PortraitMode = hover ? "bin" : "xo";

  return (
    <div ref={topRef} className="top force-dark">
      <div className="wrap">
        <div className="intro-fade">
          <Nav />
        </div>
        <section ref={heroRef} className="hero" aria-label="Introduction">
          <div className="hero-stage">
            <p ref={nameRef} className="hero-name" aria-hidden="true">
              N<span className="n-grow">IVETH</span>
              <span className="n-grow">&nbsp;</span>VM<span className="n-dot">.</span>
            </p>
            <h1 className="sr-only">Niveth VM, software developer working across game development, software and AI automation</h1>
            <Portrait mode={mode} maxHeight={box.h} maxWidth={box.w} waitForIntro control={portrait} />
            {WORDS.map((w) => (
              <Link
                key={w.key}
                href={w.href}
                className={`area ${w.cls} intro-fade${hover && hover !== w.key ? " dim" : ""}`}
                onMouseEnter={() => setHover(w.key)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(w.key)}
                onBlur={() => setHover(null)}
              >
                <span className="mono lab">{w.lab}</span>
                <span className="word">{w.word}</span>
              </Link>
            ))}
            <div className="hero-info intro-fade">
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
        <div className="hstrip mono intro-fade">
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
      {intro && (
        <button type="button" className="skip-intro mono" onClick={skip}>
          Skip intro →
        </button>
      )}
    </div>
  );
}
