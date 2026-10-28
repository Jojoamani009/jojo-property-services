import Link from "next/link";
import { publishedServices } from "../lib/services";

export default function ServiceMenu({ current }: { current?: string }) {
  return (
    <nav className="sp-menu" aria-label="Services" style={{ position: "sticky", top: 100 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#8a96b0", marginBottom: 10 }}>Our services</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {publishedServices().map((s) => {
          const active = s.slug === current;
          return (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                aria-current={active ? "page" : undefined}
                style={{
                  display: "block", padding: "10px 14px", textDecoration: "none", fontSize: 14,
                  fontWeight: active ? 700 : 500, color: active ? "#1a6bff" : "#3d4a6b",
                  background: active ? "#e8f0ff" : "transparent",
                  borderLeft: `3px solid ${active ? "#1a6bff" : "transparent"}`, borderRadius: "0 8px 8px 0",
                }}
              >
                {s.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link href="/#services" style={{ display: "block", padding: "10px 14px", fontSize: 13, color: "#8a96b0", textDecoration: "none" }}>
            All services →
          </Link>
        </li>
      </ul>
    </nav>
  );
}
