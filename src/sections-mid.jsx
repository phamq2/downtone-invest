// Mid-page sections: overview, opportunity, projection, funding, and timeline (VU-meter style).

window.DTOverview = function DTOverview() {
  const mobile = useMobile();
  return (
    <section id="overview" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">01 / Overview</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft" style={{ color: "rgba(245,241,234,0.55)" }}>The brief in one minute</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.1fr 1fr", gap: mobile ? 40 : 64, alignItems: "start" }}>
          <div>
            <div className="dt-serif-it" style={{ fontSize: 38, lineHeight: 1.2, color: "var(--accent)", marginBottom: 32 }}>
              A sound-led hospitality space in Lower Manhattan where listening deepens as the day turns into night.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }} className="dt-hairline-list">
              {[
                ["The concept", "Specialty coffee by day, hi-fi listening bar by night. 70-seat ground floor + 25-seat Sound Room below. Built on a decade of programmed listening sessions and community."],
                ["The location", "301 Grand Street — Chinatown, LES & SoHo. 2,600 sq ft. High-visibility corridor, excellent transit."],
                ["The stage",    "Lease signed. Liquor license: CB approved, SLA pending. SBA financing secured. Core team in place, design underway ahead of permits and buildout — May 2027 opening target."],
                ["The build",   "Ground floor + lower level built simultaneously. Lower level programming launches September 2027."]
              ].map(([t, b], i) => (
                <div key={i} style={{ paddingTop: i ? 24 : 0 }}>
                  <div className="dt-eyebrow" style={{ marginBottom: 8 }}>{t}</div>
                  <div className="dt-body">{b}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "url('assets/photos/venue-frontage.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}/>
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.18)"
            }}/>
            <div style={{
              position: "absolute", inset: 0,
              background: "var(--accent)",
              opacity: 0.28,
              mixBlendMode: "color"
            }}/>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3D walkthrough of the venue — Sketchfab design models, one per floor.
// The heavy viewer iframe only loads after an explicit click (per model),
// so the brief's initial load stays fast.
window.DTSpace = function DTSpace() {
  const { useState } = React;
  const mobile = useMobile();
  const { SPACE_MODELS } = window.DT_DATA;
  const [selIdx, setSelIdx] = useState(0);
  const [loaded, setLoaded] = useState({});
  const m = SPACE_MODELS[selIdx];

  return (
    <section id="space" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">02 / The Space</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">301 Grand St in 3D</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 16 }}>The Space.</h2>
        <div className="dt-body-lg" style={{ maxWidth: 720, marginBottom: 40 }}>
          The working design model of the venue. Drag to orbit, scroll to zoom, go fullscreen.
        </div>

        {SPACE_MODELS.length > 1 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {SPACE_MODELS.map((mod, i) => {
              const active = i === selIdx;
              return (
                <div key={mod.id} onClick={() => setSelIdx(i)} style={{
                  cursor: "pointer", padding: "12px 20px",
                  border: "1px solid " + (active ? "var(--accent)" : "rgba(245,241,234,0.15)"),
                  background: active ? "var(--field2)" : "transparent",
                  fontWeight: 800, fontSize: 13, textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: active ? "var(--accent)" : "var(--fg)",
                  transition: "border-color 200ms, color 200ms"
                }}>{mod.label}</div>
              );
            })}
          </div>
        )}

        <div style={{ marginBottom: 24, maxWidth: 720 }}>
          <div className="dt-eyebrow" style={{ color: "var(--accent)", marginBottom: 10 }}>{m.stat}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {m.points.map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, background: "var(--accent)", marginTop: 8, flexShrink: 0 }}/>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(245,241,234,0.85)" }}>{pt}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: "relative", width: "100%",
          aspectRatio: mobile ? "4 / 3" : "16 / 9",
          border: "1px solid rgba(245,241,234,0.15)",
          background: "rgba(245,241,234,0.04)"
        }}>
          {loaded[m.id] ? (
            <iframe
              title={m.title}
              src={"https://sketchfab.com/models/" + m.id + "/embed?ui_theme=dark"}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
          ) : (
            <div
              onClick={() => setLoaded(p => ({ ...p, [m.id]: true }))}
              style={{
                position: "absolute", inset: 0, cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 14,
                textAlign: "center", padding: 24
              }}>
              <div className="dt-breathe" style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent)" }}/>
              <div className="dt-eyebrow" style={{ color: "var(--accent)" }}>3D Model · {m.label}</div>
              <div className="dt-serif-it" style={{ fontSize: mobile ? 26 : 34, lineHeight: 1.2 }}>Enter the space</div>
              <div className="dt-fg-soft" style={{ fontSize: 13 }}>Click to load the interactive viewer</div>
            </div>
          )}
        </div>

        <div className="dt-fg-soft" style={{ fontSize: 12, marginTop: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span>Drag to orbit · Scroll to zoom · Fullscreen supported</span>
          <span>
            <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>Design model</a>
            {" by "}
            <a href={m.authorUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>{m.author}</a>
            {" on Sketchfab"}
          </span>
        </div>
      </div>
    </section>
  );
};

window.DTOpportunity = function DTOpportunity() {
  const mobile = useMobile();
  return (
    <section id="opportunity" className="dt-section" style={{ background: "var(--field2)" }}>
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">03 / Offer</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">Class B membership units</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 16 }}>The Opportunity.</h2>
        <div className="dt-body-lg" style={{ maxWidth: 760, marginBottom: 64 }}>
          We are offering <span style={{ color: "var(--accent)" }}>$500,000 in equity</span> to accredited investors to build and launch Downtone NYC.
        </div>

        {/* Ownership structure — three-class cap table */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "0.75fr 1.25fr", gap: 0, marginBottom: 24, border: "1px solid rgba(245,241,234,0.15)" }}>
          <div style={{
            padding: mobile ? 24 : 28,
            borderRight: mobile ? "none" : "1px solid rgba(245,241,234,0.15)",
            borderBottom: mobile ? "1px solid rgba(245,241,234,0.15)" : "none",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 240, height: "auto", display: "block" }} aria-label="Ownership pie chart: Class A 70%, Class B 20%, Class C 10%">
              {(() => {
                const r = 95, cx = 100, cy = 100, labelR = 58;
                const point = (pct, rr) => {
                  const a = pct * 2 * Math.PI - Math.PI / 2;
                  return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) };
                };
                const slice = (start, end) => {
                  const p1 = point(start, r);
                  const p2 = point(end, r);
                  const large = end - start > 0.5 ? 1 : 0;
                  return "M " + cx + "," + cy + " L " + p1.x + "," + p1.y +
                         " A " + r + "," + r + " 0 " + large + ",1 " + p2.x + "," + p2.y + " Z";
                };
                const pA = point(0.35, labelR);
                const pB = point(0.80, labelR);
                const pC = point(0.95, labelR);
                return (
                  <>
                    <path d={slice(0,    0.70)} fill="var(--fg)"                 stroke="var(--bg)" strokeWidth="1.5"/>
                    <path d={slice(0.70, 0.90)} fill="var(--accent)"             stroke="var(--bg)" strokeWidth="1.5"/>
                    <path d={slice(0.90, 1.00)} fill="rgba(245,241,234,0.40)"    stroke="var(--bg)" strokeWidth="1.5"/>
                    <text x={pA.x} y={pA.y} fill="var(--bg)" fontFamily="Bandit" fontSize="24" textAnchor="middle" dominantBaseline="central">A</text>
                    <text x={pB.x} y={pB.y} fill="var(--bg)" fontFamily="Bandit" fontSize="24" textAnchor="middle" dominantBaseline="central">B</text>
                    <text x={pC.x} y={pC.y} fill="var(--fg)" fontFamily="Bandit" fontSize="24" textAnchor="middle" dominantBaseline="central">C</text>
                  </>
                );
              })()}
            </svg>
          </div>

          <div style={{ padding: mobile ? 24 : 32, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div className="dt-eyebrow" style={{ color: "var(--accent)", marginBottom: 10 }}>Ownership Structure</div>
              <div className="dt-body" style={{ maxWidth: "none" }}>
                Downtone is structured as an LLC with three classes of membership units. Each class has a defined role and a fixed share of company economics.
              </div>
            </div>
            {[
              ["Class A — Operator · 70%",         "Held by the founder/operator. Holds decision-making control and manages day-to-day operations."],
              ["Class B — Investors · 20%",        "Accredited investors participating in the capital raise. Receives cash distributions — full structure detailed below."],
              ["Class C — Reserved pool · 10%",    "Reserved for future advisors and key team members brought on as the business grows."]
            ].map(([t, b]) => (
              <div key={t}>
                <div className="dt-eyebrow" style={{ color: "var(--fg)", marginBottom: 8 }}>{t}</div>
                <div className="dt-body" style={{ maxWidth: "none" }}>{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.6fr 1fr", gap: 0, marginBottom: 56, border: "1px solid rgba(245,241,234,0.15)" }}>
          <div style={{ padding: 48, borderRight: "1px solid rgba(245,241,234,0.15)" }}>
            <div className="dt-eyebrow" style={{ marginBottom: 16 }}>Class B Membership Units</div>
            <div className="dt-body" style={{ maxWidth: 540 }}>
              Class B collectively owns 20% of the company’s economics. Before the 1.25× preference threshold, investors receive 70% of distributable cash flow. After that, distributions revert to the permanent 20% share.
            </div>
          </div>
          <div style={{ padding: 48, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="dt-eyebrow" style={{ marginBottom: 8 }}>Minimum</div>
            <div style={{ fontFamily: "Bandit", fontSize: 72, lineHeight: 1, color: "var(--accent)" }}>$12,500</div>
            <div className="dt-fg-soft" style={{ fontSize: 13, marginTop: 8 }}>1 unit · 2.5% of Class B</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 24 }}>
          <div className="dt-card" style={{ background: "var(--bg)" }}>
            <div className="dt-eyebrow" style={{ marginBottom: 8 }}>How it works</div>
            <div className="dt-fg-soft" style={{ fontSize: 13, marginBottom: 24, lineHeight: 1.55 }}>
              Free cash flow = revenue after all expenses and obligations.
            </div>
            <div style={{ marginBottom: 24 }}>
              <div className="dt-eyebrow" style={{ color: "var(--accent)", marginBottom: 6 }}>Phase 1 · Preferred return</div>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>70% of free cash flow to you</div>
              <div className="dt-body" style={{ marginTop: 4 }}>until you receive 1.25× your investment back.</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div className="dt-eyebrow" style={{ color: "var(--accent)", marginBottom: 6 }}>Phase 2 · Perpetual income</div>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>20% of free cash flow, ongoing</div>
              <div className="dt-body" style={{ marginTop: 4 }}>for as long as the business operates — no expiry.</div>
            </div>
            <div className="dt-body dt-fg-soft" style={{ marginTop: 24 }}>Paid annually after year-end close. Annual K-1s. Full inspection rights.</div>
          </div>
          <div className="dt-card" style={{ background: "var(--bg)" }}>
            <div className="dt-eyebrow" style={{ marginBottom: 24 }}>Structured to protect you</div>
            <div className="dt-hairline-list" style={{ display: "flex", flexDirection: "column" }}>
              {[
                "You get paid first — 70% until 1.25× return",
                "Operator earns more only after you’re made whole",
                "$175K opening reserve + $100K credit line covers ramp risk",
                "Quarterly reporting with full inspection rights",
                "No personal liability for investors"
              ].map((x, i) => (
                <div key={i} style={{ padding: "14px 0", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, background: "var(--accent)", marginTop: 8, flexShrink: 0 }}/>
                  <div className="dt-body" style={{ color: "rgba(245,241,234,0.9)" }}>{x}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.DTProjection = function DTProjection() {
  const { useState, useMemo } = React;
  const mobile = useMobile();
  const { TIER_MIN, PERKS, YR_DIST, YR_TOTAL, fmt } = window.DT_DATA;
  const [inv, setInv] = useState(25000);

  const p = inv / 500000;
  const my = YR_DIST.map(x => x * p);
  const m5 = YR_TOTAL * p;
  const c5 = m5 * 0.688;
  const u5 = m5 * 1.29;
  const tier = inv >= 100000 ? "Premium" : inv >= 50000 ? "Insider" : "Founder";

  // Long-term milestones. Distributable cash held flat at Year 5 ($708K)
  // since revenue growth is offset by rising debt service through Year 5.
  const ms = useMemo(() => {
    let cB = YR_TOTAL;
    const out = {};
    const dc = 708000;
    for (let y = 6; y <= 15; y++) {
      cB += dc * 0.2;
      if (y === 10 || y === 15) out[y] = { c: cB * p, m: (cB * p) / inv, a: dc * 0.2 * p };
    }
    return out;
  }, [inv, p]);

  const mxBar = Math.max(...my);

  return (
    <section id="projection" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">04 / Returns</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">Drag to model your investment</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 48 }}>Investment<br/>Projection.</h2>

        {/* Console — investor + class b + tier */}
        <div style={{
          background: "var(--field2)",
          padding: mobile ? 24 : 48,
          border: "1px solid rgba(245,241,234,0.15)"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.6fr 1fr 1fr", gap: mobile ? 20 : 48, alignItems: mobile ? "flex-start" : "flex-end" }}>
            <div>
              <div className="dt-eyebrow" style={{ marginBottom: 8 }}>Your investment</div>
              <div style={{ fontFamily: "Outfit", fontWeight: 900, fontSize: mobile ? 44 : 64, lineHeight: 1, letterSpacing: "-0.04em" }}>
                ${inv.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="dt-eyebrow" style={{ marginBottom: 8 }}>Business ownership</div>
              <div style={{ fontFamily: "Bandit", fontSize: mobile ? 36 : 48, lineHeight: 1, color: "var(--accent)" }}>
                {(p * 20).toFixed(1)}%
              </div>
            </div>
            <div style={{ textAlign: mobile ? "left" : "right" }}>
              <div className="dt-eyebrow" style={{ marginBottom: 8 }}>Tier unlocked</div>
              <div style={{
                display: "inline-block",
                padding: "8px 18px",
                background: "var(--accent)",
                color: "var(--bg)",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: "0.16em",
                textTransform: "uppercase"
              }}>{tier}</div>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <input
              type="range"
              className="dt-slider"
              min={12500} max={125000} step={2500}
              value={inv}
              onChange={e => setInv(+e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <span className="dt-eyebrow dt-fg-soft">$12,500</span>
              <span className="dt-eyebrow dt-fg-soft">$125,000</span>
            </div>
          </div>
        </div>

        {/* Scenarios + perks */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.4fr 1fr", gap: 40, marginTop: 56 }}>
          <div>
            <div className="dt-eyebrow" style={{ marginBottom: 24 }}>5-year return scenarios</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "16px 0", fontSize: 11, letterSpacing: "0.14em", color: "rgba(245,241,234,0.55)", textTransform: "uppercase", fontWeight: 500, borderBottom: "1px solid rgba(245,241,234,0.15)" }}></th>
                  <th style={th}>Conservative</th>
                  <th style={{ ...th, color: "var(--accent)" }}>Base</th>
                  <th style={th}>Upside</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Multiple", "~" + (c5 / inv).toFixed(1) + "×", "~" + (m5 / inv).toFixed(1) + "×", "~" + (u5 / inv).toFixed(1) + "×"],
                  ["Total return", "~" + fmt(c5), "~" + fmt(m5), "~" + fmt(u5)],
                  ["Net gain", "~" + fmt(c5 - inv), "~" + fmt(m5 - inv), "~" + fmt(u5 - inv)]
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={td}>{r[0]}</td>
                    <td style={{ ...td, textAlign: "right", color: "rgba(245,241,234,0.7)" }}>{r[1]}</td>
                    <td style={{ ...td, textAlign: "right", color: "var(--accent)", fontWeight: 700 }}>{r[2]}</td>
                    <td style={{ ...td, textAlign: "right", color: "rgba(245,241,234,0.7)" }}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Year-by-year bars */}
            <div className="dt-eyebrow" style={{ marginTop: 48, marginBottom: 16 }}>
              Year-by-year distributions (base case)
            </div>
            <div style={{ display: "flex", gap: mobile ? 4 : 8, alignItems: "flex-end", height: mobile ? 200 : 200 }}>
              {my.map((v, i) => {
                const barMax = mobile ? 120 : 140;
                const h = Math.max((v / mxBar) * barMax, 8);
                return (
                  <div key={i} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: mobile ? 6 : 8 }}>
                    <div style={{ fontFamily: "Bandit", fontSize: mobile ? 11 : 18, color: "var(--accent)", whiteSpace: "nowrap" }}>~{fmt(v)}</div>
                    <div style={{ width: "100%", height: h, background: "var(--accent)" }}/>
                    <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: mobile ? 10 : 11, letterSpacing: mobile ? "0.10em" : "0.18em" }}>Yr {i + 1}</div>
                  </div>
                );
              })}
            </div>

            {/* Long-term outlook */}
            <div className="dt-eyebrow" style={{ marginTop: 48, marginBottom: 16 }}>Long-term outlook</div>
            <div className="dt-fg-soft dt-serif-it" style={{ fontSize: 14, marginBottom: 16 }}>
              Base case. 10-year lease + 5-year renewal option. 3% annual growth.
            </div>
            <div className="dt-hairline-list">
              <Row label="Year 5" cum={"~" + fmt(m5)} mult={"~" + (m5 / inv).toFixed(1) + "×"} note="Initial lease in motion" hl/>
              <Row label="Year 10" cum={"~" + fmt(ms[10].c)} mult={"~" + ms[10].m.toFixed(1) + "×"} note={"~" + fmt(ms[10].a) + " / yr · End of initial"}/>
              <Row label="Year 15" cum={"~" + fmt(ms[15].c)} mult={"~" + ms[15].m.toFixed(1) + "×"} note={"~" + fmt(ms[15].a) + " / yr · Renewal option"}/>
            </div>
          </div>

          <div>
            <div className="dt-eyebrow" style={{ marginBottom: 24 }}>Your perks</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Founder", "Insider", "Premium"].map(t => {
                const on = inv >= TIER_MIN[t];
                const cu = tier === t;
                return (
                  <div key={t} style={{
                    background: cu ? "var(--accent)" : on ? "var(--field2)" : "transparent",
                    color: cu ? "var(--bg)" : "var(--fg)",
                    padding: 24,
                    opacity: on ? 1 : 0.4,
                    border: cu ? "none" : "1px solid rgba(245,241,234,0.15)",
                    transition: "all 250ms"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }}>{t}</span>
                      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}>
                        {on ? "Unlocked" : "$" + (TIER_MIN[t] / 1000) + "K+"}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {PERKS[t].map((pk, j) => (
                        <div key={j} style={{ fontSize: 13, lineHeight: 1.5, opacity: cu ? 0.85 : 0.75 }}>{pk}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const th = { textAlign: "right", padding: "16px 0", fontSize: 11, letterSpacing: "0.14em", color: "rgba(245,241,234,0.55)", textTransform: "uppercase", fontWeight: 500, borderBottom: "1px solid rgba(245,241,234,0.15)" };
const td = { padding: "18px 0", fontSize: 14, color: "rgba(245,241,234,0.9)", borderBottom: "1px solid rgba(245,241,234,0.10)" };

function Row({ label, cum, mult, note, hl }) {
  return (
    <div style={{
      padding: "20px 0",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 0.8fr 1.4fr",
      gap: 16,
      alignItems: "center",
      color: hl ? "var(--accent)" : "rgba(245,241,234,0.85)",
      fontWeight: hl ? 700 : 400
    }}>
      <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 18 }}>{label}</div>
      <div style={{ fontFamily: "Bandit", fontSize: 22 }}>{cum}</div>
      <div style={{ fontSize: 14 }}>{mult}</div>
      <div className="dt-fg-soft" style={{ fontSize: 13 }}>{note}</div>
    </div>
  );
}

// Use-of-funds breakdown: interactive pie + table. Hover a slice or row to
// link the two and surface the dollar amount; percentages sit on the slices.
window.DTUseOfFunds = function DTUseOfFunds() {
  const { USE_OF_FUNDS, fmt } = window.DT_DATA;
  const { useState } = React;
  const mobile = useMobile();
  const [active, setActive] = useState(null);

  const total = USE_OF_FUNDS.reduce((s, [, v]) => s + v, 0);

  // Restrained palette — orange, orange-cream, light blue, then a gray ramp
  // for the smaller line items. All light enough to carry dark on-slice labels.
  const palette = [
    "var(--dt-amber)",
    "var(--dt-cream)",
    "var(--dt-sky)",
    "var(--dt-butter)",
    "var(--dt-gray-1)",
    "var(--dt-gray-2)",
    "var(--dt-gray-3)"
  ];

  const size = mobile ? 240 : 300;
  const r = size / 2;
  let cum = 0;
  const slices = USE_OF_FUNDS.map(([label, budget, desc], i) => {
    const start = cum / total;
    cum += budget;
    const end = cum / total;
    const mid = (start + end) / 2;
    const a0 = 2 * Math.PI * start - Math.PI / 2;
    const a1 = 2 * Math.PI * end - Math.PI / 2;
    const am = 2 * Math.PI * mid - Math.PI / 2;
    const x0 = r + r * Math.cos(a0), y0 = r + r * Math.sin(a0);
    const x1 = r + r * Math.cos(a1), y1 = r + r * Math.sin(a1);
    const large = end - start > 0.5 ? 1 : 0;
    const d = `M ${r} ${r} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
    const labelR = r * 0.64;
    const lx = r + labelR * Math.cos(am);
    const ly = r + labelR * Math.sin(am);
    return { d, color: palette[i % palette.length], label, desc, budget, pct: budget / total, mid: am, lx, ly };
  });

  const caption = active != null ? slices[active] : null;
  const lift = 10;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div className="dt-eyebrow">Use of Funds · $1.46M Total</div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        alignItems: "center",
        gap: mobile ? 24 : 56
      }}>
        <div style={{ flexShrink: 0, alignSelf: "center" }}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={mobile ? "100%" : size}
            height={mobile ? "auto" : size}
            style={{ maxWidth: size, display: "block", overflow: "visible" }}
            role="img"
            aria-label="Use of funds breakdown by category"
          >
            {slices.map((s, i) => {
              const isActive = active === i;
              const dimmed = active != null && !isActive;
              const dx = isActive ? Math.cos(s.mid) * lift : 0;
              const dy = isActive ? Math.sin(s.mid) * lift : 0;
              return (
                <g
                  key={i}
                  transform={`translate(${dx.toFixed(2)} ${dy.toFixed(2)})`}
                  style={{
                    transition: "transform 250ms var(--ease-house), opacity 250ms var(--ease-house)",
                    opacity: dimmed ? 0.4 : 1,
                    cursor: "pointer"
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <path d={s.d} fill={s.color} stroke="var(--field2)" strokeWidth="2" />
                  {s.pct >= 0.05 && (
                    <text
                      x={s.lx} y={s.ly}
                      fill="var(--bg)"
                      fontFamily="Bandit"
                      fontSize={mobile ? 13 : 15}
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ pointerEvents: "none" }}
                    >
                      {Math.round(s.pct * 100)}%
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <div style={{ textAlign: "center", marginTop: 16, minHeight: 48 }}>
            <div style={{
              fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em",
              color: caption ? caption.color : "rgba(245,241,234,0.55)",
              transition: "color 250ms var(--ease-house)"
            }}>
              {caption ? caption.label : "Total Capital"}
            </div>
            <div style={{ fontFamily: "Bandit", fontSize: 22, color: "var(--fg)", marginTop: 4 }}>
              {caption ? `${fmt(caption.budget)} · ${(caption.pct * 100).toFixed(0)}%` : fmt(total)}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0, width: mobile ? "100%" : "auto" }}>
          {slices.map((s, i) => {
            const isActive = active === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto auto",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 12px",
                  cursor: "pointer",
                  background: isActive ? "rgba(245,241,234,0.06)" : "transparent",
                  transition: "background 200ms var(--ease-house)",
                  borderTop: i ? "1px solid rgba(245,241,234,0.08)" : "1px solid rgba(245,241,234,0.15)"
                }}
              >
                <span style={{ width: 12, height: 12, background: s.color, flexShrink: 0, display: "inline-block" }}/>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, minWidth: 0, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(245,241,234,0.85)", whiteSpace: "nowrap" }}>{s.label}</span>
                  <span style={{ fontSize: 12.5, color: "rgba(245,241,234,0.45)" }}>{s.desc}</span>
                </div>
                <div style={{ fontFamily: "Bandit", fontSize: 14, color: "rgba(245,241,234,0.85)", textAlign: "right", whiteSpace: "nowrap" }}>{fmt(s.budget)}</div>
                <div style={{ fontFamily: "Bandit", fontSize: 14, color: "rgba(245,241,234,0.50)", textAlign: "right", minWidth: 44, whiteSpace: "nowrap" }}>{(s.pct * 100).toFixed(0)}%</div>
              </div>
            );
          })}
          <div style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto auto",
            alignItems: "center",
            gap: 16,
            padding: "12px 12px",
            borderTop: "1px solid rgba(245,241,234,0.15)"
          }}>
            <span style={{ width: 12, height: 12, flexShrink: 0, display: "inline-block" }}/>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--fg)" }}>Total</div>
            <div style={{ fontFamily: "Bandit", fontSize: 14, color: "var(--fg)", textAlign: "right", whiteSpace: "nowrap" }}>{fmt(total)}</div>
            <div style={{ fontFamily: "Bandit", fontSize: 14, color: "rgba(245,241,234,0.50)", textAlign: "right", minWidth: 44, whiteSpace: "nowrap" }}>100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.DTFunding = function DTFunding() {
  const mobile = useMobile();
  return (
    <section id="funding" className="dt-section" style={{ background: "var(--field2)" }}>
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">05 / Funding</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">$1.46M total · $200K open</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 24 }}>Funding<br/>Progress.</h2>

        <div style={{ maxWidth: 820, marginBottom: 48 }}>
          <p className="dt-body" style={{ margin: "0 0 16px 0", color: "rgba(245,241,234,0.80)" }}>
            We're raising in two milestones:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ width: 7, height: 7, background: "var(--accent)", marginTop: 9, flexShrink: 0 }}/>
              <div style={{ color: "rgba(245,241,234,0.80)", lineHeight: 1.55 }}>
                <strong style={{ fontWeight: 700, color: "var(--fg)" }}>Round 1</strong> closed <span style={{ color: "var(--accent)" }}>$1.26M on September 15, 2026</span>, funding construction, permitting, and development costs.
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ width: 7, height: 7, background: "var(--accent)", marginTop: 9, flexShrink: 0 }}/>
              <div style={{ color: "rgba(245,241,234,0.80)", lineHeight: 1.55 }}>
                <strong style={{ fontWeight: 700, color: "var(--fg)" }}>Round 2</strong> closes the remaining <span style={{ color: "var(--accent)" }}>$200K in Q1 2027</span> to support pre-opening costs and the operating reserve ahead of opening.
              </div>
            </div>
          </div>
        </div>

        {(() => {
          const segments = [
            { amount: 471, label: "$471K", category: "SBA Bank Loan",           note: "Secured",                bg: "var(--dt-green)", color: "var(--bg)" },
            { amount: 100, label: "$100K", category: "Credit Line",             note: "Ramp facility",          bg: "var(--dt-green)", color: "var(--bg)" },
            { amount: 425, label: "$425K", category: "Owner Investment",        note: "Personal funds & HELOC", bg: "var(--dt-green)", color: "var(--bg)" },
            { amount: 275, label: "$275K", category: "Investor\nRound 1", note: "Closed",                bg: "var(--dt-green)",  color: "var(--bg)" },
            { amount: 200, label: "$200K", category: "Investor\nRound 2 Open",   note: "Not started",            bg: "var(--dt-gray-2)", color: "var(--bg)" }
          ];

          // Two-round raise. Round 1 ($1.26M, closed Sept 15) covers everything
          // up to the Round 2 segment; Round 2 ($200K in Q1 2027) is the only
          // open segment. The boundary is a real segment edge.
          const totalK = segments.reduce((a, s) => a + s.amount, 0);
          const round2K = segments[segments.length - 1].amount;
          const round1K = totalK - round2K;
          const r1pct = (round1K / totalK) * 100;

          // Double-headed span arrow used to bracket each round above the bar.
          const phaseArrow = (color) => (
            <div style={{ position: "relative", height: 8 }}>
              <div style={{ position: "absolute", left: 5, right: 5, top: "50%", transform: "translateY(-50%)", height: 2, background: color }}/>
              <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderRight: "6px solid " + color }}/>
              <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "6px solid " + color }}/>
            </div>
          );

          const roundArrows = (
            <div style={{ position: "relative", height: 54, marginBottom: 12 }}>
              <div style={{ position: "absolute", left: 0, bottom: 0, width: "calc(" + r1pct + "% - 5px)", textAlign: "center" }}>
                <div className="dt-eyebrow" style={{ color: "var(--fg)" }}>Round 1</div>
                <div className="dt-serif-it" style={{ fontSize: 12, color: "rgba(245,241,234,0.55)", marginTop: 2, marginBottom: 8, whiteSpace: "nowrap" }}>Closed September 15th</div>
                {phaseArrow("var(--fg)")}
              </div>
              <div style={{ position: "absolute", right: 0, bottom: 0, width: "calc(" + (100 - r1pct) + "% - 5px)", textAlign: "center" }}>
                <div className="dt-eyebrow" style={{ color: "var(--fg)" }}>Round 2</div>
                <div className="dt-serif-it" style={{ fontSize: 12, color: "rgba(245,241,234,0.55)", marginTop: 2, marginBottom: 8, whiteSpace: "nowrap" }}>Closes Q1 2027</div>
                {phaseArrow("var(--fg)")}
              </div>
            </div>
          );
          return mobile ? (
            <div style={{ marginBottom: 56, border: "1px solid rgba(245,241,234,0.15)" }}>
              {segments.map((s, i) => (
                <div key={s.category} style={{
                  background: s.bg, color: s.color,
                  padding: "16px 18px",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  borderTop: i ? "2px solid var(--field2)" : "none"
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.10em", textTransform: "uppercase", opacity: 0.85 }}>{s.category}</div>
                    {s.note && (
                      <div className="dt-serif-it" style={{ fontSize: 12, marginTop: 4, opacity: 0.65 }}>{s.note}</div>
                    )}
                  </div>
                  <span style={{ fontWeight: (s.highlighted || s.open) ? 800 : 700, fontSize: 16, whiteSpace: "nowrap" }}>{s.label}{s.highlighted ? " ↘" : ""}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              {roundArrows}
              <div style={{ display: "flex", gap: 2, height: 88, marginBottom: 12, border: "1px solid rgba(245,241,234,0.15)" }}>
                {segments.map(s => (
                  <div key={s.category} style={{
                    flex: s.amount,
                    background: s.bg,
                    color: s.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: s.amount < 100 ? 14 : 17,
                    fontWeight: (s.highlighted || s.open) ? 800 : 700,
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap"
                  }}>
                    {s.label}{s.highlighted ? " ↘" : ""}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 2, marginBottom: 56, alignItems: "flex-start" }}>
                {segments.map(s => (
                  <div key={s.category + "-l"} style={{
                    flex: s.amount,
                    textAlign: "center",
                    padding: "0 4px"
                  }}>
                    <div style={{
                      fontSize: 10,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      whiteSpace: "pre-line",
                      color: (s.highlighted || s.open) ? "var(--accent)" : "rgba(245,241,234,0.55)"
                    }}>
                      {s.category}
                    </div>
                    {s.note && (
                      <div className="dt-fg-soft dt-serif-it" style={{ fontSize: 11, marginTop: 4 }}>
                        {s.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          );
        })()}

        <DTUseOfFunds />
      </div>
    </section>
  );
};

// Interactive horizontal timeline — click a phase to expand its details
window.DTTimeline = function DTTimeline() {
  const { PHASES } = window.DT_DATA;
  const { useState } = React;
  const mobile = useMobile();
  const activeIdx = PHASES.findIndex(p => p.kind === "active");
  const [hovered, setHovered] = useState(activeIdx >= 0 ? activeIdx : 0);
  const N = PHASES.length;
  const ph = PHASES[hovered];

  return (
    <section id="timeline" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">06 / Timeline</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">Phased to de-risk</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 16 }}>Project Timeline.</h2>
        <div className="dt-body-lg" style={{ maxWidth: 720, marginBottom: 72 }}>
          A phased approach that builds momentum before opening.
        </div>

        {/* Track */}
        <div style={{ position: "relative", marginBottom: 0, overflowX: mobile ? "auto" : "visible" }}>
          {/* Full-width track line through dot centers */}
          {!mobile && <div style={{
            position: "absolute",
            left: 0, right: 0,
            top: 6, height: 1,
            background: "rgba(245,241,234,0.15)"
          }}/>}

          {/* Nodes */}
          <div style={{ display: "grid", gridTemplateColumns: mobile ? `repeat(${N}, minmax(150px, 1fr))` : `repeat(${N}, 1fr)`, columnGap: mobile ? 16 : 0 }}>
            {PHASES.map((p, i) => {
              const isHov = i === hovered;
              const isActive = p.kind === "active";
              return (
                <div key={i}
                  onMouseEnter={() => setHovered(i)}
                  style={{ cursor: "default", paddingBottom: 32, paddingRight: mobile ? 8 : 16, minWidth: 0 }}>
                  {/* Dot */}
                  <div style={{ position: "relative", width: 12, height: 12, marginBottom: 24 }}>
                    {isActive && (
                      <div className="dt-breathe" style={{
                        position: "absolute", inset: -5, borderRadius: "50%",
                        background: "var(--accent)", opacity: 0.15
                      }}/>
                    )}
                    <div style={{
                      width: 12, height: 12, borderRadius: "50%",
                      background: isHov ? "var(--accent)" : "var(--bg)",
                      border: "1px solid " + (isHov ? "var(--accent)" : "rgba(245,241,234,0.40)"),
                      transition: "background 200ms, border-color 200ms"
                    }}/>
                  </div>
                  {/* Name + date */}
                  <div style={{
                    fontWeight: 800, fontSize: mobile ? 15 : 18, textTransform: "uppercase",
                    letterSpacing: "-0.02em", marginBottom: 4,
                    color: isHov ? "var(--fg)" : "rgba(245,241,234,0.45)",
                    transition: "color 200ms",
                    overflowWrap: "break-word"
                  }}>{p.name}</div>
                  <div className="dt-eyebrow" style={{
                    color: isHov ? "var(--accent)" : "rgba(245,241,234,0.30)",
                    transition: "color 200ms",
                    whiteSpace: "nowrap"
                  }}>{p.date}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div style={{
          borderTop: "1px solid rgba(245,241,234,0.15)",
          paddingTop: 40,
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 2fr",
          gap: 64,
          alignItems: "start"
        }}>
          <div>
            <div className="dt-eyebrow" style={{ color: "var(--accent)", marginBottom: 16 }}>
              {ph.kind === "done" ? "Complete" : ph.kind === "active" ? "Now · in progress" : ph.kind === "next" ? "Next up" : "Then"}
            </div>
            <div className="dt-serif-it" style={{ fontSize: 28, lineHeight: 1.25, marginBottom: 12 }}>
              {ph.headline}
            </div>
            <div className="dt-fg-soft" style={{ fontSize: 13 }}>{ph.date}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ph.points.map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, background: "var(--accent)", marginTop: 10, flexShrink: 0 }}/>
                <div style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(245,241,234,0.85)" }}>{pt}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between",
          paddingTop: 24, marginTop: 40,
          borderTop: "1px solid rgba(245,241,234,0.15)",
          color: "rgba(245,241,234,0.40)",
          fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase"
        }}>
          <span>May 2026 — Today</span>
          <span>Lower Level Launch · September 2027</span>
        </div>
      </div>
    </section>
  );
};
