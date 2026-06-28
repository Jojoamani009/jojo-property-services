"use client";
import { useState } from "react";
import {
  ShieldCheck, BadgeCheck, Clock, PoundSterling,
  Phone, Mail, MapPin, Star, CheckCircle2, Sparkles,
  Truck, Wrench, Home, Building2, Leaf, Flame, ChevronRight,
  Brush, Calculator, ArrowRight, Users, Award, ThumbsUp,
} from "lucide-react";

const BRAND = {
  name: "Jojo Cleaning & Clearance",
  phone: "07305851573",
  email: "info@jojocleaningservice.co.uk",
};

const QUOTE_SERVICES = [
  { label: "Domestic Cleaning",    rate: 20,  unit: "hr",   rateLabel: "£20/hr per cleaner" },
  { label: "Commercial Cleaning",  rate: 25,  unit: "hr",   rateLabel: "£25/hr per cleaner" },
  { label: "End of Tenancy Clean", rate: 25,  unit: "hr",   rateLabel: "£25/hr (min. £140)" },
  { label: "Carpet Deep Clean",    rate: 70,  unit: "room", rateLabel: "£70/room" },
  { label: "Oven Deep Clean",      rate: 60,  unit: "flat", rateLabel: "£60 flat" },
  { label: "Sofa Deep Clean",      rate: 30,  unit: "seat", rateLabel: "£30/sofa seat" },
];

const OTHER_SERVICES = [
  { label: "Man & Van / House Clearance", from: "POA" },
  { label: "Property Maintenance",        from: "POA" },
  { label: "Plumbing & Heating",          from: "POA" },
  { label: "Garden Maintenance",          from: "POA" },
  { label: "Painting & Decoration",       from: "POA" },
];

const services = [
  { icon: Home,         label: "Domestic Cleaning",     desc: "Regular or one-off cleans for homes of all sizes.",                        from: "£20/hr"   },
  { icon: Building2,    label: "End of Tenancy Clean",  desc: "Guaranteed deposit-back deep cleans.",                                      from: "£25/hr"   },
  { icon: CheckCircle2, label: "Commercial Cleaning",   desc: "Offices, retail, and commercial premises.",                                 from: "£25/hr"   },
  { icon: Truck,        label: "Man & Van",              desc: "Tip runs, collections, local moves.",                                       from: "POA"      },
  { icon: Home,         label: "House Clearance",       desc: "House, garage, shed & garden clearance — all disposed responsibly.",        from: "POA"      },
  { icon: Wrench,       label: "Plumbing & Heating",    desc: "Qualified tradespeople for leaks, taps, toilets, sinks & more.",            from: "POA"      },
  { icon: Leaf,         label: "Garden Maintenance",    desc: "Regular upkeep, fence installation & repair.",                              from: "POA"      },
  { icon: Brush,        label: "Painting & Decoration", desc: "All kinds of painting & decoration work to a high standard.",               from: "POA"      },
  { icon: Sparkles,     label: "Carpet & Upholstery",   desc: "Deep clean for carpets, sofas, mattresses.",                                from: "£70/room" },
];

const areas = ["Peterborough", "Wisbech", "March", "Market Deeping", "Bourne", "Stamford", "Whittlesey"];

const reviews = [
  { name: "Maria K.",     loc: "Peterborough",   stars: 5, text: "I was very happy with the service today. The upholstery, mattress, and sofa deep cleaning were done to a very high standard. Thank you for your excellent work." },
  { name: "Kat.",         loc: "March",          stars: 5, text: "Punctual, friendly and did an excellent job on an end of tenancy clean on a 2 bedroom apartment. Thank you." },
  { name: "Georgiana D.", loc: "Market Deeping", stars: 5, text: "Lovely service. Hard workers. Great experience all round." },
];

const trust = [
  { icon: ShieldCheck,   label: "Fully Insured"          },
  { icon: BadgeCheck,    label: "DBS Checked Staff"       },
  { icon: BadgeCheck,    label: "Waste Carrier Licensed"  },
  { icon: PoundSterling, label: "Transparent Pricing"     },
  { icon: Clock,         label: "Flexible Scheduling"     },
];

function QuoteCalc() {
  const [serviceIdx, setServiceIdx] = useState(0);
  const [qty, setQty] = useState(2);
  const [cleaners, setCleaners] = useState(1);

  const svc = QUOTE_SERVICES[serviceIdx];
  const isFlat   = svc.unit === "flat";
  const isHourly = svc.unit === "hr";
  const isRoom   = svc.unit === "room";
  const isSeat   = svc.unit === "seat";

  let total = 0;
  if (isFlat)        total = svc.rate;
  else if (isHourly) total = svc.rate * qty * cleaners;
  else               total = svc.rate * qty;

  const minEoT = svc.label === "End of Tenancy Clean" && total < 140;
  if (minEoT) total = 140;

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1.5px solid #e0e8ff", boxShadow: "0 12px 40px rgba(26,107,255,0.10)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
        <div style={{ background: "#e8f0ff", borderRadius: 8, padding: 8 }}>
          <Calculator size={20} color="#1a6bff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#0d1b3e" }}>Instant Price Calculator</span>
      </div>

      <label style={{ fontSize: 12, fontWeight: 600, color: "#8a96b0", textTransform: "uppercase", letterSpacing: "0.06em" }}>Service</label>
      <select
        value={serviceIdx}
        onChange={e => { setServiceIdx(+e.target.value); setQty(2); setCleaners(1); }}
        style={{ width: "100%", marginTop: 6, marginBottom: 16, border: "1.5px solid #dce3f0", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "inherit", color: "#0d1b3e", background: "#fff", outline: "none" }}>
        {QUOTE_SERVICES.map((s, i) => <option key={s.label} value={i}>{s.label} — {s.rateLabel}</option>)}
      </select>

      {!isFlat && (
        <div style={{ display: "grid", gridTemplateColumns: isHourly ? "1fr 1fr" : "1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#8a96b0", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {isHourly ? "Hours needed" : isRoom ? "Rooms" : "Sofa seats"}
            </label>
            <div style={{ display: "flex", alignItems: "center", marginTop: 6, border: "1.5px solid #dce3f0", borderRadius: 8, overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 42, background: "#f5f8ff", border: "none", fontSize: 20, cursor: "pointer", color: "#1a6bff", fontWeight: 700 }}>−</button>
              <span style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 42, background: "#f5f8ff", border: "none", fontSize: 20, cursor: "pointer", color: "#1a6bff", fontWeight: 700 }}>+</button>
            </div>
          </div>
          {isHourly && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#8a96b0", textTransform: "uppercase", letterSpacing: "0.06em" }}>Cleaners</label>
              <div style={{ display: "flex", alignItems: "center", marginTop: 6, border: "1.5px solid #dce3f0", borderRadius: 8, overflow: "hidden" }}>
                <button onClick={() => setCleaners(c => Math.max(1, c - 1))} style={{ width: 40, height: 42, background: "#f5f8ff", border: "none", fontSize: 20, cursor: "pointer", color: "#1a6bff", fontWeight: 700 }}>−</button>
                <span style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>{cleaners}</span>
                <button onClick={() => setCleaners(c => c + 1)} style={{ width: 40, height: 42, background: "#f5f8ff", border: "none", fontSize: 20, cursor: "pointer", color: "#1a6bff", fontWeight: 700 }}>+</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg, #e8f0ff, #f0f5ff)", borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#5a7abf", textTransform: "uppercase", letterSpacing: "0.06em" }}>Estimated price</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#1a6bff", lineHeight: 1.1, marginTop: 4 }}>
            {minEoT ? "from " : ""}£{total}
          </div>
          {isHourly && (
            <div style={{ fontSize: 12, color: "#7a90c0", marginTop: 3 }}>
              {qty} hr{qty !== 1 ? "s" : ""} × {cleaners} cleaner{cleaners !== 1 ? "s" : ""} @ £{svc.rate}/hr
            </div>
          )}
          {(isRoom || isSeat) && (
            <div style={{ fontSize: 12, color: "#7a90c0", marginTop: 3 }}>
              {qty} {svc.unit}{qty !== 1 ? "s" : ""} × £{svc.rate}
            </div>
          )}
        </div>
        <div style={{ background: "#1a6bff", borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle2 size={26} color="#fff" />
        </div>
      </div>

      <p style={{ fontSize: 12, color: "#9aa5be", marginBottom: 14, lineHeight: 1.5 }}>
        * Indicative price. Final quote confirmed after a quick assessment. No deposit required.
      </p>

      <a href="#contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "#1a6bff", color: "#fff", border: "none", borderRadius: 10, padding: "13px 0", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", textDecoration: "none" }}>
        Book This Service <ArrowRight size={16} />
      </a>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #eef1f8" }}>
        <p style={{ fontSize: 12, color: "#8a96b0", marginBottom: 8, fontWeight: 600 }}>Quote on request:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {OTHER_SERVICES.map(s => (
            <span key={s.label} style={{ fontSize: 11, background: "#f5f8ff", color: "#5a6782", borderRadius: 6, padding: "4px 9px", border: "1px solid #eef1f8" }}>{s.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FormData { name: string; phone: string; email: string; postcode: string; date: string; service: string; message: string; }
const EMPTY: FormData = { name: "", phone: "", email: "", postcode: "", date: "", service: "", message: "" };
const inp: React.CSSProperties = { width: "100%", border: "1.5px solid #dce3f0", borderRadius: 8, padding: "13px 16px", fontSize: 15, fontFamily: "inherit", color: "#1a1a2e", background: "#fff", outline: "none" };

function ContactForm() {
  const [f, setF] = useState<FormData>(EMPTY);
  const [done, setDone] = useState(false);
  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF(p => ({ ...p, [e.target.name]: e.target.value }));

  if (done) return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <CheckCircle2 size={52} color="#16a34a" style={{ margin: "0 auto 14px" }} />
      <h3 style={{ fontWeight: 700, fontSize: 18, color: "#0d1b3e" }}>Quote Requested!</h3>
      <p style={{ color: "#5a6782", marginTop: 8 }}>We'll call or email you shortly.</p>
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); setDone(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <input name="name"  placeholder="Full Name"    required value={f.name}  onChange={ch} style={inp} />
        <input name="phone" placeholder="Phone Number" required value={f.phone} onChange={ch} style={inp} />
      </div>
      <input name="email"    placeholder="Email Address"   type="email" value={f.email}    onChange={ch} style={inp} />
      <input name="postcode" placeholder="Postcode"                     value={f.postcode} onChange={ch} style={inp} />
      <input name="date"     placeholder="Date of Service" type="date"  value={f.date}     onChange={ch} style={inp} />
      <select name="service" value={f.service} onChange={ch} style={{ ...inp, color: f.service ? "#1a1a2e" : "#9aa5be" }}>
        <option value="">Select a Service</option>
        {[...QUOTE_SERVICES.map(s => s.label), ...OTHER_SERVICES.map(s => s.label)].map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <textarea name="message" placeholder="Tell us about your requirements..." rows={4} value={f.message} onChange={ch} style={{ ...inp, resize: "vertical", minHeight: 100 }} />
      <button type="submit" style={{ background: "#1a6bff", color: "#fff", border: "none", borderRadius: 8, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
        Send Quote Request
      </button>
      <p style={{ fontSize: 12, color: "#9aa5be", textAlign: "center" }}>No obligation. We'll respond within a few hours.</p>
    </form>
  );
}

export default function HomePage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a2e", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
        .section { padding: 80px 0; }
        .section-label { display: inline-block; background: #e8f0ff; color: #1a6bff; padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; margin-bottom: 14px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 800; line-height: 1.2; color: #0d1b3e; }
        .section-sub { font-size: 16px; color: #5a6782; margin-top: 12px; line-height: 1.65; }
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; }
        .btn-primary { background: #1a6bff; color: #fff; border: none; padding: 14px 28px; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: inherit; text-decoration: none; display: inline-block; transition: background 0.2s, transform 0.1s; }
        .btn-primary:hover { background: #0f55d4; transform: translateY(-1px); }
        .btn-ghost { background: rgba(255,255,255,0.12); color: #fff; border: 2px solid rgba(255,255,255,0.35); padding: 13px 26px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; text-decoration: none; display: inline-block; transition: background 0.2s; }
        .btn-ghost:hover { background: rgba(255,255,255,0.2); }
        .svc-card:hover { border-color: #1a6bff !important; box-shadow: 0 4px 20px rgba(26,107,255,0.09) !important; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #eef0f7", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "#1a6bff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#0d1b3e" }}>Jojo Property Services</span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Services", "Pricing", "Areas", "Reviews", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 14, fontWeight: 500, color: "#3d4a6b", textDecoration: "none" }}>{item}</a>
            ))}
            <a href="/booking" style={{ fontSize: 14, fontWeight: 500, color: "#1a6bff", textDecoration: "none" }}>Book Online</a>
          </div>
          <a href={`tel:${BRAND.phone}`} className="btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>
            <Phone size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />{BRAND.phone}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(140deg, #0a1530 0%, #0f2456 45%, #1a3a7a 100%)", padding: "88px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 420, height: 420, borderRadius: "50%", background: "rgba(26,107,255,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: "30%", width: 280, height: 280, borderRadius: "50%", background: "rgba(26,107,255,0.07)", pointerEvents: "none" }} />
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 56, alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.1)", color: "#93c5fd", padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 22 }}>
              <Star size={13} fill="#facc15" color="#facc15" /> Rated 5.0 · Peterborough's Trusted Specialist
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 58, fontWeight: 800, lineHeight: 1.12, color: "#fff", marginBottom: 22 }}>
              Professional<br />
              <span style={{ color: "#60a5fa" }}>Cleaning &</span><br />
              Property Services
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 480, marginBottom: 34 }}>
              Fully insured, DBS-checked specialists covering Peterborough and surrounding areas. From regular domestic cleans to full property clearances.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
              <a href="#contact" className="btn-primary">Get Free Quote</a>
              <a href="#services" className="btn-ghost">View Services</a>
            </div>
            <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
              {[
                { icon: Users,    val: "500+", label: "Happy Clients"    },
                { icon: Award,    val: "8+",   label: "Years Experience"  },
                { icon: ThumbsUp, val: "100%", label: "Insured & Vetted" },
              ].map(({ icon: Icon, val, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color="#60a5fa" />
                  </div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <QuoteCalc />
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "#f5f8ff", borderBottom: "1px solid #eef1f8", padding: "22px 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", alignItems: "center" }}>
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Icon size={18} color="#1a6bff" />
                <span style={{ fontWeight: 600, fontSize: 13.5, color: "#3d4a6b" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Everything Your Property Needs</h2>
            <p className="section-sub" style={{ maxWidth: 480, margin: "12px auto 0" }}>
              One trusted team for cleaning, maintenance, clearance, and trades — covering all bases.
            </p>
          </div>
          <div className="grid-3">
            {services.map(({ icon: Icon, label, desc, from }) => (
              <div key={label} className="svc-card"
                style={{ background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 16, padding: "26px 22px", transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default" }}>
                <div style={{ background: "#e8f0ff", width: 46, height: 46, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={22} color="#1a6bff" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#0d1b3e" }}>{label}</h3>
                <p style={{ fontSize: 13.5, color: "#7a8aaa", marginTop: 6, lineHeight: 1.6 }}>{desc}</p>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1a6bff" }}>From {from}</span>
                  <a href="#contact" style={{ fontSize: 13, color: "#8a96b0", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                    Book <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "#f5f8ff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div className="section-label">Simple Process</div>
            <h2 className="section-title">Book in 3 Easy Steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
            {[
              { step: "01", title: "Get a Quote",    desc: "Use our instant calculator above, or fill in the contact form for a bespoke quote." },
              { step: "02", title: "Pick a Date",    desc: "We'll confirm your preferred date and time — evenings and weekends available." },
              { step: "03", title: "We Do the Rest", desc: "Our vetted, insured team arrives on time and delivers spotless results." },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ textAlign: "center", padding: "32px 24px", background: "#fff", borderRadius: 16, border: "1.5px solid #eef1f8" }}>
                <div style={{ width: 56, height: 56, background: "#1a6bff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: "#fff" }}>
                  {step}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: "#0d1b3e", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#7a8aaa", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div className="section-label">Transparent Costs</div>
            <h2 className="section-title">Simple, Fair Pricing</h2>
            <p className="section-sub">No hidden fees. We'll provide a full itemised quote before any work begins.</p>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              {["No deposit required to book", "Pay after the job is done", "Free no-obligation quotes"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={18} color="#16a34a" />
                  <span style={{ fontSize: 15, color: "#3d4a6b" }}>{t}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-primary" style={{ marginTop: 28, textDecoration: "none" }}>Get Your Quote</a>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1.5px solid #eef1f8" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#0d1b3e" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", color: "#fff", fontWeight: 600, fontSize: 14 }}>Service</th>
                  <th style={{ padding: "16px 20px", textAlign: "right", color: "#fff", fontWeight: 600, fontSize: 14 }}>Starting From</th>
                </tr>
              </thead>
              <tbody>
                {([
                  ["Domestic Cleaning",      "£20/hr"        ],
                  ["Commercial Cleaning",    "£25/hr"        ],
                  ["End of Tenancy (1-bed)", "£140"          ],
                  ["Carpet Deep Clean",      "£70/room"      ],
                  ["Sofa Deep Clean",        "£30/sofa seat" ],
                  ["Oven Deep Clean",        "£60 flat"      ],
                  ["Painting & Decoration",  "£200/room"     ],
                ] as [string, string][]).map(([svc, price], i) => (
                  <tr key={svc} style={{ borderBottom: "1px solid #eef1f8", background: i % 2 === 1 ? "#fafbff" : "#fff" }}>
                    <td style={{ padding: "13px 20px", fontSize: 14, color: "#3d4a6b" }}>{svc}</td>
                    <td style={{ padding: "13px 20px", fontSize: 14, fontWeight: 700, color: "#1a6bff", textAlign: "right" }}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="section" id="areas" style={{ background: "#0d1b3e" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#93c5fd", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Coverage</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 800, color: "#fff" }}>Areas We Cover</h2>
          <p style={{ color: "#8a96b0", marginTop: 12, fontSize: 16 }}>Based in Peterborough, operating across the surrounding region.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 36 }}>
            {areas.map(area => (
              <div key={area} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", color: "#e2e8f5", borderRadius: 8, padding: "10px 22px", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 7 }}>
                <MapPin size={14} color="#60a5fa" />{area}
              </div>
            ))}
          </div>
          <p style={{ color: "#8a96b0", marginTop: 20, fontSize: 14 }}>
            Not listed? <a href="#contact" style={{ color: "#60a5fa", textDecoration: "underline" }}>Contact us</a> — we may still be able to help.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" id="reviews">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">Customer Reviews</div>
            <h2 className="section-title">What Our Clients Say</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#facc15" color="#facc15" />)}
              <span style={{ fontSize: 15, fontWeight: 700, color: "#0d1b3e", marginLeft: 6 }}>5.0 average rating</span>
            </div>
          </div>
          <div className="grid-3">
            {reviews.map(({ name, loc, stars, text }) => (
              <div key={name} style={{ background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 16, padding: 28 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: stars }).map((_, i) => <Star key={i} size={15} fill="#facc15" color="#facc15" />)}
                </div>
                <p style={{ fontSize: 15, color: "#3d4a6b", lineHeight: 1.65, fontStyle: "italic" }}>"{text}"</p>
                <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, background: "#e8f0ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#1a6bff" }}>{name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#0d1b3e" }}>{name}</div>
                    <div style={{ fontSize: 12, color: "#8a96b0" }}>{loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "linear-gradient(135deg, #1a6bff 0%, #0b3fa8 100%)", padding: "72px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 800, color: "#fff" }}>Ready for a Spotless Property?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginTop: 12, fontSize: 17 }}>Get a free, no-obligation quote today.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
            <a href="#contact" style={{ background: "#fff", color: "#1a6bff", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Get Free Quote</a>
            <a href={`tel:${BRAND.phone}`} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.45)", padding: "13px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={16} />{BRAND.phone}
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Request a Free Quote</h2>
            <p className="section-sub">Fill in the form and we'll get back to you within a few hours.</p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
              {([
                { icon: Phone,  text: BRAND.phone },
                { icon: Mail,   text: BRAND.email },
                { icon: MapPin, text: "Peterborough & surrounding areas" },
              ] as { icon: React.ElementType; text: string }[]).map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ background: "#e8f0ff", width: 38, height: 38, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color="#1a6bff" />
                  </div>
                  <span style={{ fontSize: 15, color: "#3d4a6b" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 20, padding: 36 }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0d1b3e", padding: "40px 0 28px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, background: "#1a6bff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>Jojo Property Services Ltd</span>
            </div>
            <p style={{ fontSize: 13, color: "#8a96b0" }}>Registered Company · Fully Insured · Waste Carrier Licensed</p>
            <p style={{ fontSize: 13, color: "#8a96b0" }}>© {new Date().getFullYear()} Jojo Property Services Ltd</p>
          </div>
        </div>
      </footer>
    </div>
  );
}