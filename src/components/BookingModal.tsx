"use client";

import { useState, useEffect } from "react";
import {
  X, ChevronRight, ChevronLeft, Clock, Users, Calendar,
  CheckCircle2, Sparkles, Home, Building2, Flame, Truck,
  Wrench, Leaf, Star, Info, Plus, Minus, MapPin, Phone, Mail,
} from "lucide-react";

// ─── Service catalogue ────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "domestic",
  icon: Home,
  label: "Domestic Cleaning",
  desc: "Regular or one-off home clean",
  type: "hourly",
  ratePerCleaner: 20,
  minHours: 2,
  maxHours: 8,
  minCleaners: 1,
  maxCleaners: 4,
  color: "#1a6bff",
  bg: "#e8f0ff",
  },
  {
    id: "commercial",
    icon: Building2,
    label: "Commercial Cleaning",
    desc: "Offices, retail & workplaces",
    type: "hourly",
    ratePerCleaner: 25,
    minHours: 3,
    maxHours: 12,
    minCleaners: 1,
    maxCleaners: 10,
    color: "#0891b2",
    bg: "#e0f2fe",
  },
  {
    id: "endoftenancy",
    icon: CheckCircle2,
    label: "End of Tenancy",
    desc: "Guaranteed deposit-back clean. One Bedroom house/flat end of tenancy, from £140",
    type: "fixed",
    basePrice: 140,
    extraPerCleaner: 40,
    minCleaners: 1,
    maxCleaners: 3,
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  {
    id: "carpet",
    icon: Sparkles,
    label: "Carpet & Upholstery",
    desc: "Deep extraction cleaning",
    type: "perRoom",
    ratePerRoom: 70,
    minRooms: 1,
    maxRooms: 10,
    minCleaners: 1,
    maxCleaners: 2,
    color: "#059669",
    bg: "#d1fae5",
  },
  {
    id: "oven",
    icon: Flame,
    label: "Oven Cleaning",
    desc: "Professional degreasing. standard oven: £60, double range: £75",
    type: "fixed",
    basePrice: 60,
    extraPerCleaner: 0,
    minCleaners: 1,
    maxCleaners: 2,
    color: "#dc2626",
    bg: "#fee2e2",
  },
  {
    id: "manvan",
    icon: Truck,
    label: "Man & Van",
    desc: "Local moves & collections",
    type: "poa",
    minCleaner: 1,
    maxCleaner: 2,
    color: "#d97706",
    bg: "#fef3c7",
  },
  {
    id: "clearance",
  icon: Home,
  label: "House Clearance",
  desc: "Garage, shed & garden cleared",
  type: "poa",
  minCleaners: 2,
  maxCleaners: 5,
  color: "#0f766e",
  bg: "#ccfbf1",
  },
  {
    id: "maintenance",
  icon: Wrench,
  label: "Property Maintenance",
  desc: "General repairs, garden maintenance & upkeep",
  type: "poa",
  minCleaner: 1,
  maxCleaner: 3,
  color: "#4f46e5",
  bg: "#e0e7ff",
  },
  {
    id: "plumbing",
  icon: Leaf,
  label: "Plumbing & Heating",
  desc: "Qualified tradespeople",
  type: "poa",
  minCleaner: 1,
  maxCleaner: 2,
  color: "#be185d",
  bg: "#fce7f3",
  },
];

const ADDONS = [
  { id: "linen hire & laundry", label: "Linen hire & laundry for (2bedroom)", price: 50 },
  { id: "linen hire & laundry service", label: "Linen hire & laundry for (3bedroom)", price: 75 },
  { id: "linen hire", label: "Linen hire & laundry for (4bedroom)", price: 100 },
  { id: "weekend", label: "Weekend / Bank Holiday Rate", price: 15 },
  { id: "express", label: "Same-Day / Express Booking", price: 25 },
  { id: "keys", label: "Key Collection & Return", price: 20 },
];

type Service = (typeof SERVICES)[number];

function calcPrice(svc: Service, hours: number, cleaners: number, rooms: number, addons: string[]) {
  let base = 0;
  if (svc.type === "hourly") {
    base = (svc as any).ratePerCleaner * cleaners * hours;
  } else if (svc.type === "fixed") {
    base = (svc as any).basePrice + (svc as any).extraPerCleaner * (cleaners - 1);
  } else if (svc.type === "perRoom") {
    base = (svc as any).ratePerRoom * rooms;
  }
  const addonTotal = addons.reduce((sum, id) => {
    const a = ADDONS.find((x) => x.id === id);
    return sum + (a ? a.price : 0);
  }, 0);
  return { base, addons: addonTotal, total: base + addonTotal };
}

// ─── Today + 60 days date helpers ────────────────────────────────────────────
function getDates() {
  const dates: { label: string; value: string; day: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const value = d.toISOString().split("T")[0];
    const day = d.toLocaleDateString("en-GB", { weekday: "short" });
    const label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    dates.push({ value, label, day });
  }
  return dates;
}

const TIMES = [
  "07:00","08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00",
];

// ─── Stepper counter ──────────────────────────────────────────────────────────
function Counter({ value, min, max, onChange, label }: {
  value: number; min: number; max: number;
  onChange: (n: number) => void; label: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 14, color: "#5a6782", flex: 1 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 0, background: "#f5f8ff", borderRadius: 10, overflow: "hidden", border: "1.5px solid #dce3f0" }}>
        <button onClick={() => onChange(Math.max(min, value - 1))}
          style={{ width: 36, height: 36, background: "none", border: "none", cursor: value <= min ? "default" : "pointer", color: value <= min ? "#c0cce0" : "#1a6bff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Minus size={15} />
        </button>
        <span style={{ width: 36, textAlign: "center", fontWeight: 700, fontSize: 15, color: "#0d1b3e" }}>{value}</span>
        <button onClick={() => onChange(Math.min(max, value + 1))}
          style={{ width: 36, height: 36, background: "none", border: "none", cursor: value >= max ? "default" : "pointer", color: value >= max ? "#c0cce0" : "#1a6bff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Plus size={15} />
        </button>
      </div>
      <span style={{ fontSize: 13, color: "#8a96b0", minWidth: 48, textAlign: "right" }}>
        {label === "Cleaners" ? `×${value}` : label === "Rooms" ? `${value} rm` : `${value} hr`}
      </span>
    </div>
  );
}

// ─── Price summary pill ───────────────────────────────────────────────────────
function PriceSummary({ base, addonsTotal, total, type, rate, cleaners, hours, rooms }: any) {
  return (
    <div style={{ background: "linear-gradient(135deg,#1a6bff,#0f4ac4)", borderRadius: 16, padding: "20px 24px", color: "#fff", marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 4 }}>Estimated Total</div>
          <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>£{total.toFixed(2)}</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
            {type === "hourly" && `£${rate}/hr × ${cleaners} cleaner${cleaners > 1 ? "s" : ""} × ${hours} hr${hours > 1 ? "s" : ""}`}
            {type === "fixed" && "Fixed price service"}
            {type === "perRoom" && `£${rate}/room × ${rooms} room${rooms > 1 ? "s" : ""}`}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Base</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>£{base.toFixed(2)}</div>
          {addonsTotal > 0 && (
            <>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Add-ons</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>+£{addonsTotal.toFixed(2)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main booking flow ────────────────────────────────────────────────────────
export default function BookingModal({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(1); // 1=service 2=config 3=datetime 4=details 5=confirm
  const [selected, setSelected] = useState<Service | null>(null);
  const [hours, setHours] = useState(3);
  const [cleaners, setCleaners] = useState(1);
  const [rooms, setRooms] = useState(2);
  const [addons, setAddons] = useState<string[]>([]);
  const [date, setDate] = useState(getDates()[1].value);
  const [time, setTime] = useState("09:00");
  const [details, setDetails] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const dates = getDates();
  const price = selected ? calcPrice(selected, hours, cleaners, rooms, addons) : null;

  // reset config when service changes
  useEffect(() => {
    if (!selected) return;
    setHours((selected as any).minHours ?? 1);
    setCleaners((selected as any).minCleaners ?? 1);
    setRooms(1);
    setAddons([]);
  }, [selected]);

  const toggleAddon = (id: string) =>
    setAddons((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const STEPS = ["Service", "Configure", "Date & Time", "Your Details", "Confirm"];

  const canNext = () => {
    if (step === 1) return !!selected;
    if (step === 4) return details.name && details.phone && details.address;
    return true;
  };

  const handleSubmit = () => setSubmitted(true);

  // ── Confirmed screen ──
  if (submitted) {
    return (
      <div style={modalWrap}>
        <div style={{ ...modalBox, maxWidth: 520, textAlign: "center", padding: "56px 40px" }}>
          <div style={{ width: 72, height: 72, background: "#d1fae5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle2 size={36} color="#059669" />
          </div>
          <h2 style={heading}>Booking Confirmed!</h2>
          <p style={{ color: "#5a6782", marginTop: 12, lineHeight: 1.65, fontSize: 15 }}>
            Thanks, <strong>{details.name}</strong>! Your {selected?.label} booking is confirmed for{" "}
            <strong>{new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</strong> at <strong>{time}</strong>.
          </p>
          <div style={{ background: "#f5f8ff", borderRadius: 12, padding: "16px 20px", marginTop: 24, textAlign: "left" }}>
            {[
              ["Service", selected?.label],
              ["Date", new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })],
              ["Time", time],
              ["Address", details.address],
              ["Total", `£${price?.total.toFixed(2)}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "5px 0", borderBottom: "1px solid #eef1f8" }}>
                <span style={{ color: "#8a96b0" }}>{k}</span>
                <span style={{ fontWeight: 600, color: "#0d1b3e" }}>{v}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#8a96b0", marginTop: 16 }}>A confirmation will be sent to <strong>{details.email || details.phone}</strong>.</p>
          <button onClick={onClose} style={{ ...primaryBtn, marginTop: 28, width: "100%" }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div style={modalWrap}>
      <div style={modalBox}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "#1a6bff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#0d1b3e", fontFamily: "serif" }}>Book a Service</span>
          </div>
          {onClose && (
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#8a96b0", padding: 4 }}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Progress */}
        <div style={{ padding: "16px 28px 0" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i + 1 <= step ? "#1a6bff" : "#eef1f8", transition: "background 0.3s" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {STEPS.map((s, i) => (
              <span key={s} style={{ fontSize: 11, color: i + 1 === step ? "#1a6bff" : i + 1 < step ? "#7a8aaa" : "#c0cce0", fontWeight: i + 1 === step ? 700 : 400 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", overflowY: "auto", maxHeight: "calc(100vh - 280px)" }}>

          {/* STEP 1: Service selection */}
          {step === 1 && (
            <div>
              <h3 style={stepTitle}>What service do you need?</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
                {SERVICES.map((svc) => {
                  const Icon = svc.icon;
                  const active = selected?.id === svc.id;
                  return (
                    <button key={svc.id} onClick={() => setSelected(svc)}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", border: `2px solid ${active ? svc.color : "#eef1f8"}`, borderRadius: 12, background: active ? svc.bg : "#fff", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                      <div style={{ width: 36, height: 36, background: svc.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={18} color={svc.color} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "#0d1b3e" }}>{svc.label}</div>
                        <div style={{ fontSize: 12, color: "#8a96b0", marginTop: 2 }}>{svc.desc}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: svc.color, marginTop: 4 }}>
                          {svc.type === "hourly" && `£${(svc as any).ratePerCleaner}/hr per cleaner`}
                          {svc.type === "fixed" && `From £${(svc as any).basePrice}`}
                          {svc.type === "perRoom" && `£${(svc as any).ratePerRoom}/room`}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Configure */}
          {step === 2 && selected && (
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, background: selected.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <selected.icon size={22} color={selected.color} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0d1b3e" }}>{selected.label}</h3>
                  <p style={{ fontSize: 13, color: "#8a96b0" }}>{selected.desc}</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Hourly controls */}
                {selected.type === "hourly" && (
                  <div style={configCard}>
                    <div style={configLabel}><Clock size={14} /> Duration</div>
                    <Counter value={hours} min={(selected as any).minHours} max={(selected as any).maxHours} onChange={setHours} label="Hours" />
                  </div>
                )}

                {/* Per-room control */}
                {selected.type === "perRoom" && (
                  <div style={configCard}>
                    <div style={configLabel}><Home size={14} /> Rooms / Areas</div>
                    <Counter value={rooms} min={1} max={(selected as any).maxRooms} onChange={setRooms} label="Rooms" />
                  </div>
                )}

                {/* Cleaners */}
                <div style={configCard}>
                  <div style={configLabel}><Users size={14} /> Number of Cleaners</div>
                 <Counter value={cleaners ?? selected.minCleaners ?? 1} min={selected.minCleaners ?? 1} max={selected.maxCleaners ?? 10} onChange={setCleaners} label="Cleaners" />                  
                 {(cleaners ?? 0) > 1 && (
                    <div style={{ fontSize: 12, color: "#059669", marginTop: 8, display: "flex", gap: 5, alignItems: "center" }}>
                      <CheckCircle2 size={12} /> {cleaners} cleaners — job completed ~{Math.ceil(1 / cleaners * 100)}% faster
                    </div>
                  )}
                </div>

                {/* Add-ons */}
                <div style={configCard}>
                  <div style={configLabel}><Star size={14} /> Add-ons (optional)</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                    {ADDONS.map((a) => (
                      <label key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                        <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggleAddon(a.id)}
                          style={{ width: 16, height: 16, accentColor: "#1a6bff" }} />
                        <span style={{ fontSize: 14, color: "#3d4a6b", flex: 1 }}>{a.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1a6bff" }}>+£{a.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live price */}
              {price && (
                <div style={{ marginTop: 16 }}>
                  <PriceSummary
                    base={price.base}
                    addonsTotal={price.addons}
                    total={price.total}
                    type={selected.type}
                    rate={selected.type === "hourly" ? (selected as any).ratePerCleaner : (selected as any).ratePerRoom}
                    cleaners={cleaners}
                    hours={hours}
                    rooms={rooms}
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Date & Time */}
          {step === 3 && (
            <div>
              <h3 style={stepTitle}>When would you like us?</h3>

              {/* Date scroll */}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#5a6782", marginBottom: 10 }}>Select a Date</div>
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
                  {dates.map((d) => (
                    <button key={d.value} onClick={() => setDate(d.value)}
                      style={{ flexShrink: 0, width: 60, padding: "10px 6px", border: `2px solid ${date === d.value ? "#1a6bff" : "#eef1f8"}`, borderRadius: 12, background: date === d.value ? "#e8f0ff" : "#fff", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
                      <div style={{ fontSize: 11, color: date === d.value ? "#1a6bff" : "#8a96b0", fontWeight: 600 }}>{d.day}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: date === d.value ? "#1a6bff" : "#0d1b3e", marginTop: 2 }}>{d.label.split(" ")[0]}</div>
                      <div style={{ fontSize: 11, color: date === d.value ? "#1a6bff" : "#8a96b0" }}>{d.label.split(" ")[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time grid */}
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#5a6782", marginBottom: 10 }}>Select a Start Time</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                  {TIMES.map((t) => (
                    <button key={t} onClick={() => setTime(t)}
                      style={{ padding: "10px 0", border: `2px solid ${time === t ? "#1a6bff" : "#eef1f8"}`, borderRadius: 10, background: time === t ? "#e8f0ff" : "#fff", cursor: "pointer", fontWeight: time === t ? 700 : 500, fontSize: 14, color: time === t ? "#1a6bff" : "#3d4a6b", transition: "all 0.15s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary pill */}
              <div style={{ marginTop: 20, background: "#f5f8ff", borderRadius: 12, padding: "14px 18px", display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 14, color: "#3d4a6b" }}>
                  <Calendar size={15} color="#1a6bff" />
                  <strong>{new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</strong>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 14, color: "#3d4a6b" }}>
                  <Clock size={15} color="#1a6bff" />
                  <strong>{time}</strong>
                  {selected?.type === "hourly" && <span style={{ color: "#8a96b0" }}>→ est. finish {
                    (() => {
                      const [h, m] = time.split(":").map(Number);
                      const end = new Date();
                      end.setHours(h + hours, m);
                      return end.toTimeString().slice(0, 5);
                    })()
                  }</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Customer details */}
          {step === 4 && (
            <div>
              <h3 style={stepTitle}>Your Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={inputLabel}>Full Name *</label>
                    <input style={inputStyle} placeholder="Jane Smith" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={inputLabel}>Phone *</label>
                    <input style={inputStyle} placeholder="07700 000000" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={inputLabel}>Email</label>
                  <input style={inputStyle} type="email" placeholder="jane@example.com" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                </div>
                <div>
                  <label style={inputLabel}>Property Address *</label>
                  <input style={inputStyle} placeholder="12 High Street, Peterborough, PE1 1AA" value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} />
                </div>
                <div>
                  <label style={inputLabel}>Special Instructions <span style={{ color: "#b0bcd0" }}>(optional)</span></label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} placeholder="e.g. access codes, pets, areas to focus on..." value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Confirm */}
          {step === 5 && selected && price && (
            <div>
              <h3 style={stepTitle}>Review Your Booking</h3>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {/* Service block */}
                <div style={reviewCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, background: selected.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <selected.icon size={18} color={selected.color} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#0d1b3e" }}>{selected.label}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {selected.type === "hourly" && <ReviewRow label="Duration" value={`${hours} hour${hours > 1 ? "s" : ""}`} />}
                    {selected.type === "perRoom" && <ReviewRow label="Rooms" value={`${rooms} room${rooms > 1 ? "s" : ""}`} />}
                    <ReviewRow label="Cleaners" value={`${cleaners} cleaner${cleaners > 1 ? "s" : ""}`} />
                    {addons.length > 0 && <ReviewRow label="Add-ons" value={addons.map((id) => ADDONS.find((a) => a.id === id)?.label).join(", ")} />}
                  </div>
                </div>

                {/* Datetime block */}
                <div style={reviewCard}>
                  <ReviewRow icon={<Calendar size={14} />} label="Date" value={new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} />
                  <ReviewRow icon={<Clock size={14} />} label="Time" value={time} />
                </div>

                {/* Address */}
                <div style={reviewCard}>
                  <ReviewRow icon={<MapPin size={14} />} label="Address" value={details.address} />
                  <ReviewRow icon={<Phone size={14} />} label="Phone" value={details.phone} />
                  {details.email && <ReviewRow icon={<Mail size={14} />} label="Email" value={details.email} />}
                </div>

                {/* Price breakdown */}
                <PriceSummary
                  base={price.base}
                  addonsTotal={price.addons}
                  total={price.total}
                  type={selected.type}
                  rate={selected.type === "hourly" ? (selected as any).ratePerCleaner : (selected as any).ratePerRoom}
                  cleaners={cleaners}
                  hours={hours}
                  rooms={rooms}
                />

                <div style={{ display: "flex", gap: 6, alignItems: "flex-start", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 14px", marginTop: 4 }}>
                  <Info size={14} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: "#92400e", lineHeight: 1.55 }}>
                    This is an estimated price. Final cost confirmed before work begins. Payment due on completion.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div style={{ padding: "16px 28px 24px", borderTop: "1px solid #eef1f8", display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1.5px solid #dce3f0", borderRadius: 8, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: step === 1 ? "default" : "pointer", color: step === 1 ? "#c0cce0" : "#3d4a6b", fontFamily: "inherit" }}>
            <ChevronLeft size={16} /> Back
          </button>

          {/* Live price badge mid-nav */}
          {price && step > 1 && step < 5 && (
            <div style={{ background: "#e8f0ff", borderRadius: 8, padding: "8px 14px", fontSize: 14, fontWeight: 700, color: "#1a6bff" }}>
              £{price.total.toFixed(2)}
            </div>
          )}

          {step < 5 ? (
            <button onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              style={{ ...primaryBtn, opacity: canNext() ? 1 : 0.45, cursor: canNext() ? "pointer" : "default", display: "flex", alignItems: "center", gap: 6 }}>
              {step === 4 ? "Review Booking" : "Continue"} <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} style={{ ...primaryBtn, background: "#059669", display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle2 size={16} /> Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ReviewRow({ label, value, icon }: { label: string; value?: string; icon?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13, padding: "4px 0", borderBottom: "1px solid #f0f3f9" }}>
      <span style={{ color: "#8a96b0", display: "flex", alignItems: "center", gap: 5 }}>{icon}{label}</span>
      <span style={{ fontWeight: 600, color: "#0d1b3e", textAlign: "right", maxWidth: "60%" }}>{value}</span>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const modalWrap: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(13,27,62,0.55)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 1000, padding: 16,
};
const modalBox: React.CSSProperties = {
  background: "#fff", borderRadius: 20, width: "100%", maxWidth: 680,
  boxShadow: "0 24px 80px rgba(13,27,62,0.18)", display: "flex",
  flexDirection: "column", maxHeight: "95vh", overflow: "hidden",
  fontFamily: "'DM Sans', sans-serif",
};
const heading: React.CSSProperties = { fontFamily: "serif", fontSize: 26, fontWeight: 700, color: "#0d1b3e" };
const stepTitle: React.CSSProperties = { fontSize: 18, fontWeight: 700, color: "#0d1b3e" };
const configCard: React.CSSProperties = { background: "#fafbff", border: "1.5px solid #eef1f8", borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 };
const configLabel: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "#5a6782", display: "flex", alignItems: "center", gap: 6 };
const reviewCard: React.CSSProperties = { background: "#fafbff", border: "1.5px solid #eef1f8", borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 };
const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #dce3f0", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "inherit", color: "#1a1a2e", background: "#fff", outline: "none" };
const inputLabel: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "#5a6782", display: "block", marginBottom: 6 };
const primaryBtn: React.CSSProperties = { background: "#1a6bff", color: "#fff", border: "none", padding: "11px 22px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };
