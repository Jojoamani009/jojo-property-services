"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { CALC } from "../lib/services";

// Same EmailJS settings as the quote form in HomePage.tsx
const EMAILJS_SERVICE = "service_vgitf2j";
const EMAILJS_TEMPLATE = "template_8m8vbss";
const EMAILJS_KEY = "Zd2QJQZ7GXWqDTblv";

const lbl: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "#8a96b0", letterSpacing: "0.08em", display: "block", marginBottom: 6 };
const fld: React.CSSProperties = { width: "100%", border: "1.5px solid #dce3f0", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "inherit", color: "#1a1a2e", background: "#fff", outline: "none" };
const stepBtn: React.CSSProperties = { width: 40, height: 40, background: "#f5f8ff", border: "none", cursor: "pointer", fontSize: 18, color: "#1a6bff" };

function Stepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #dce3f0", borderRadius: 8, overflow: "hidden" }}>
      <button type="button" aria-label="Decrease" style={stepBtn} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span style={{ flex: 1, textAlign: "center", fontWeight: 700, color: "#0d1b3e" }}>{value}</span>
      <button type="button" aria-label="Increase" style={stepBtn} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

// Starting hours/cleaners for a service (uses the first typical-time preset if there is one)
function defaults(id: string) {
  const m = CALC[id].model;
  if (m.kind === "hourly") {
    const p = m.presets?.[0];
    return { hours: p ? p.hours : m.minHours, staff: p ? p.staff : 1, preset: p ? 0 : -1 };
  }
  return { hours: 2, staff: 1, preset: -1 };
}

// Calculator + quote form. Render with key={slug} so it resets when the page changes.
export default function QuotePanel({ defaultService = "domestic" }: { defaultService?: string }) {
  const [id, setId] = useState(defaultService);
  const d0 = defaults(defaultService);
  const [hours, setHours] = useState(d0.hours);
  const [staff, setStaff] = useState(d0.staff);
  const [preset, setPreset] = useState(d0.preset);
  const [qty, setQty] = useState(1);
  const [tier, setTier] = useState(0);
  const [f, setF] = useState({ name: "", phone: "", email: "", postcode: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const svc = CALC[id];
  const m = svc.model;

  let total: number | null = null;
  let detail = "";
  if (m.kind === "hourly") { total = m.rate * staff * hours; detail = `${hours} hrs × ${staff} cleaner${staff > 1 ? "s" : ""} @ £${m.rate}/hr`; }
  else if (m.kind === "tiers") { total = m.tiers[tier].price; detail = m.tiers[tier].label; }
  else if (m.kind === "unit") { total = m.rate * qty; detail = `${qty} × £${m.rate}`; }

  function pick(next: string) {
    setId(next);
    setTier(0); setQty(1);
    const d = defaults(next);
    setHours(d.hours); setStaff(d.staff); setPreset(d.preset);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          name: f.name, phone: f.phone, email: f.email, postcode: f.postcode, date: "",
          service: svc.name,
          message: `${total !== null ? `Calculator estimate: £${total} (${detail})\n` : "Price on application\n"}${f.message}`,
        },
        EMAILJS_KEY
      );
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <aside id="quote" className="sp-quote" aria-label="Price calculator and quote request"
      style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1.5px solid #eef1f8", boxShadow: "0 8px 40px rgba(26,107,255,0.08)", position: "sticky", top: 100 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: "#0d1b3e", marginBottom: 16 }}>Instant price calculator</div>

      <label style={lbl} htmlFor="qp-service">SERVICE</label>
      <select id="qp-service" style={{ ...fld, marginBottom: 14 }} value={id} onChange={(e) => pick(e.target.value)}>
        {Object.entries(CALC).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
      </select>

      {m.kind === "hourly" && m.presets && (
        <div style={{ marginBottom: 14 }}>
          <label style={lbl} htmlFor="qp-size">NOT SURE HOW LONG? PICK YOUR PROPERTY SIZE</label>
          <select id="qp-size" style={fld} value={preset}
            onChange={(e) => {
              const i = +e.target.value;
              setPreset(i);
              if (i >= 0) { setHours(m.presets![i].hours); setStaff(m.presets![i].staff); }
            }}>
            <option value={-1}>Custom hours and cleaners</option>
            {m.presets.map((p, i) => (
              <option key={p.label} value={i}>{p.label}: about {p.hours} hrs, {p.staff} cleaner{p.staff > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
      )}
      {m.kind === "hourly" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div><span style={lbl}>HOURS</span><Stepper value={hours} min={m.minHours} max={m.maxHours} onChange={(n) => { setHours(n); setPreset(-1); }} /></div>
          <div><span style={lbl}>CLEANERS</span><Stepper value={staff} min={1} max={m.maxStaff} onChange={(n) => { setStaff(n); setPreset(-1); }} /></div>
        </div>
      )}
      {m.kind === "tiers" && (
        <div style={{ marginBottom: 14 }}>
          <label style={lbl} htmlFor="qp-tier">{m.label.toUpperCase()}</label>
          <select id="qp-tier" style={fld} value={tier} onChange={(e) => setTier(+e.target.value)}>
            {m.tiers.map((t, i) => <option key={t.label} value={i}>{t.label}</option>)}
          </select>
        </div>
      )}
      {m.kind === "unit" && (
        <div style={{ marginBottom: 14 }}><span style={lbl}>{m.unitLabel.toUpperCase()}</span><Stepper value={qty} min={1} max={m.max} onChange={setQty} /></div>
      )}

      <div style={{ background: "#f0f5ff", borderRadius: 12, padding: "14px 18px", marginBottom: 8 }}>
        <div style={lbl}>ESTIMATED PRICE</div>
        {total !== null ? (
          <>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#1a6bff", lineHeight: 1 }} aria-live="polite">£{total}</div>
            <div style={{ fontSize: 13, color: "#8a96b0", marginTop: 4 }}>{detail}</div>
          </>
        ) : (
          <div style={{ fontSize: 15, color: "#5a6782" }} aria-live="polite">Price on application. We’ll provide a tailored quote.</div>
        )}
      </div>
      <p style={{ fontSize: 12, color: "#9aa5be", marginBottom: 18 }}>* Indicative price. Final quote confirmed after a quick assessment. No deposit required.</p>

      {status === "sent" ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <div style={{ fontWeight: 700, color: "#0d1b3e" }}>Quote requested!</div>
          <p style={{ color: "#5a6782", fontSize: 14, marginTop: 6 }}>We’ll call or email you shortly.</p>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input style={fld} name="name" placeholder="Full name" required value={f.name} onChange={set("name")} autoComplete="name" />
          <input style={fld} name="phone" placeholder="Phone number" type="tel" required value={f.phone} onChange={set("phone")} autoComplete="tel" />
          <input style={fld} name="email" placeholder="Email address" type="email" value={f.email} onChange={set("email")} autoComplete="email" />
          <input style={fld} name="postcode" placeholder="Postcode" value={f.postcode} onChange={set("postcode")} autoComplete="postal-code" />
          <textarea style={{ ...fld, minHeight: 80, resize: "vertical" }} name="message" placeholder="Tell us about your requirements..." value={f.message} onChange={set("message")} />
          <button type="submit" disabled={status === "sending"}
            style={{ background: "#1a6bff", color: "#fff", border: "none", padding: "14px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: status === "sending" ? 0.7 : 1 }}>
            {status === "sending" ? "Sending..." : "Send quote request"}
          </button>
          {status === "error" && <p role="alert" style={{ fontSize: 13, color: "#dc2626" }}>Something went wrong. Please call 07305851573 or WhatsApp us.</p>}
          <p style={{ fontSize: 12, color: "#9aa5be", textAlign: "center" }}>No obligation. We’ll respond within a few hours.</p>
        </form>
      )}
    </aside>
  );
}
