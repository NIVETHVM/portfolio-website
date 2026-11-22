import Link from "next/link";
import type { ReactNode } from "react";
import Nav from "./Nav";
import ProjectVisual from "./ProjectVisual";
import type { Project } from "@/data/projects";

export function AreaTop({ children }: { children: ReactNode }) {
  return (
    <div className="top force-dark">
      <div className="wrap">
        <Nav />
        <section className="ahero">{children}</section>
      </div>
    </div>
  );
}

export function ProjectBlock({ p, rev, slot }: { p: Project; rev?: boolean; slot?: string }) {
  return (
    <section className="proj" aria-labelledby={`p-${p.key}`}>
      <div className={rev ? "wrap pj rev" : "wrap pj"}>
        <div className="pj-vis force-dark rv">
          <ProjectVisual k={p.key} />
          {slot && (
            <span className="mono" style={{ position: "absolute", left: 20, bottom: 16, color: "#5a5853", fontSize: 11 }}>
              {slot}
            </span>
          )}
        </div>
        <div className="rv">
          <span className="mono accent">{p.tag}</span>
          <h2 id={`p-${p.key}`} className="disp">
            {p.name}
          </h2>
          <p className="pj-desc">{p.desc}</p>
          <div className="facts">
            {p.facts.map(([k, v]) => (
              <div key={k}>
                <span className="mono">{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <div className="chips">
            {p.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          {p.link && (
            <div className="acts">
              <a href={p.link.href} target="_blank" rel="noopener" className="btn btn-solid">
                {p.link.label} ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function NextBand({ href, label }: { href: string; label: string }) {
  return (
    <div className="wrap">
      <Link href={href} className="next">
        <span className="mono" style={{ color: "var(--muted)" }}>
          Next
        </span>
        <span className="disp">{label} →</span>
      </Link>
      <div className="mini-foot mono">
        <span>© 2026 Niveth VM</span>
        <Link href="/#contact">Say hello ↗</Link>
      </div>
    </div>
  );
}
