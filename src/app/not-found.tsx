import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="force-dark" style={{ minHeight: "100svh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
      <div>
        <p className="mono" style={{ color: "var(--muted)" }}>
          Page not found
        </p>
        <h1 className="disp" style={{ fontSize: "clamp(80px, 14vw, 200px)", margin: "16px 0 32px" }}>
          You made three<span className="accent">.</span>
        </h1>
        <Link href="/" className="btn btn-solid">
          Back home
        </Link>
      </div>
    </main>
  );
}
