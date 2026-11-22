import type { Metadata } from "next";
import { AreaTop, NextBand, ProjectBlock } from "@/components/AreaParts";
import { byArea } from "@/data/projects";

export const metadata: Metadata = {
  title: "AI & Automation",
  description: "AI pipelines by Niveth VM: an invoice pipeline for a finance client, the DripCheck smart mirror, Echo and Fusion RAG.",
};

const STEPS = ["Messy input", "Read · OCR, audio, camera", "LLM", "Check", "Clean output"];

export default function AI() {
  const projects = byArea("ai");
  return (
    <main id="main">
      <AreaTop>
        <div className="ahero-copy">
          <span className="mono" style={{ color: "var(--muted)" }}>
            n8n · LLM APIs · OCR · FastAPI
          </span>
          <h1 className="disp" style={{ fontSize: "clamp(52px, 11vw, 190px)" }}>
            AI &amp;
            <br />
            Automation<span className="accent">.</span>
          </h1>
          <p>
            Pipelines that turn messy input (invoices, audio, camera frames, questions) into clean data and answers you
            can trust.
          </p>
        </div>
        <div className="v-col" style={{ fontSize: 14, justifySelf: "center", width: "20em" }} aria-hidden="true">
          {STEPS.map((s, i) => (
            <span key={s} style={{ display: "contents" }}>
              {i > 0 && <span className="v-wire" />}
              <span className={i === 2 ? "v-node hot" : "v-node"}>{s}</span>
            </span>
          ))}
        </div>
      </AreaTop>
      <div className="spine">
        {projects.map((p, i) => (
          <ProjectBlock key={p.key} p={p} rev={i % 2 === 1} slot={p.key === "drip" ? "Photo slot" : undefined} />
        ))}
      </div>
      <NextBand href="/#contact" label="Say hello" />
    </main>
  );
}
