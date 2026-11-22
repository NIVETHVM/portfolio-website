import type { VisualKey } from "@/data/projects";

const BOARD = ["X", "O", "", "", "O", "X", "X", "", ""];

// Drawn stand-ins for each project. Sized in em, so the parent's font-size scales them.
export default function ProjectVisual({ k }: { k: VisualKey }) {
  switch (k) {
    case "ttt":
      return (
        <div className="v-board" aria-hidden="true">
          {BOARD.map((c, i) => (
            <span key={i} className={i === 4 ? "r" : undefined}>
              <b>{c}</b>
            </span>
          ))}
        </div>
      );
    case "plat":
      return (
        <div className="v-scene" aria-hidden="true">
          <i style={{ left: 0, right: 0, bottom: 0, height: "16%", borderRadius: 0 }} />
          <i style={{ left: "12%", bottom: "34%", width: "22%", height: "6%" }} />
          <i style={{ left: "46%", bottom: "52%", width: "20%", height: "6%" }} />
          <i style={{ left: "74%", bottom: "70%", width: "18%", height: "6%" }} />
          <b style={{ left: "18%", bottom: "40%" }} />
          <u style={{ left: "54%", bottom: "62%" }} />
          <u style={{ left: "81%", bottom: "80%" }} />
        </div>
      );
    case "aces":
      return (
        <div className="v-win" aria-hidden="true">
          <div className="v-bar">
            <i />
            <i />
            <i />
            <em>acescusat.tech/placements</em>
          </div>
          <div className="v-row h">
            <span>Company</span>
            <span>Role</span>
            <span>Offers</span>
          </div>
          <div className="v-row">
            <span>[Company A]</span>
            <span>SDE</span>
            <span>[n]</span>
          </div>
          <div className="v-row">
            <span>[Company B]</span>
            <span>Analyst</span>
            <span>[n]</span>
          </div>
          <div className="v-row">
            <span>[Company C]</span>
            <span>Intern</span>
            <span>[n]</span>
          </div>
        </div>
      );
    case "gst":
      return (
        <div className="v-win" aria-hidden="true">
          <div className="v-bar">
            <i />
            <i />
            <i />
            <em>GST Reconcile.exe</em>
          </div>
          <div className="v-row h">
            <span>Invoice</span>
            <span>Books</span>
            <span>Status</span>
          </div>
          <div className="v-row">
            <span>INV-0412</span>
            <span>₹18,400</span>
            <span className="ok">Matched</span>
          </div>
          <div className="v-row">
            <span>INV-0419</span>
            <span>₹7,250</span>
            <span className="ok">Within tol.</span>
          </div>
          <div className="v-row">
            <span>INV-0433</span>
            <span>₹12,900</span>
            <span className="bad">Missing</span>
          </div>
        </div>
      );
    case "inv":
      return (
        <div className="v-col" aria-hidden="true">
          <span className="v-node">Invoice PDF</span>
          <span className="v-wire" />
          <span className="v-node">OCR</span>
          <span className="v-wire" />
          <span className="v-node hot">LLM extraction</span>
          <span className="v-wire" />
          <span className="v-node">Validation</span>
          <span className="v-wire" />
          <span className="v-node">Google Sheets</span>
        </div>
      );
    case "drip":
      return (
        <div className="v-mirror" aria-hidden="true">
          <span>8/10</span>
        </div>
      );
    case "echo":
      return (
        <div className="v-phone" aria-hidden="true">
          <div className="v-al hot">
            <em>High priority</em>Platform change: the train now leaves from platform 4.
          </div>
          <div className="v-al">
            <em>Info</em>Someone said your name nearby.
          </div>
          <div className="v-al">
            <em>Ambient</em>Traffic noise at a normal level.
          </div>
        </div>
      );
    case "rag":
      return (
        <div className="v-col" aria-hidden="true">
          <div className="v-two">
            <span className="v-node">Graph</span>
            <span className="v-node">Vector</span>
          </div>
          <span className="v-wire" />
          <span className="v-node hot">Fuse + answer</span>
          <span className="v-wire" />
          <span className="v-node">Hallucination check</span>
          <span className="v-loop">↺ re-iterate</span>
        </div>
      );
  }
}
