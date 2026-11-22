"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/data/projects";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/game-dev/", label: "Game Dev" },
  { href: "/software/", label: "Software" },
  { href: "/ai/", label: "AI & Automation" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setTheme(t === "light" ? "light" : "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable */
    }
  };
  const light = theme === "light";
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
    >
      {light ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isOn = (href: string) => (path === href || path === href.slice(0, -1) ? "page" : undefined);

  return (
    <>
      <header className="nav">
        <Link href="/" className="logo" aria-label="Niveth VM, home">
          NVM<span className="accent">.</span>
        </Link>
        <nav className="nav-links mono" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hide-s" aria-current={isOn(l.href)}>
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className="hide-s">
            Contact
          </Link>
          <a href={SITE.resume} target="_blank" rel="noopener" className="hide-s">
            Résumé ↓
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </nav>
      </header>
      <div id="site-menu" className={open ? "menu open" : "menu"} aria-hidden={!open}>
        <div className="menu-head">
          <Link href="/" className="logo" tabIndex={open ? 0 : -1}>
            NVM<span className="accent">.</span>
          </Link>
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Menu">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} tabIndex={open ? 0 : -1} aria-current={isOn(l.href)}>
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            Contact
          </Link>
          <a href={SITE.resume} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
            Résumé
          </a>
        </nav>
      </div>
    </>
  );
}
