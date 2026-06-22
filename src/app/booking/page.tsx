"use client";
import Link from "next/link";
// Replace any "Book Now" button with:
import Image from "next/image";
<Link href="/booking" className="btn-primary">
  Book Now
</Link>

import { useState } from "react";
import {
  ShieldCheck, BadgeCheck, Clock, PoundSterling,
  Phone, Mail, MapPin, Star, CheckCircle2, Sparkles,
  Truck, Wrench, Home, Building2, Leaf, Flame, ChevronRight,
  Hammer,
  Brush,
} from "lucide-react";

const BRAND = {
  name: "Jojo Cleaning & Clearance",
  phone: "07305851573",
  email: "info@jojocleaningservice.co.uk",
};

const services = [
  { icon: Home,        label: "Property Maintenance",     desc: "General repairs/fixes, assembly & disassembly services, tv wall installation etc",         from: "POA"   },
  { icon: Building2,   label: "End of Tenancy Clean",    desc: "Guaranteed deposit-back end of tenancy/one-off deep clean",          from: "£25/hr"   },
  { icon: CheckCircle2,label: "Domestic Clean",         desc: "Regular, flexible private property clean. | Other Services includes: Carpet & Upholstery deep clean & Oven Deep Clean (Charges separately for these other services)",         from: "£20/hr"     },
  { icon: Sparkles,    label: "Commercial Clean",    desc: "Regular, flexible offices and retail property clean. Other Services includes: Carpet & Upholstery deep clean & Oven Deep Clean",     from: "£27/hr" },
  { icon: Truck,       label: "Man & Van",              desc: "Tip run, Pick-up & Drop off, Local moves & collections",             from: "POA"      },
  { icon: Home,        label: "House Clearance",        desc: "House, Garage, Shed & Garden clearance, and disposed responsibly",         from: "POA"      },
  { icon: Home,        label: "Garden Maintainance",   desc: "Regular garden maintenance & fences installation/repair",             from: "POA"      },
  { icon: Wrench,      label: "Plumbing & Heating",     desc: "Qualified & reliable tradespeople for all plumbing works, such as bathroom tap/toilet/sink leaks & fixes,",     from: "POA"      },
  { icon: Brush,       label: "Painting & Decoration",  desc: "Qualified & reliable tradespeople for all kinds of painting & decoration work,",     from: "POA"      },

];

const areas = ["Peterborough", "Wisbech", "March", "Market Deeping", "Bourne", "Stamford", "Whittlesey"];

const reviews = [
  { name: "Maria K.", loc: "Peterborough", stars: 5, text: "I was very happy with the service today. The upholstery, mattress, and sofa deep cleaning were done to a very high standard, and everything looks and feels much cleaner. Thank you for your excellent work." },
  { name: "Kat.", loc: "March",        stars: 5, text: "Punctual, friendly and did an excellent job on an end of tenancy clean on a 2 bedroom apartment. Thank you" },
  { name: "Geoprgiana D.", loc: "Market Deeping",stars: 5, text: "Lovely service. Hard workers. Great experience all round"},
];

const trustItems = [
  { icon: ShieldCheck,   label: "Fully Insured"        },
  { icon: BadgeCheck,    label: "DBS Checked Staff"    },
  { icon: BadgeCheck,    label: "Waste Disposal Registered" },
  { icon: PoundSterling, label: "Transparent Pricing"  },
  { icon: Clock,         label: "Flexible Scheduling"  },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  date: string;
  service: string;
  message: string;
}

const EMPTY_FORM: FormData = { name: "", phone: "", email: "", postcode: "", date: "", service: "", message: "",};

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a2e", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .btn-primary {
          background: #1a6bff; color: #fff; border: none;
          padding: 14px 28px; border-radius: 8px; font-size: 15px;
          font-weight: 600; cursor: pointer; font-family: inherit;
          transition: background 0.2s, transform 0.1s;
        }
        .btn-primary:hover { background: #0f55d4; transform: translateY(-1px); }
        .btn-outline {
          background: transparent; color: #1a6bff;
          border: 2px solid #1a6bff; padding: 12px 26px;
          border-radius: 8px; font-size: 15px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          transition: background 0.2s, color 0.2s;
        }
        .btn-outline:hover { background: #1a6bff; color: #fff; }
        .section { padding: 72px 0; }
        .container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
        .section-label {
          display: inline-block; background: #e8f0ff; color: #1a6bff;
          padding: 5px 14px; border-radius: 20px; font-size: 13px;
          font-weight: 600; letter-spacing: 0.04em; margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif; font-size: 38px;
          font-weight: 700; line-height: 1.2; color: #0d1b3e;
        }
        .section-sub { font-size: 16px; color: #5a6782; margin-top: 12px; line-height: 1.6; }
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
        input, textarea, select {
          width: 100%; border: 1.5px solid #dce3f0; border-radius: 8px;
          padding: 13px 16px; font-size: 15px; font-family: inherit;
          color: #1a1a2e; background: #fff; outline: none;
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus, select:focus { border-color: #1a6bff; }
        textarea { resize: vertical; min-height: 120px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", borderBottom: "1px solid #eef0f7", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "#1a6bff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#0d1b3e" }}>
              Jojo Property Services
            </span>
          </div>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Services", "Pricing", "Areas", "Reviews", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 14, fontWeight: 500, color: "#3d4a6b", textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>

          <a href={`tel:${BRAND.phone}`} className="btn-primary" style={{ padding: "10px 20px", fontSize: 14, textDecoration: "none" }}>
            <Phone size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />
            {BRAND.phone}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #f0f5ff 0%, #fafbff 60%, #e8f4f8 100%)", padding: "80px 0 72px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: 60, alignItems: "center" }}>
          <div>
            <div className="section-label">Peterborough's Trusted Property service Specialist</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 65, fontWeight: 700, lineHeight: 1.15, color: "#0d1b3e", marginTop: 4 }}>
              Professional Property Services - Cleaning, Maintenance & More!
              
            </h1>
            <p style={{ fontSize: 17, color: "#5a6782", marginTop: 20, lineHeight: 1.7, maxWidth: 520 }}>
              Fully insured, DBS-checked specialists serving Peterborough and surrounding areas. From regular domestic cleans to full property clearances — spotless results every time.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <a href="#contact" className="btn-primary">Get Free Quote</a>
              <a href="#services" className="btn-outline">View Services</a>
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>
              {[{ val: "500+", label: "Happy Clients" }, { val: "8+", label: "Years Experience" }, { val: "100%", label: "Insured & Vetted" }].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#1a6bff", fontFamily: "'Playfair Display', serif" }}>{val}</div>
                  <div style={{ fontSize: 13, color: "#8a96b0", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Quick Quote Card */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 8px 40px rgba(26,107,255,0.10)", border: "1px solid #eef1f8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ background: "#e8f0ff", borderRadius: 8, padding: 8 }}>
                <Sparkles size={20} color="#1a6bff" />
              </div>
              <span style={{ fontWeight: 600, fontSize: 15, color: "#0d1b3e" }}>Quick Quote</span>
            </div>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <CheckCircle2 size={48} color="#16a34a" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontWeight: 600, fontSize: 16, color: "#0d1b3e" }}>Thanks! We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
                <input name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
                <input name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                <input name="postcode" placeholder="Postcode" required value={formData.postcode} onChange={handleChange} />
                <input name="date" placeholder="Date of Service" required value={formData.date} onChange={handleChange} />

                <select name="service" value={formData.service} onChange={handleChange}
                  style={{ border: "1.5px solid #dce3f0", borderRadius: 8, padding: "13px 16px", fontSize: 15, fontFamily: "inherit", color: formData.service ? "#1a1a2e" : "#9aa5be", background: "#fff", outline: "none", width: "100%" }}>
                  <option value="">Select a Service</option>
                  {services.map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
                </select>
                <textarea name="message" placeholder="Any extra details..." rows={3} value={formData.message} onChange={handleChange} />
                <button type="submit" className="btn-primary" style={{ marginTop: 4 }}>Request Free Quote</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "#0d1b3e", padding: "28px 0" }}>
        <div className="container">
          <div className="grid-4">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
                <Icon size={22} color="#60a5fa" />
                <span style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f5" }}>{label}</span>
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
            <h2 className="section-title">Our Services</h2>
            <p className="section-sub" style={{ maxWidth: 500, margin: "12px auto 0" }}>
              Comprehensive cleaning and property services, all under one roof.
            </p>
          </div>
          <div className="grid-3">
            {services.map(({ icon: Icon, label, desc, from }) => (
              <div key={label}
                style={{ background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 16, padding: "28px 24px", transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1a6bff"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(26,107,255,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eef1f8"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ background: "#e8f0ff", width: 46, height: 46, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={22} color="#1a6bff" />
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 16, color: "#0d1b3e" }}>{label}</h3>
                <p style={{ fontSize: 14, color: "#7a8aaa", marginTop: 6, lineHeight: 1.55 }}>{desc}</p>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1a6bff" }}>From {from}</span>
                  <a href="#contact" style={{ fontSize: 13, color: "#8a96b0", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                    Book <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing" style={{ background: "#f5f8ff" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div className="section-label">Transparent Costs</div>
            <h2 className="section-title">Simple, Fair Pricing</h2>
            <p className="section-sub">No hidden fees. We'll provide a full itemised quote before any work begins.</p>
            <a href="#contact" className="btn-primary" style={{ display: "inline-block", marginTop: 28, textDecoration: "none" }}>Get Your Quote</a>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1.5px solid #eef1f8" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#1a6bff" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", color: "#fff", fontWeight: 600, fontSize: 14 }}>Service</th>
                  <th style={{ padding: "16px 20px", textAlign: "right", color: "#fff", fontWeight: 600, fontSize: 14 }}>Starting From</th>
                </tr>
              </thead>
              <tbody>
                {([
                  ["Domestic Cleaning",               "£20/hr"   ],
                  ["Commercial Cleaning",             "£25/hr"   ],
                  ["End of Tenancy(1-bedroom)",       "£140"     ],
                  ["Carpet Deep Clean",               "£70/room" ],
                  ["Sofa Deep Clean",                 "£30/sofa seat"],
                  ["Oven Deep Clean",                 "£60/oven"],
                  ["Painting & Decoration",           "£200/room"],

                ] as [string, string][]).map(([svc, price], i) => (
                  <tr key={svc} style={{ borderBottom: "1px solid #eef1f8", background: i % 2 === 1 ? "#fafbff" : "#fff" }}>
                    <td style={{ padding: "14px 20px", fontSize: 14, color: "#3d4a6b" }}>{svc}</td>
                    <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 600, color: "#0d1b3e", textAlign: "right" }}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">Our Promise</div>
            <h2 className="section-title">Why Choose Us!?</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: ShieldCheck,   title: "Fully Insured",       desc: "We carry comprehensive public liability insurance on every job." },
              { icon: BadgeCheck,    title: "DBS-Checked Team",    desc: "All staff are background-checked and professionally trained." },
              { icon: BadgeCheck,    title: "Waste Disposal Registered",  desc: "We are a fully licenced waste carrier - All waste are disposed responsibly" },
              { icon: Leaf,          title: "Eco-Friendly Products",desc: "Safe for children, pets, and the environment." },
              { icon: PoundSterling, title: "No Hidden Costs",     desc: "Upfront quotes — what we say is what you pay." },
              { icon: Clock,         title: "Flexible Hours",      desc: "Evenings and weekends available to suit your schedule." },
              { icon: Star,          title: "5-Star Rated",        desc: "Hundreds of satisfied customers across the region." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 14, padding: "24px 20px" }}>
                <div style={{ background: "#e8f0ff", width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={20} color="#1a6bff" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: 15, color: "#0d1b3e" }}>{title}</h3>
                  <p style={{ fontSize: 13.5, color: "#7a8aaa", marginTop: 5, lineHeight: 1.55 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="section" id="areas" style={{ background: "#0d1b3e" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#93c5fd", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            Coverage
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: "#fff" }}>Areas We Cover</h2>
          <p style={{ color: "#8a96b0", marginTop: 12, fontSize: 16 }}>Based in Peterborough, operating across the surrounding region.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 36 }}>
            {areas.map((area) => (
              <div key={area} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f5", borderRadius: 8, padding: "10px 22px", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 7 }}>
                <MapPin size={14} color="#60a5fa" />
                {area}
              </div>
            ))}
          </div>
          <p style={{ color: "#8a96b0", marginTop: 20, fontSize: 14 }}>
            Not on the list?{" "}
            <a href="#contact" style={{ color: "#60a5fa", textDecoration: "underline" }}>Contact us</a>
            {" "}— we may still be able to help.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" id="reviews">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">Customer Reviews</div>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="grid-3">
            {reviews.map(({ name, loc, stars, text }) => (
              <div key={name} style={{ background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 16, padding: 28 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={16} fill="#facc15" color="#facc15" />
                  ))}
                </div>
                <p style={{ fontSize: 15, color: "#3d4a6b", lineHeight: 1.65, fontStyle: "italic" }}>"{text}"</p>
                <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: "#e8f0ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1a6bff" }}>
                    {name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#0d1b3e" }}>{name}</div>
                    <div style={{ fontSize: 12, color: "#8a96b0" }}>{loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "linear-gradient(135deg, #1a6bff 0%, #0f4ac4 100%)", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#fff" }}>
            Ready to Transform Your Property?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginTop: 12, fontSize: 17 }}>Get a free, no-obligation quote today.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <a href="#contact" style={{ background: "#fff", color: "#1a6bff", padding: "14px 30px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Get Free Quote
            </a>
            <a href={`tel:${BRAND.phone}`} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "13px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={16} /> {BRAND.phone}
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
                { icon: Phone,  text: BRAND.phone  },
                { icon: Mail,   text: BRAND.email  },
                { icon: MapPin, text: "Peterborough & surrounding areas" },
              ] as { icon: React.ElementType; text: string }[]).map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ background: "#e8f0ff", width: 38, height: 38, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color="#1a6bff" />
                  </div>
                  <span style={{ fontSize: 15, color: "#3d4a6b" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 20, padding: 36 }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <CheckCircle2 size={52} color="#16a34a" style={{ margin: "0 auto 14px" }} />
                <h3 style={{ fontWeight: 700, fontSize: 18, color: "#0d1b3e" }}>Quote Requested!</h3>
                <p style={{ color: "#5a6782", marginTop: 8, fontSize: 15 }}>We'll call or email you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
                  <input name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
                </div>
                <input name="email" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} />
                <input name="postcode" placeholder="Postcode" type="postcode" value={formData.postcode} onChange={handleChange} />
                <input name="date" placeholder="Date of Service" type="date" value={formData.date} onChange={handleChange} />


                <select name="service" value={formData.service} onChange={handleChange}
                  style={{ border: "1.5px solid #dce3f0", borderRadius: 8, padding: "13px 16px", fontSize: 15, fontFamily: "inherit", color: formData.service ? "#1a1a2e" : "#9aa5be", background: "#fff", outline: "none", width: "100%" }}>
                  <option value="">Select a Service</option>
                  {services.map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
                </select>
                <textarea name="message" placeholder="Tell us about your requirements..." rows={4} value={formData.message} onChange={handleChange} />
                <button type="submit" className="btn-primary">Send Quote Request</button>
                <p style={{ fontSize: 12, color: "#9aa5be", textAlign: "center" }}>No obligation. We'll respond within a few hours.</p>
              </form>
            )}
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
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>
                Jojo Property Services Ltd
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#8a96b0" }}>Registered Company · Fully Insured · Waste Carrier Licensed</p>
            <p style={{ fontSize: 13, color: "#8a96b0" }}>© {new Date().getFullYear()} Jojo Property Services Ltd</p>
          </div>
        </div>
      </footer>
    </div>
  );
}