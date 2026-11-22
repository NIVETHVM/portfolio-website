"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: 0 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    // The home intro pauses scrolling through this handle.
    const w = window as unknown as { __lenis?: Lenis };
    w.__lenis = lenis;
    if (document.documentElement.classList.contains("intro")) lenis.stop();
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      if (w.__lenis === lenis) delete w.__lenis;
      lenis.destroy();
    };
  }, []);
  return null;
}
