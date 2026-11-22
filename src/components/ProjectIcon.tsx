import type { ReactNode } from "react";
import type { VisualKey } from "@/data/projects";

const PATHS: Record<VisualKey, ReactNode> = {
  ttt: (
    <>
      <path d="M9 4v16M15 4v16M4 9h16M4 15h16" />
      <path d="M5.5 5.5l2 2M7.5 5.5l-2 2" />
      <circle cx="18" cy="18" r="1.3" />
    </>
  ),
  plat: (
    <>
      <path d="M3 20h18M5 15h5M14 11h5" />
      <rect x="6" y="10" width="3" height="4" />
      <circle cx="16.5" cy="7.5" r="1" />
    </>
  ),
  aces: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 8h18M7 12h10M7 15h6" />
    </>
  ),
  gst: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4M9 13l2 2 4-4" />
    </>
  ),
  inv: (
    <>
      <path d="M4 4h8v10H4z" />
      <path d="M7 8h2M7 11h2M14 9h3l3 3-3 3h-3" />
      <path d="M4 18h16" />
    </>
  ),
  drip: (
    <>
      <path d="M6 21V10a6 6 0 0 1 12 0v11z" />
      <path d="M15 6.5l.6 1.2 1.2.6-1.2.6-.6 1.2-.6-1.2-1.2-.6 1.2-.6z" />
    </>
  ),
  echo: (
    <>
      <path d="M8 15a5 5 0 1 1 8-4c0 2-2 3-2 5a3 3 0 0 1-5 2" />
      <path d="M11 11a1.5 1.5 0 1 1 2 1.4" />
      <path d="M19.5 5.5a8 8 0 0 1 0 9" />
    </>
  ),
  rag: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M6.7 7.1l.6 3M7 5.6l3-1" />
      <path d="M14 11h7M14 14.5h7M14 18h7" />
      <path d="M8 14v3a2 2 0 0 0 2 2h1.5" />
    </>
  ),
};

export default function ProjectIcon({ k, size = 34 }: { k: VisualKey; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[k]}
    </svg>
  );
}
