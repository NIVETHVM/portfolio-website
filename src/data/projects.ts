// All project content lives here. Edit text, links and stats in one place.

export type Area = "games" | "software" | "ai";

export type VisualKey =
  | "ttt"
  | "plat"
  | "aces"
  | "gst"
  | "inv"
  | "drip"
  | "echo"
  | "rag";

export type Project = {
  key: VisualKey;
  area: Area;
  name: string;
  short: string;
  desc: string;
  stat: string;
  stack: string[];
  link?: { label: string; href: string };
  tag: string;
  facts: [string, string][];
};

export const AREA_LABEL: Record<Area, string> = {
  games: "Game Dev",
  software: "Software Dev",
  ai: "AI & Automation",
};

export const AREA_HREF: Record<Area, string> = {
  games: "/game-dev/",
  software: "/software/",
  ai: "/ai/",
};

export const PROJECTS: Project[] = [
  {
    key: "ttt",
    area: "games",
    name: "Reverse Tic-Tac-Toe",
    short: "Tic-Tac-Toe",
    desc: "Tic-tac-toe where three in a row loses. The AI opponent is Minimax turned inside out: it steers you into three instead of trying to win.",
    stat: "500+ Play Store downloads",
    stack: ["Unity", "C#", "Photon Fusion", "AdMob", "Figma"],
    link: {
      label: "Play Store",
      href: "https://play.google.com/store/apps/details?id=copycat.tictactoe.online&hl=en_IN",
    },
    tag: "Shipped · Rextech Studios internship",
    facts: [
      ["Result", "500+ Play Store downloads"],
      ["When", "May to June 2025"],
      ["Modes", "3 AI levels, online play"],
      ["Money", "Google AdMob"],
    ],
  },
  {
    key: "plat",
    area: "games",
    name: "2D Platformer",
    short: "Platformer",
    desc: "Player physics, collisions and game state written by hand, with level pieces that snap together.",
    stat: "Personal project · April 2025",
    stack: ["Unity", "C#"],
    link: { label: "GitHub", href: "https://github.com/NIVETHVM/platformer_unity" },
    tag: "Personal project",
    facts: [
      ["When", "April 2025"],
      ["Built with", "Unity, C#"],
    ],
  },
  {
    key: "aces",
    area: "software",
    name: "ACES CUSAT placements",
    short: "ACES",
    desc: "The placement page for the CS department site, wireframed in Figma and built so students can read it on their phones.",
    stat: "Live site · January 2026",
    stack: ["React", "Tailwind CSS", "Figma"],
    link: { label: "Visit site", href: "https://www.acescusat.tech/placements" },
    tag: "Live · ACES CUSAT",
    facts: [
      ["Role", "Design and frontend"],
      ["When", "January 2026"],
      ["Status", "Live"],
      ["Built with", "React, Tailwind"],
    ],
  },
  {
    key: "gst",
    area: "software",
    name: "GST reconciliation",
    short: "GST app",
    desc: "A desktop app that matches invoices against GSTR-2B for a CA firm, handles small mismatches and ships as one .exe.",
    stat: "Freelance · January 2025",
    stack: ["Python", "Pandas", "Tkinter"],
    tag: "Freelance · CA firm",
    facts: [
      ["When", "January 2025"],
      ["Matching", "Fuzzy, with tolerances"],
      ["Design", "Open/Closed, OOP"],
      ["Delivered as", "Standalone .exe"],
    ],
  },
  {
    key: "inv",
    area: "ai",
    name: "Invoice AI pipeline",
    short: "Invoices",
    desc: "Reads messy invoices with OCR, pulls the fields out with an LLM against a schema, checks them and posts clean rows to Google Sheets.",
    stat: "About 80% less manual entry",
    stack: ["n8n", "OCR", "LLM APIs", "Python", "Google Sheets"],
    tag: "Freelance · Finance client",
    facts: [
      ["Result", "About 80% less manual entry"],
      ["Batch", "100+ invoices"],
      ["When", "January 2026"],
      ["Built in", "n8n"],
    ],
  },
  {
    key: "drip",
    area: "ai",
    name: "DripCheck",
    short: "DripCheck",
    desc: "A smart mirror: say the word and it rates your outfit out of 10, with a style tip on the glass.",
    stat: "ESP32-CAM to a vision model, live",
    stack: ["ESP32", "C++", "FastAPI", "React", "WebSocket"],
    link: { label: "GitHub", href: "https://github.com/NIVETHVM/DripCheck" },
    tag: "Hardware + full stack",
    facts: [
      ["When", "June 2026"],
      ["Camera", "ESP32-CAM, voice trigger"],
      ["Backend", "FastAPI, vision model"],
      ["Display", "React overlay, TM1637"],
    ],
  },
  {
    key: "echo",
    area: "ai",
    name: "Echo",
    short: "Echo",
    desc: "A hearing-assist app that listens around you and flags the announcements that matter.",
    stat: "Hackathon project, expanded",
    stack: ["Flutter", "NLP", "n8n"],
    link: { label: "GitHub", href: "https://github.com/Hackstreet-hackathon/Echo" },
    tag: "Hackathon, then expanded",
    facts: [
      ["When", "November 2025"],
      ["Alerts", "n8n, by priority"],
    ],
  },
  {
    key: "rag",
    area: "ai",
    name: "Fusion RAG",
    short: "Fusion RAG",
    desc: "Answers questions using graph and vector retrieval together, then finds the parts it made up and re-iterates to cut them down.",
    stat: "Built-in hallucination check and retry loop",
    stack: ["Python", "Knowledge graph", "Vector search", "LLM"],
    tag: "Personal project",
    facts: [
      ["Retrieval", "Knowledge graph + vector"],
      ["Safety net", "Hallucination check, retry loop"],
    ],
  },
];

export const byArea = (a: Area) => PROJECTS.filter((p) => p.area === a);

export const SITE = {
  name: "Niveth VM",
  email: "nivethxvm@gmail.com",
  resume: "/Niveth-VM-Resume.pdf",
  github: "https://github.com/NIVETHVM/",
  linkedin: "https://www.linkedin.com/in/nivethvm/",
  leetcode: "https://leetcode.com/u/Niveth_VM/",
};
