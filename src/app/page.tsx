import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Tools from "@/components/Tools";
import LeetCode from "@/components/LeetCode";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <section id="about" className="about" aria-label="About">
        <div className="wrap">
          <span className="mono rv" style={{ color: "var(--muted)" }}>
            About
          </span>
          <h2 className="rv">
            I&apos;m Niveth, a CS student at CUSAT in Kochi. I work across <em>game development</em>,{" "}
            <em>software</em> and <em>AI automation</em>, and my favourite projects sit right where the three
            overlap<span className="accent">.</span>
          </h2>
        </div>
      </section>
      <SelectedWork />
      <Tools />
      <LeetCode />
      <Contact />
    </main>
  );
}
