"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SevenSeg from "./SevenSeg";
import { SITE } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = { total: 140, attempting: 7 };
const ROWS = [
  { label: "Easy", of: 977, value: 100, color: "var(--green)" },
  { label: "Medium", of: 2150, value: 35, color: "var(--yellow)" },
  { label: "Hard", of: 992, value: 5, color: "var(--accent)" },
];

export default function LeetCode() {
  const panel = useRef<HTMLDivElement>(null);
  // Starts at 1 so the numbers are correct before JS runs.
  const [p, setP] = useState(1);
  const maxP = useRef(0);

  useGSAP(() => {
    if (!panel.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setP(0);
    const st = ScrollTrigger.create({
      trigger: panel.current,
      start: "top bottom",
      end: "center center",
      onUpdate: (self) => {
        // Only ever counts up: scrolling back does not undo it.
        if (self.progress > maxP.current) {
          maxP.current = self.progress;
          setP(self.progress);
        }
      },
      onLeave: () => {
        maxP.current = 1;
        setP(1);
      },
    });
    if (st.progress > 0) {
      maxP.current = st.progress;
      setP(st.progress);
    }
  }, []);

  const e = 1 - Math.pow(1 - p, 3);
  const n = (v: number) => Math.round(v * e);

  return (
    <section id="leetcode" className="lc force-dark" aria-labelledby="lc-title">
      <div className="wrap">
        <div className="lc-head rv">
          <div>
            <span className="mono" style={{ color: "var(--muted)" }}>
              Problem solving
            </span>
            <h2 id="lc-title" className="disp">
              LeetCode
            </h2>
          </div>
          <a href={SITE.leetcode} target="_blank" rel="noopener" className="mono ulink">
            leetcode.com/u/Niveth_VM ↗
          </a>
        </div>
        <div ref={panel} className="lc-panel">
          <div className="lc-main">
            <div className="lc-big">
              <SevenSeg value={n(STATS.total)} digits={3} height={210} />
            </div>
            <p className="sr-only">
              {STATS.total} problems solved: {ROWS.map((r) => `${r.value} ${r.label}`).join(", ")}.
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <span className="mono">Problems solved</span>
              <span className="mono" style={{ color: "var(--muted)" }}>
                {STATS.attempting} attempting
              </span>
            </div>
          </div>
          <div>
            {ROWS.map((r) => (
              <div key={r.label} className="lc-row">
                <div className="lc-label">
                  <span className="mono">
                    <span className="lc-dot" style={{ background: r.color }} aria-hidden="true" />
                    {r.label}
                  </span>
                  <span className="mono" style={{ color: "var(--muted)", fontSize: 11 }}>
                    of {r.of}
                  </span>
                </div>
                <SevenSeg value={n(r.value)} digits={3} height={64} small />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
