"use client";

import { useEffect, useRef } from "react";
import { PORTRAIT, PORTRAIT_COLS, PORTRAIT_ROWS } from "@/data/portrait";

export type PortraitMode = "xo" | "bin";

type Props = {
  mode: PortraitMode;
  /** Max height in CSS px the portrait may take. */
  maxHeight: number;
  /** Max width in CSS px the portrait may take. */
  maxWidth: number;
};

// Five brightness levels, dark to light.
const LEVEL_COLORS = ["#57554f", "#8c8a84", "#b8b6af", "#e2e0d9", "#ffffff"];
const GLYPHS = ["·", "x", "o", "X", "O", ".", "0", "1"];
const BASE_CW = 4.8; // cell width at scale 1 (8px mono, 0.6em advance)
const BASE_CH = 8; // cell height at scale 1
const SILHOUETTE = "#0d0d0c";

type Particles = {
  n: number;
  hx: Float32Array;
  hy: Float32Array;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  level: Uint8Array;
  gXO: Uint8Array;
  gBin: Uint8Array;
  shown: Uint8Array; // 0 = xo, 1 = bin
  switchAt: Float64Array;
  col: Uint16Array;
  row: Uint16Array;
};

function buildParticles(): Particles {
  const cells: [number, number, number][] = [];
  for (let r = 0; r < PORTRAIT_ROWS; r++) {
    const line = PORTRAIT[r] ?? "";
    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch !== " ") cells.push([c, r, Number(ch)]);
    }
  }
  const n = cells.length;
  const p: Particles = {
    n,
    hx: new Float32Array(n),
    hy: new Float32Array(n),
    x: new Float32Array(n),
    y: new Float32Array(n),
    vx: new Float32Array(n),
    vy: new Float32Array(n),
    level: new Uint8Array(n),
    gXO: new Uint8Array(n),
    gBin: new Uint8Array(n),
    shown: new Uint8Array(n),
    switchAt: new Float64Array(n),
    col: new Uint16Array(n),
    row: new Uint16Array(n),
  };
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  cells.forEach(([c, r, l], i) => {
    p.col[i] = c;
    p.row[i] = r;
    p.level[i] = l;
    const odd = (r + c) % 2 === 1;
    p.gXO[i] = l === 0 ? 0 : l >= 3 ? (odd ? 3 : 4) : odd ? 1 : 2;
    p.gBin[i] = l === 0 ? 5 : rand() < 0.5 ? 6 : 7;
  });
  return p;
}

export default function Portrait({ mode, maxHeight, maxWidth }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ setMode: (m: PortraitMode) => void; resize: () => void } | null>(null);
  const sizeRef = useRef({ maxHeight, maxWidth });
  sizeRef.current = { maxHeight, maxWidth };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const P = buildParticles();
    let scale = 1;
    let cw = BASE_CW;
    let ch = BASE_CH;
    let dpr = 1;
    let atlas: HTMLCanvasElement[][] = [];
    let silhouette: HTMLCanvasElement | null = null;
    let target: PortraitMode = "xo";
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let visible = true;
    let alive = true;

    const buildAtlas = () => {
      const fontPx = 8 * scale;
      atlas = GLYPHS.map((g) =>
        LEVEL_COLORS.map((color) => {
          const c = document.createElement("canvas");
          c.width = Math.ceil(cw * dpr);
          c.height = Math.ceil(ch * dpr);
          const x = c.getContext("2d");
          if (x) {
            x.scale(dpr, dpr);
            x.font = `500 ${fontPx}px "JetBrains Mono", ui-monospace, monospace`;
            x.textBaseline = "top";
            x.fillStyle = color;
            x.fillText(g, 0, (ch - fontPx) / 2);
          }
          return c;
        })
      );
      // Solid shape behind the characters, so the name stays behind the face.
      const s = document.createElement("canvas");
      s.width = canvas.width;
      s.height = canvas.height;
      const sx = s.getContext("2d");
      if (sx) {
        sx.scale(dpr, dpr);
        sx.fillStyle = SILHOUETTE;
        for (let i = 0; i < P.n; i++) {
          sx.fillRect(P.col[i] * cw - 1, P.row[i] * ch - 1, cw + 2, ch + 2);
        }
      }
      silhouette = s;
    };

    const resize = () => {
      const { maxHeight: mh, maxWidth: mw } = sizeRef.current;
      scale = Math.min(mh / (PORTRAIT_ROWS * BASE_CH), mw / (PORTRAIT_COLS * BASE_CW), 1.3);
      scale = Math.max(scale, 0.35);
      cw = BASE_CW * scale;
      ch = BASE_CH * scale;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = PORTRAIT_COLS * cw;
      const h = PORTRAIT_ROWS * ch;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      for (let i = 0; i < P.n; i++) {
        P.hx[i] = P.col[i] * cw;
        P.hy[i] = P.row[i] * ch;
        P.x[i] = P.hx[i];
        P.y[i] = P.hy[i];
        P.vx[i] = 0;
        P.vy[i] = 0;
      }
      buildAtlas();
      draw();
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (silhouette) ctx.drawImage(silhouette, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let i = 0; i < P.n; i++) {
        const g = P.shown[i] ? P.gBin[i] : P.gXO[i];
        const img = atlas[g]?.[P.level[i]];
        if (img) ctx.drawImage(img, P.x[i], P.y[i], cw, ch);
      }
    };

    const step = (now: number) => {
      raf = 0;
      if (!alive) return;
      const R = 64 * scale;
      const R2 = R * R;
      let moving = false;
      const tgt = target === "bin" ? 1 : 0;
      for (let i = 0; i < P.n; i++) {
        if (P.shown[i] !== tgt && now >= P.switchAt[i]) {
          P.shown[i] = tgt;
          if (!reduce) {
            P.vy[i] -= (Math.random() * 1.4 + 0.4) * scale;
          }
        }
        if (P.shown[i] !== tgt) moving = true;
        let vx = P.vx[i] + (P.hx[i] - P.x[i]) * 0.07;
        let vy = P.vy[i] + (P.hy[i] - P.y[i]) * 0.07;
        if (pointer && !reduce) {
          const dx = P.x[i] - pointer.x;
          const dy = P.y[i] - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 5.5 * scale;
            vx += (dx / d) * f;
            vy += (dy / d) * f;
          }
        }
        vx *= 0.8;
        vy *= 0.8;
        P.vx[i] = vx;
        P.vy[i] = vy;
        P.x[i] += vx;
        P.y[i] += vy;
        if (!moving && (Math.abs(vx) > 0.02 || Math.abs(vy) > 0.02 || Math.abs(P.hx[i] - P.x[i]) > 0.05 || Math.abs(P.hy[i] - P.y[i]) > 0.05)) {
          moving = true;
        }
      }
      draw();
      if ((moving || pointer) && visible) raf = requestAnimationFrame(step);
    };

    const kick = () => {
      if (!raf && visible && alive) raf = requestAnimationFrame(step);
    };

    const setMode = (m: PortraitMode) => {
      if (m === target) return;
      target = m;
      const now = performance.now();
      for (let i = 0; i < P.n; i++) {
        P.switchAt[i] = reduce ? now : now + Math.random() * 520;
      }
      kick();
    };
    api.current = { setMode, resize };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointercancel", onLeave);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);

    let fontTimer = 0;
    const fontsReady = document.fonts?.load
      ? document.fonts.load(`500 10px "JetBrains Mono"`).catch(() => undefined)
      : Promise.resolve(undefined);
    fontTimer = window.setTimeout(resize, 1200);
    fontsReady.then(() => {
      window.clearTimeout(fontTimer);
      if (alive) resize();
    });
    resize();

    return () => {
      alive = false;
      api.current = null;
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(fontTimer);
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  useEffect(() => {
    api.current?.setMode(mode);
  }, [mode]);

  useEffect(() => {
    // Re-measure when the size limits change.
    api.current?.resize();
  }, [maxHeight, maxWidth]);

  return (
    <div ref={wrapRef} className="portrait" role="img" aria-label="Portrait of Niveth drawn in X and O characters">
      <canvas ref={canvasRef} />
    </div>
  );
}
