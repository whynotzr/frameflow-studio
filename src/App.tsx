import { useState } from "react";
import { useDesignStore } from "./store/useDesignStore";
import { getContrastRatio, getWcagGrade } from "./utils/contrast";
import {
  exportToCssVariables,
  exportToFigmaTokensJson,
  exportToTailwindConfig
} from "./utils/exporters";

type ExportFormat = "css" | "tailwind" | "figma";

export default function App() {
  const { tokens, updateToken } = useDesignStore();
  const [format, setFormat] = useState<ExportFormat>("css");

  const bgToken = tokens.find((t) => t.name === "background")?.value ?? "#090B10";

  const exportedCode =
    format === "css"
      ? exportToCssVariables(tokens)
      : format === "tailwind"
        ? exportToTailwindConfig(tokens)
        : exportToFigmaTokensJson(tokens);

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>🎨 FRAMEFLOW<span>STUDIO</span></h1>
          <p style={{ color: "#94a3b8", marginTop: "0.3rem" }}>
            Design Tokens Engine • Contraste WCAG 2.1 • Export CSS / Tailwind / Figma
          </p>
        </div>
        <div className="tabs">
          {(["css", "tailwind", "figma"] as ExportFormat[]).map((f) => (
            <button
              key={f}
              className={format === f ? "active" : ""}
              onClick={() => setFormat(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section className="grid">
        {tokens.map((token) => {
          const ratio = getContrastRatio(token.value, bgToken);
          const grade = getWcagGrade(ratio);
          return (
            <div key={token.id} className="card">
              <div className="swatch-bar" style={{ background: token.value }} />
              <div className="row">
                <strong>--{token.name}</strong>
                <input
                  type="color"
                  value={token.value}
                  onChange={(e) => updateToken(token.id, e.target.value)}
                />
              </div>
              <div className="row" style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                <code>{token.value}</code>
                <span className={`badge ${grade}`}>
                  {ratio}:1 ({grade})
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="card">
        <div className="row">
          <strong>Export ({format.toUpperCase()})</strong>
          <button onClick={() => navigator.clipboard.writeText(exportedCode)}>
            Copier le code
          </button>
        </div>
        <pre>{exportedCode}</pre>
      </section>
    </div>
  );
}
