import type { Metadata, Viewport } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Reveal from "@/components/Reveal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Niveth VM | Game dev, software and AI",
    template: "%s | Niveth VM",
  },
  description:
    "Niveth VM, a CS student at CUSAT in Kochi, works across game development, software and AI automation. Open to jobs, internships and freelance work.",
  openGraph: {
    type: "website",
    title: "Niveth VM | Game dev, software and AI",
    description:
      "Games on the Play Store, AI pipelines for finance clients, and a mirror that rates your outfit.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Niveth VM" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0C",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: applies the saved theme and marks that JS is available.
// On a full load or refresh of the home page it also starts the intro state (with a safety
// timeout in case scripts fail). Moving between pages inside the site does not replay it.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t);}catch(e){}window.__intro=false;if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){window.__intro=true;d.classList.add('intro');setTimeout(function(){d.classList.remove('intro')},12000);}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <SmoothScroll />
        <Reveal />
        {children}
      </body>
    </html>
  );
}
