import Link from "next/link";
import { publishedServices } from "../lib/services";

const PHONE = "07305851573";
const WHATSAPP = "https://wa.me/447341958822";
const LINKS = ["Pricing", "Areas", "Reviews", "Contact"];

// Header + footer for service pages, matching HomePage styling.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const svcs = publishedServices();
  return (
    <div className="sp" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a2e", background: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');
        .sp, .sp * { box-sizing: border-box; }
        .sp a { color: inherit; }
        .sp-nav { position: sticky; top: 0; z-index: 100; background: #fff; border-bottom: 1px solid #eef0f7; box-shadow: 0 1px 8px rgba(0,0,0,0.04); }
        .sp-nav-in { max-width: 1160px; margin: 0 auto; padding: 0 24px; height: 80px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .sp-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; min-width: 0; }
        .sp-brand img { height: 56px; width: 56px; border-radius: 10px; object-fit: cover; }
        .sp-brand span { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 19px; color: #0d1b3e; white-space: nowrap; }
        .sp-links { display: flex; gap: 28px; align-items: center; }
        .sp-links a, .sp-dd > a { font-size: 14px; font-weight: 500; color: #3d4a6b; text-decoration: none; white-space: nowrap; }
        .sp-dd { position: relative; }
        .sp-dd-menu { display: none; position: absolute; top: 100%; left: -12px; min-width: 270px; background: #fff; border: 1px solid #eef0f7; border-radius: 10px; box-shadow: 0 8px 24px rgba(13,27,62,0.1); padding: 8px 0; }
        .sp-dd:hover .sp-dd-menu, .sp-dd:focus-within .sp-dd-menu { display: block; }
        .sp-dd-menu a { display: block; padding: 10px 18px; font-size: 14px; }
        .sp-dd-menu a:hover { background: #f5f8ff; }
        .sp-call { background: #1a6bff; color: #fff !important; padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; white-space: nowrap; }
        .sp-mob { display: none; }
        .sp-mob summary { list-style: none; cursor: pointer; padding: 10px 14px; border: 1.5px solid #dce3f0; border-radius: 8px; font-weight: 600; font-size: 14px; color: #0d1b3e; }
        .sp-mob summary::-webkit-details-marker { display: none; }
        .sp-mob-panel { position: absolute; left: 0; right: 0; top: 68px; background: #fff; border-top: 1px solid #eef0f7; box-shadow: 0 8px 24px rgba(13,27,62,0.08); display: flex; flex-direction: column; }
        .sp-mob-panel a { padding: 14px 24px; font-size: 15px; font-weight: 500; color: #3d4a6b; text-decoration: none; border-bottom: 1px solid #f5f7fb; }
        .sp-grid { max-width: 1280px; margin: 0 auto; padding: 32px 24px 64px; display: grid; grid-template-columns: 220px minmax(0, 1fr) 340px; gap: 32px; align-items: start; }
        @media (max-width: 1100px) {
          .sp-grid { grid-template-columns: 1fr; }
          .sp-grid > .sp-menu { order: 3; }
          .sp-grid > .sp-quote { order: 2; position: static !important; }
        }
        @media (max-width: 860px) {
          .sp-nav-in { height: 68px; }
          .sp-brand img { height: 44px; width: 44px; }
          .sp-brand span { font-size: 15px; }
          .sp-links { display: none; }
          .sp-mob { display: block; }
          .sp-call span { display: none; }
        }
      `}</style>

      <header className="sp-nav">
        <div className="sp-nav-in">
          <Link href="/" className="sp-brand">
            <img src="/logo.jpg" alt="Jojo Property Services Ltd" />
            <span>Jojo Property Services Ltd</span>
          </Link>
          <nav className="sp-links" aria-label="Main">
            <div className="sp-dd">
              <Link href="/#services">Services ▾</Link>
              <div className="sp-dd-menu">
                {svcs.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`}>{s.label}</Link>
                ))}
                <Link href="/#services">All services</Link>
              </div>
            </div>
            {LINKS.map((l) => (
              <Link key={l} href={`/#${l.toLowerCase()}`}>{l}</Link>
            ))}
            <Link href="/booking" style={{ fontWeight: 600, color: "#1a6bff" }}>Book Online</Link>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href={`tel:${PHONE}`} className="sp-call">📞 <span>{PHONE}</span></a>
            <details className="sp-mob">
              <summary>Menu</summary>
              <div className="sp-mob-panel">
                {svcs.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`}>{s.label}</Link>
                ))}
                <Link href="/#services">All services</Link>
                {LINKS.map((l) => (
                  <Link key={l} href={`/#${l.toLowerCase()}`}>{l}</Link>
                ))}
                <Link href="/booking" style={{ color: "#1a6bff", fontWeight: 700 }}>Book Online</Link>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
              </div>
            </details>
          </div>
        </div>
      </header>

      {children}

      <footer style={{ background: "#0d1b3e", padding: "40px 24px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src="/logo.jpg" alt="Jojo Property Services Ltd" style={{ height: 60, width: 60, borderRadius: 10, objectFit: "cover" }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>Jojo Property Services Ltd</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/about" style={{ fontSize: 13, color: "#8a96b0", textDecoration: "none" }}>About Us</Link>
            <Link href="/privacy-policy" style={{ fontSize: 13, color: "#8a96b0", textDecoration: "none" }}>Privacy Policy</Link>
          </div>
          <p style={{ fontSize: 13, color: "#8a96b0" }}>Registered Company · Fully Insured · Waste Carrier Licensed</p>
          <p style={{ fontSize: 13, color: "#8a96b0" }}>© {new Date().getFullYear()} Jojo Property Services Ltd</p>
        </div>
      </footer>
    </div>
  );
}
