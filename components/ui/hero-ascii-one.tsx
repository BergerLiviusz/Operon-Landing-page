"use client";

import { useEffect } from "react";

const signalBars = [10, 17, 8, 22, 13, 19, 6, 15];

export default function OperonHeroAsciiOne() {
  useEffect(() => {
    const embedScript = document.createElement("script");
    embedScript.type = "text/javascript";
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement("style");
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }

      [data-us-project] canvas {
        clip-path: inset(0 0 8% 0) !important;
        filter: saturate(0.68) hue-rotate(112deg) brightness(1.72) contrast(0.82) !important;
        opacity: 0.32 !important;
        mix-blend-mode: multiply !important;
      }

      [data-us-project] * {
        pointer-events: none !important;
      }

      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="operon-ascii-hero" data-hero>
      <div className="operon-ascii-unicorn" aria-hidden="true">
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: "100%", height: "100%", minHeight: "100svh" }}
        />
      </div>

      <div className="operon-ascii-mobile" aria-hidden="true" />

      <div className="operon-ascii-map" aria-hidden="true">
        <div>
          <span>FIN</span>
          <span>CRM</span>
          <span>MRP</span>
          <span>HR</span>
        </div>
        <pre>{`OPERON://ERP-CORE
[FIN]----[STOCK]----[CRM]
  |         |          |
[MRP]----[PROJECT]---[HR]
  |         |          |
REPORTS==DATA==SUPPORT`}</pre>
      </div>

      <div className="operon-ascii-corner corner-a" aria-hidden="true" />
      <div className="operon-ascii-corner corner-b" aria-hidden="true" />
      <div className="operon-ascii-corner corner-c" aria-hidden="true" />
      <div className="operon-ascii-corner corner-d" aria-hidden="true" />

      <div className="operon-ascii-meta" data-reveal>
        <div>
          <strong>OPERON ERP</strong>
          <span>MODULAR BUSINESS OS</span>
        </div>
        <div>
          <span>HU-SMB / CLOUD</span>
          <span>SECURE DATA CORE</span>
        </div>
      </div>

      <div className="operon-ascii-content">
        <div className="operon-ascii-copy" data-reveal>
          <div className="operon-ascii-line">
            <span />
            <b>∞</b>
            <span />
          </div>

          <p className="operon-ascii-kicker">
            Modulalapú ERP SaaS magyar kis- és középvállalatoknak
          </p>

          <h1>Irányíts teljes vállalatot</h1>

          <div className="operon-ascii-dots" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <p className="operon-ascii-lede">
            Az Operon egységes vállalatirányítási rendszerré rendezi a
            pénzügyet, készletet, CRM-et, gyártást, projekteket és HR-t, hogy
            a működés mérhető, irányítható és skálázható legyen.
          </p>

          <div className="operon-ascii-actions">
            <a href="#demo">
              <span />
              Bemutatót kérek
            </a>
            <a href="#modules">Modulok megnézése</a>
          </div>

          <div className="operon-ascii-protocol" aria-hidden="true">
            <b>OPERON.PROTOCOL</b>
            <span />
            <b>ERP CORE ACTIVE</b>
          </div>
        </div>
      </div>

      <div className="operon-ascii-footer" data-reveal>
        <div>
          <span>SYSTEM.ACTIVE</span>
          <div aria-hidden="true">
            {signalBars.map((height, index) => (
              <i key={index} style={{ height }} />
            ))}
          </div>
          <span>V4.1</span>
        </div>
        <div>
          <span>◐ REPORTING</span>
          <b />
          <b />
          <b />
          <span>FRAME: ∞</span>
        </div>
      </div>
    </section>
  );
}
