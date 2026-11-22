"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS, AREA_LABEL, type VisualKey } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import ProjectIcon from "./ProjectIcon";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SIZE = 600;
const C = SIZE / 2;
const TILE_R = 232;
const DOT_R = 268;
const DOTS = Array.from({ length: 100 }, (_, i) => {
  const a = (i / 100) * Math.PI * 2;
  return { left: C + DOT_R * Math.cos(a) - 1.25, top: C + DOT_R * Math.sin(a) - 1.25 };
});

const angleOf = (i: number) => ((-90 + i * (360 / PROJECTS.length)) * Math.PI) / 180;

// Group labels sit outside the ring, at the middle of each group's tiles.
const GROUPS = (["games", "software", "ai"] as const).map((area) => {
  const idx = PROJECTS.map((p, i) => (p.area === area ? i : -1)).filter((i) => i >= 0);
  const mid = (angleOf(idx[0]) + angleOf(idx[idx.length - 1])) / 2;
  const label = area === "games" ? "Game Dev" : area === "software" ? "Software" : "AI";
  return { label, left: C + 300 * Math.cos(mid), top: C + 300 * Math.sin(mid) };
});

export default function SelectedWork() {
  const [sel, setSel] = useState<VisualKey>(PROJECTS[0].key);
  const p = PROJECTS.find((x) => x.key === sel) ?? PROJECTS[0];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1181px) and (prefers-reduced-motion: no-preference)", () => {
        const stage = root.current?.querySelector<HTMLElement>(".sw-stage");
        const wheel = root.current?.querySelector<HTMLElement>(".wheel");
        const card = root.current?.querySelector<HTMLElement>(".sw-card");
        if (!stage || !wheel || !card) return;
        // How far the wheel must move left to sit in the centre of the stage.
        const offset = () => {
          const s = stage.getBoundingClientRect();
          const w = wheel.getBoundingClientRect();
          return s.left + s.width / 2 - (w.left + w.width / 2);
        };
        gsap.set(wheel, { transformPerspective: 1400, rotationY: -24, rotationX: 6, x: 0 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=90%",
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          wheel,
          { x: () => offset(), rotationY: 0, rotationX: 0 },
          { x: 0, rotationY: -24, rotationX: 6, ease: "power2.inOut", duration: 1 }
        ).fromTo(card, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.6 }, 0.45);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const tile = (k: VisualKey, short: string, name: string, style?: CSSProperties) => (
    <button
      key={k}
      type="button"
      className={sel === k ? "tile on" : "tile"}
      style={style}
      aria-pressed={sel === k}
      aria-label={name}
      onMouseEnter={() => setSel(k)}
      onFocus={() => setSel(k)}
      onClick={() => setSel(k)}
    >
      <ProjectIcon k={k} />
      <span>{short}</span>
    </button>
  );

  return (
    <section id="selected" ref={root} className="sw" aria-labelledby="sw-title">
      <div className="wrap sw-stage">
        <div className="sw-left">
          <h2 id="sw-title" className="disp sec-title">
            Selected work
          </h2>
          <div className="sw-strip" role="group" aria-label="Projects">
            {PROJECTS.map((x) => tile(x.key, x.short, x.name))}
          </div>
          <div className="sw-card" aria-live="polite">
            <div key={`v-${p.key}`} className="sw-vis swap-in">
              <ProjectVisual k={p.key} />
            </div>
            <div key={`t-${p.key}`} className="sw-text swap-in">
              <span className="mono sw-area">{AREA_LABEL[p.area]}</span>
              <h3 className="disp sw-name" style={{ margin: 0 }}>
                {p.name}
              </h3>
              <p className="sw-desc">{p.desc}</p>
              <span className="sw-stat">{p.stat}</span>
              <span className="sw-stack">{p.stack.join(" · ")}</span>
              {p.link && (
                <a href={p.link.href} target="_blank" rel="noopener" className="btn btn-line">
                  {p.link.label} ↗
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="wheel-wrap">
          <div className="wheel" role="group" aria-label="Projects wheel">
            <div className="wheel-ring" />
            <div className="wheel-dots" aria-hidden="true">
              {DOTS.map((d, i) => (
                <i key={i} style={{ left: d.left, top: d.top }} />
              ))}
            </div>
            {GROUPS.map((g) => (
              <span key={g.label} className="mono wheel-group" style={{ left: g.left, top: g.top }} aria-hidden="true">
                {g.label}
              </span>
            ))}
            {PROJECTS.map((x, i) => {
              const a = angleOf(i);
              return tile(x.key, x.short, x.name, {
                left: C + TILE_R * Math.cos(a) - 50,
                top: C + TILE_R * Math.sin(a) - 50,
              });
            })}
            <span className="mono wheel-hub" aria-hidden="true">
              {AREA_LABEL[p.area]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
