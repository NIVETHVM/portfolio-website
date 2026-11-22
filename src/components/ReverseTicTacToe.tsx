"use client";

import { useState } from "react";

type Cell = "" | "X" | "O";
type Level = "easy" | "medium" | "hard";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const three = (b: Cell[], m: Cell) => LINES.find((l) => l.every((i) => b[i] === m));
const free = (b: Cell[]) => b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);

// Reverse rules: whoever completes three in a row loses. Score is from the AI's side (O).
function score(b: Cell[], turn: "X" | "O", depth: number): number {
  if (three(b, "X")) return 10 - depth;
  if (three(b, "O")) return depth - 10;
  const f = free(b);
  if (!f.length) return 0;
  const vals = f.map((i) => {
    const n = b.slice();
    n[i] = turn;
    return score(n, turn === "O" ? "X" : "O", depth + 1);
  });
  return turn === "O" ? Math.max(...vals) : Math.min(...vals);
}

function aiMove(b: Cell[], level: Level) {
  const f = free(b);
  const randomChance = level === "easy" ? 0.7 : level === "medium" ? 0.3 : 0;
  if (Math.random() < randomChance) return f[Math.floor(Math.random() * f.length)];
  let best = f[0];
  let bv = -Infinity;
  for (const i of f) {
    const n = b.slice();
    n[i] = "O";
    const v = score(n, "X", 1);
    if (v > bv) {
      bv = v;
      best = i;
    }
  }
  return best;
}

const START = "Your move. Avoid three in a row.";

export default function ReverseTicTacToe() {
  const [b, setB] = useState<Cell[]>(Array(9).fill(""));
  const [over, setOver] = useState(false);
  const [lose, setLose] = useState<number[]>([]);
  const [msg, setMsg] = useState(START);
  const [level, setLevel] = useState<Level>("medium");

  const end = (nb: Cell[], line: number[] | undefined, text: string) => {
    setB(nb);
    setOver(true);
    setLose(line ?? []);
    setMsg(text);
  };

  const play = (i: number) => {
    if (over || b[i]) return;
    const nb = b.slice();
    nb[i] = "X";
    let l = three(nb, "X");
    if (l) return end(nb, l, "You made three. You lose.");
    if (!free(nb).length) return end(nb, undefined, "Draw. Nobody made three.");
    nb[aiMove(nb, level)] = "O";
    l = three(nb, "O");
    if (l) return end(nb, l, "The AI made three. You win.");
    if (!free(nb).length) return end(nb, undefined, "Draw. Nobody made three.");
    setB(nb);
    setMsg(START);
  };

  const reset = (lv: Level = level) => {
    setLevel(lv);
    setB(Array(9).fill(""));
    setOver(false);
    setLose([]);
    setMsg(START);
  };

  return (
    <div className="game">
      <span className="mono accent">Reverse Tic-Tac-Toe</span>
      <div className="game-levels" role="group" aria-label="Difficulty">
        {(["easy", "medium", "hard"] as Level[]).map((lv) => (
          <button key={lv} type="button" className="lvl" aria-pressed={level === lv} onClick={() => reset(lv)}>
            {lv}
          </button>
        ))}
      </div>
      <div className="game-board" role="group" aria-label="Board">
        {b.map((v, i) => (
          <button
            key={i}
            type="button"
            className={`cell${v === "O" ? " o" : ""}${lose.includes(i) ? " lose" : ""}`}
            onClick={() => play(i)}
            disabled={over || !!v}
            aria-label={`Square ${i + 1}${v ? `, ${v}` : ", empty"}`}
          >
            {v && <b>{v}</b>}
          </button>
        ))}
      </div>
      <span className="mono game-status" aria-live="polite">
        {msg}
      </span>
      <button type="button" className="btn btn-line" onClick={() => reset()}>
        New game
      </button>
    </div>
  );
}
