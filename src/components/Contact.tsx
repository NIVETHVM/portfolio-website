"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/data/projects";

const CHIPS = [
  { label: "A job or internship", subject: "Job opportunity for Niveth" },
  { label: "A freelance project", subject: "Freelance project" },
  { label: "Just saying hi", subject: "Hi Niveth" },
];

function kochiNow() {
  const d = new Date();
  const time = d.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", hourCycle: "h23" }).format(d)
  );
  const line =
    hour < 7
      ? "Your message will be waiting when I wake up."
      : hour < 23
        ? "I'm probably around, so write whenever."
        : "I'll see it first thing tomorrow.";
  return { time, line };
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState<{ time: string; line: string } | null>(null);
  const timer = useRef<number>(0);

  useEffect(() => {
    setClock(kochiNow());
    const id = window.setInterval(() => setClock(kochiNow()), 30000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch {
      /* clipboard can be blocked; the link still works */
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="contact force-dark" aria-labelledby="ct-title">
      <div className="wrap">
        <div className="ct-status rv">
          <span className="dot-live" aria-hidden="true" />
          Open to jobs, internships and freelance work · Kochi or remote
        </div>
        <h2 id="ct-title" className="ct-h rv">
          Say hello.
          <br />
          <span>My inbox is always open.</span>
        </h2>
        <p className="ct-p rv">Roles, internships, freelance work or just a hello: I&apos;d love to hear from you.</p>
        <div className="ct-chips rv">
          <span className="mono ct-q">What&apos;s on your mind?</span>
          {CHIPS.map((c) => (
            <a key={c.label} className="chip-link" href={`mailto:${SITE.email}?subject=${encodeURIComponent(c.subject)}`}>
              {c.label}
            </a>
          ))}
        </div>
        <div className="ct-mail">
          <a className="ct-big" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          <button type="button" className="btn btn-line" onClick={copy} aria-live="polite">
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <p className="ct-clock">
          {clock ? (
            <>
              It&apos;s <strong>{clock.time}</strong> in Kochi. {clock.line}
            </>
          ) : (
            "Based in Kochi, India."
          )}
        </p>
        <footer className="foot-cols">
          <div className="foot-col">
            <span className="mono">Pages</span>
            <Link href="/game-dev/">Game Dev</Link>
            <Link href="/software/">Software Dev</Link>
            <Link href="/ai/">AI &amp; Automation</Link>
            <a href="#leetcode">LeetCode</a>
          </div>
          <div className="foot-col">
            <span className="mono">Elsewhere</span>
            <a href={SITE.github} target="_blank" rel="noopener">
              GitHub ↗
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
            <a href={SITE.leetcode} target="_blank" rel="noopener">
              LeetCode ↗
            </a>
            <a href={SITE.resume} target="_blank" rel="noopener">
              Résumé (PDF) ↓
            </a>
          </div>
          <div className="foot-col">
            <span className="mono">Based in</span>
            <span>Kochi, Kerala, India</span>
            <span>IST, UTC+5:30</span>
            <span>Happy to work remote</span>
          </div>
        </footer>
        <div className="foot-base mono">
          <span>© 2026 Niveth VM</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
