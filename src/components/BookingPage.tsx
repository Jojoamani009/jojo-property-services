"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";
import {
  Home, Building2, CheckCircle2, Sparkles, Flame,
  Truck, Wrench, Leaf, Star, ArrowRight,
} from "lucide-react";

const CARDS = [
  { icon: Home,         label: "Domestic Cleaning",     badge: "Most Popular", rate: "£20/hr per cleaner", color: "#1a6bff", bg: "#e8f0ff" },
  { icon: Building2,   label: "Commercial Cleaning",    badge: null,           rate: "£25/hr per cleaner", color: "#0891b2", bg: "#e0f2fe" },
  { icon: CheckCircle2,label: "End of Tenancy",         badge: "Fixed Price",  rate: "From £140",          color: "#7c3aed", bg: "#ede9fe" },
  { icon: Sparkles,    label: "Carpet & Upholstery",    badge: null,           rate: "£70/room",           color: "#059669", bg: "#d1fae5" },
  { icon: Flame,       label: "Oven Cleaning",          badge: "Fixed Price",  rate: "£60 flat",           color: "#dc2626", bg: "#fee2e2" },
  { icon: Truck,       label: "Man & Van",              badge: null,           rate: "£45/hr per person",  color: "#d97706", bg: "#fef3c7" },
  { icon: Home,        label: "House Clearance",        badge: null,           rate: "£30/hr per cleaner", color: "#0f766e", bg: "#ccfbf1" },
  { icon: Wrench,      label: "Property Maintenance",   badge: null,           rate: "£35/hr per person",  color: "#4f46e5", bg: "#e0e7ff" },
  { icon: Leaf,        label: "Plumbing & Heating",     badge: null,           rate: "£65/hr per tradesperson", color: "#be185d", bg: "#fce7f3" },
];

export default function BookingPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f5f8ff; }
        .card:hover .arrow { transform: translateX(3px); }
      `}</style>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#0d1b3e,#1a3a7a)", padding: "64px 24px 56px", textAlign: "center" }}>
        <span style={{ background: "rgba(255,255,255,0.12)", color: "#93c5fd", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
          Instant Online Booking
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color: "#fff", marginTop: 16, lineHeight: 1.15 }}>
          Book a Service Online
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginTop: 14, maxWidth: 520, margin: "14px auto 0", lineHeight: 1.65 }}>
          Choose your service, pick your date & time, and get an instant price — no phone calls needed.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
          {["Instant Price Calculator", "Live Availability", "No Deposit Required"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle2 size={14} color="#4ade80" /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 24px 80px" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "#0d1b3e", marginBottom: 28 }}>
          Our Services
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {CARDS.map(({ icon: Icon, label, badge, rate, color, bg }) => (
            <div key={label} className="card"
              style={{ background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 16, padding: "24px 22px", display: "flex", flexDirection: "column", gap: 0, transition: "box-shadow 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 4px 24px ${color}22`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eef1f8"; e.currentTarget.style.boxShadow = "none"; }}>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ width: 48, height: 48, background: bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={24} color={color} />
                </div>
                {badge && (
                  <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                    {badge}
                  </span>
                )}
              </div>

              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0d1b3e", marginTop: 16 }}>{label}</h3>

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                <Star size={13} fill="#facc15" color="#facc15" />
                <Star size={13} fill="#facc15" color="#facc15" />
                <Star size={13} fill="#facc15" color="#facc15" />
                <Star size={13} fill="#facc15" color="#facc15" />
                <Star size={13} fill="#facc15" color="#facc15" />
                <span style={{ fontSize: 12, color: "#8a96b0", marginLeft: 2 }}>5.0</span>
              </div>

              <div style={{ marginTop: 12, padding: "10px 14px", background: "#f5f8ff", borderRadius: 8, fontSize: 13, fontWeight: 700, color }}>
                {rate}
              </div>

              <button onClick={() => setOpen(true)}
                style={{ marginTop: 16, width: "100%", background: color, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
                Book Now
                <span className="arrow" style={{ transition: "transform 0.2s", display: "flex" }}>
                  <ArrowRight size={15} />
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {open && <BookingModal onClose={() => setOpen(false)} />}
    </>
  );
}
