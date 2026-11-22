import type { Metadata } from "next";
import { AreaTop, NextBand, ProjectBlock } from "@/components/AreaParts";
import { byArea } from "@/data/projects";

export const metadata: Metadata = {
  title: "Software Dev",
  description: "Web frontends and desktop tools by Niveth VM, from the ACES CUSAT placements page to a GST reconciliation app.",
};

const SPEC: [string, string][] = [
  ["Frontend", "React, Tailwind"],
  ["Backend", "Express, FastAPI"],
  ["Data", "PostgreSQL, MySQL"],
  ["Design", "Figma"],
];

export default function Software() {
  const [aces, gst] = byArea("software");
  return (
    <main id="main">
      <AreaTop>
        <div className="ahero-copy">
          <span className="mono" style={{ color: "var(--muted)" }}>
            React · Python · SQL
          </span>
          <h1 className="disp">
            Software
            <br />
            Dev<span className="accent">.</span>
          </h1>
          <p>Frontends I design in Figma first, and desktop tools that people without a tech background can actually use.</p>
        </div>
        <div className="spec">
          {SPEC.map(([k, v]) => (
            <div key={k}>
              <span className="mono">{k}</span>
              <b>{v}</b>
            </div>
          ))}
        </div>
      </AreaTop>
      <ProjectBlock p={aces} slot="Screenshot slot" />
      <ProjectBlock p={gst} rev slot="Sample data" />
      <NextBand href="/ai/" label="AI & Automation" />
    </main>
  );
}
