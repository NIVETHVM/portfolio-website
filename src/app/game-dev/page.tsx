import type { Metadata } from "next";
import { AreaTop, NextBand, ProjectBlock } from "@/components/AreaParts";
import ReverseTicTacToe from "@/components/ReverseTicTacToe";
import { byArea } from "@/data/projects";

export const metadata: Metadata = {
  title: "Game Dev",
  description: "Games Niveth VM built in Unity and C#, including Reverse Tic-Tac-Toe with 500+ Play Store downloads.",
};

export default function GameDev() {
  const [ttt, plat] = byArea("games");
  return (
    <main id="main">
      <AreaTop>
        <div className="ahero-copy">
          <span className="mono" style={{ color: "var(--muted)" }}>
            Unity · C# · Photon
          </span>
          <h1 className="disp">
            Game
            <br />
            Dev<span className="accent">.</span>
          </h1>
          <p>I build games in Unity and ship them. Try one: a tic-tac-toe where making three in a row means you lose.</p>
        </div>
        <ReverseTicTacToe />
      </AreaTop>
      <ProjectBlock p={ttt} slot="Screenshot slot" />
      <ProjectBlock p={plat} rev />
      <section className="band" aria-labelledby="teach">
        <div className="wrap band-in rv">
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 620 }}>
            <span className="mono accent">Teaching · Vibhava · February 2026</span>
            <h2 id="teach" className="disp" style={{ margin: 0, fontSize: "clamp(44px, 4.6vw, 72px)" }}>
              Unity basics for beginners
            </h2>
            <p className="pj-desc" style={{ margin: 0 }}>
              An online workshop that got first-timers building their own scenes.
            </p>
          </div>
          <div className="disp" style={{ fontSize: "clamp(110px, 12vw, 200px)" }}>
            50+
            <span className="mono" style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
              students
            </span>
          </div>
        </div>
      </section>
      <NextBand href="/software/" label="Software Dev" />
    </main>
  );
}
