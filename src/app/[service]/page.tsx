import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALC, getService, publishedServices } from "../../lib/services";
import SiteShell from "../../components/SiteChrome";
import ServiceMenu from "../../components/ServiceMenu";
import QuotePanel from "../../components/QuotePanel";

type Props = { params: Promise<{ service: string }> };

export const dynamicParams = false; // unknown or unpublished slugs return 404

export function generateStaticParams() {
  return publishedServices().map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const s = getService(service);
  if (!s || !s.published) return {};
  return {
    title: { absolute: s.title },
    description: s.description,
    alternates: { canonical: `https://jojopropertyservices.co.uk/${s.slug}` },
  };
}

const h2: React.CSSProperties = { fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#0d1b3e", margin: "40px 0 12px" };

export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const s = getService(service);
  if (!s || !s.published) notFound();

  const tiers = s.tiersFrom && CALC[s.tiersFrom]?.model.kind === "tiers" ? (CALC[s.tiersFrom].model as any).tiers as { label: string; price: number }[] : null;

  const hm = s.hourlyTable && CALC[s.calcId]?.model.kind === "hourly" ? (CALC[s.calcId].model as any) : null;
  const cols = hm ? Array.from({ length: Math.min(3, hm.maxStaff) }, (_, i) => i + 1) : [];

  const faqSchema = s.faqs && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <SiteShell>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <div className="sp-grid">
        <ServiceMenu current={s.slug} />

        <main>
          <p style={{ fontSize: 13, color: "#8a96b0", marginBottom: 14 }}>
            <Link href="/" style={{ textDecoration: "none" }}>Home</Link> / {s.label}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, lineHeight: 1.15, color: "#0d1b3e" }}>{s.h1}</h1>
          <p style={{ fontSize: 17, color: "#5a6782", lineHeight: 1.7, marginTop: 16 }}>{s.intro}</p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "24px 0" }}>
            <a href="#quote" style={{ background: "#1a6bff", color: "#fff", padding: "13px 26px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Get a free quote</a>
            <a href="tel:07305851573" style={{ border: "2px solid #1a6bff", color: "#1a6bff", padding: "11px 24px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Call 07305851573</a>
            <a href="https://wa.me/447341958822" target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "13px 24px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>WhatsApp us</a>
          </div>

          {s.included && (
            <>
              <h2 style={h2}>What’s included</h2>
              <ul style={{ paddingLeft: 20, lineHeight: 1.7, color: "#3d4a6b", display: "flex", flexDirection: "column", gap: 6 }}>
                {s.included.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </>
          )}

          {tiers && (
            <>
              <h2 style={h2}>Prices</h2>
              <div style={{ border: "1.5px solid #eef1f8", borderRadius: 16, overflow: "hidden", maxWidth: 520 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#1a6bff" }}>
                      <th style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontSize: 14 }}>Property size</th>
                      <th style={{ padding: "14px 18px", textAlign: "right", color: "#fff", fontSize: 14 }}>Starting from</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((t, i) => (
                      <tr key={t.label} style={{ borderBottom: "1px solid #eef1f8", background: i % 2 ? "#fafbff" : "#fff" }}>
                        <td style={{ padding: "13px 18px", fontSize: 14, color: "#3d4a6b" }}>{t.label}</td>
                        <td style={{ padding: "13px 18px", fontSize: 14, fontWeight: 600, color: "#0d1b3e", textAlign: "right" }}>£{t.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 13, color: "#8a96b0", marginTop: 8 }}>Final price depends on the condition of the property. We confirm it before work starts, with no hidden fees.</p>
            </>
          )}

          {s.priceRows && (
            <>
              <h2 style={h2}>Prices</h2>
              <div style={{ border: "1.5px solid #eef1f8", borderRadius: 16, overflow: "hidden", maxWidth: 520 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#1a6bff" }}>
                      <th style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontSize: 14 }}>Service</th>
                      <th style={{ padding: "14px 18px", textAlign: "right", color: "#fff", fontSize: 14 }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.priceRows.map((r, i) => (
                      <tr key={r.label} style={{ borderBottom: "1px solid #eef1f8", background: i % 2 ? "#fafbff" : "#fff" }}>
                        <td style={{ padding: "13px 18px", fontSize: 14, color: "#3d4a6b" }}>{r.label}</td>
                        <td style={{ padding: "13px 18px", fontSize: 14, fontWeight: 600, color: "#0d1b3e", textAlign: "right" }}>{r.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 13, color: "#8a96b0", marginTop: 8 }}>We confirm the final price before work starts, with no hidden fees.</p>
            </>
          )}

          {hm && (
            <>
              <h2 style={h2}>Prices</h2>
              <p style={{ color: "#3d4a6b", lineHeight: 1.7, marginBottom: 14 }}>
                £{hm.rate} per hour, per cleaner. Your price is the hours multiplied by the number of cleaners. Each extra cleaner is charged at the same hourly rate, so two cleaners cost double per hour but finish in about half the time.
              </p>
              {hm.presets ? (
                <div style={{ border: "1.5px solid #eef1f8", borderRadius: 16, overflowX: "auto", maxWidth: 600 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 440 }}>
                    <thead>
                      <tr style={{ background: "#1a6bff" }}>
                        <th style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontSize: 14 }}>Property size</th>
                        <th style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontSize: 14 }}>Typical time</th>
                        <th style={{ padding: "14px 18px", textAlign: "right", color: "#fff", fontSize: 14 }}>Typical price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hm.presets.map((p: { label: string; hours: number; staff: number }, i: number) => (
                        <tr key={p.label} style={{ borderBottom: "1px solid #eef1f8", background: i % 2 ? "#fafbff" : "#fff" }}>
                          <td style={{ padding: "13px 18px", fontSize: 14, color: "#3d4a6b" }}>{p.label}</td>
                          <td style={{ padding: "13px 18px", fontSize: 14, color: "#3d4a6b" }}>{p.hours} hrs, {p.staff} cleaner{p.staff > 1 ? "s" : ""}</td>
                          <td style={{ padding: "13px 18px", fontSize: 14, fontWeight: 600, color: "#0d1b3e", textAlign: "right" }}>£{hm.rate * p.hours * p.staff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ border: "1.5px solid #eef1f8", borderRadius: 16, overflowX: "auto", maxWidth: 560 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 380 }}>
                    <thead>
                      <tr style={{ background: "#1a6bff" }}>
                        <th style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontSize: 14 }}>Duration</th>
                        {cols.map((c) => (
                          <th key={c} style={{ padding: "14px 18px", textAlign: "right", color: "#fff", fontSize: 14 }}>{c} cleaner{c > 1 ? "s" : ""}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[2, 3, 4, 6, 8].filter((h) => h >= hm.minHours).map((h, i) => (
                        <tr key={h} style={{ borderBottom: "1px solid #eef1f8", background: i % 2 ? "#fafbff" : "#fff" }}>
                          <td style={{ padding: "13px 18px", fontSize: 14, color: "#3d4a6b" }}>{h} hours</td>
                          {cols.map((c) => (
                            <td key={c} style={{ padding: "13px 18px", fontSize: 14, fontWeight: 600, color: "#0d1b3e", textAlign: "right" }}>£{hm.rate * h * c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p style={{ fontSize: 13, color: "#8a96b0", marginTop: 8 }}>Minimum booking {hm.minHours} hours. {hm.presets ? "Typical times are a guide, and heavily soiled properties may need longer. " : ""}Use the calculator for any other combination. We confirm the final price before work starts, with no hidden fees.</p>
            </>
          )}

          {s.extras && (
            <>
              <h2 style={h2}>Add-ons and extras</h2>
              <div style={{ border: "1.5px solid #eef1f8", borderRadius: 16, overflow: "hidden", maxWidth: 520 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {s.extras.map((r, i) => (
                      <tr key={r.label} style={{ borderBottom: "1px solid #eef1f8", background: i % 2 ? "#fafbff" : "#fff" }}>
                        <td style={{ padding: "13px 18px", fontSize: 14, color: "#3d4a6b" }}>{r.label}</td>
                        <td style={{ padding: "13px 18px", fontSize: 14, fontWeight: 600, color: "#0d1b3e", textAlign: "right" }}>{r.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {s.faqs && (
            <>
              <h2 style={h2}>Frequently asked questions</h2>
              {s.faqs.map((f) => (
                <details key={f.q} style={{ borderBottom: "1px solid #eef1f8", padding: "14px 0" }}>
                  <summary style={{ cursor: "pointer", fontWeight: 600, color: "#0d1b3e" }}>{f.q}</summary>
                  <p style={{ marginTop: 8, color: "#5a6782", lineHeight: 1.65 }}>{f.a}</p>
                </details>
              ))}
            </>
          )}

          {s.related && s.related.length > 0 && (
            <p style={{ marginTop: 32 }}>
              Related:{" "}
              {s.related.map((slug) => {
                const r = getService(slug);
                return r?.published ? <Link key={slug} href={`/${slug}`} style={{ marginRight: 14, color: "#1a6bff" }}>{r.label}</Link> : null;
              })}
            </p>
          )}
        </main>

        {/* key resets the calculator when the page changes */}
        <QuotePanel key={s.slug} defaultService={s.calcId} />
      </div>
    </SiteShell>
  );
}
