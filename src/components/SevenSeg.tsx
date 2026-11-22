import type { CSSProperties } from "react";

const SEG: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abged",
  "3": "abgcd",
  "4": "fgbc",
  "5": "afgcd",
  "6": "afgedc",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  " ": "",
};

function geometry(h: number) {
  const w = Math.round(h * 0.52);
  const t = Math.max(4, Math.round(h * 0.11));
  const g = Math.max(1, Math.round(t * 0.18));
  const hh = h / 2;
  const lh = w - t - 2 * g;
  const lv = hh - t / 2 - 2 * g;
  const hs = (x: number, y: number, L: number): CSSProperties => ({
    left: x,
    top: y,
    width: L,
    height: t,
    clipPath: `polygon(${t / 2}px 0,${L - t / 2}px 0,${L}px 50%,${L - t / 2}px 100%,${t / 2}px 100%,0 50%)`,
  });
  const vs = (x: number, y: number, L: number): CSSProperties => ({
    left: x,
    top: y,
    width: t,
    height: L,
    clipPath: `polygon(50% 0,100% ${t / 2}px,100% ${L - t / 2}px,50% 100%,0 ${L - t / 2}px,0 ${t / 2}px)`,
  });
  return {
    w,
    segs: {
      a: hs(t / 2 + g, 0, lh),
      b: vs(w - t, t / 2 + g, lv),
      c: vs(w - t, hh + g, lv),
      d: hs(t / 2 + g, h - t, lh),
      e: vs(0, hh + g, lv),
      f: vs(0, t / 2 + g, lv),
      g: hs(t / 2 + g, hh - t / 2, lh),
    } as Record<string, CSSProperties>,
  };
}

export default function SevenSeg({ value, digits, height, small }: { value: number; digits: number; height: number; small?: boolean }) {
  const { w, segs } = geometry(height);
  const str = String(Math.max(0, Math.round(value))).padStart(digits, " ").slice(-digits);
  return (
    <div className={small ? "seg-row sm" : "seg-row"} aria-hidden="true">
      {str.split("").map((ch, i) => (
        <span key={i} className="dg" style={{ width: w, height }}>
          {"abcdefg".split("").map((k) => (
            <span key={k} className={SEG[ch]?.includes(k) ? "sg on" : "sg"} style={segs[k]} />
          ))}
        </span>
      ))}
    </div>
  );
}
