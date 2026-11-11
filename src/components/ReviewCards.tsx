import { GOOGLE_RATING, GOOGLE_REVIEW_URL, type Review } from "../lib/reviews";

// Review cards, an optional rating line and an optional "Leave us a review" button.
export default function ReviewCards({ items, showLeaveButton = false }: { items: Review[]; showLeaveButton?: boolean }) {
  const hasRating = GOOGLE_RATING.score > 0 && GOOGLE_RATING.count > 0;
  const hasButton = showLeaveButton && String(GOOGLE_REVIEW_URL).length > 0;

  return (
    <div>
      {hasRating && (
        <p style={{ textAlign: "center", fontSize: 15, color: "#3d4a6b", marginBottom: 20 }}>
          <span style={{ color: "#facc15", fontSize: 18 }}>★</span>{" "}
          <strong>{GOOGLE_RATING.score.toFixed(1)}</strong> out of 5 from {GOOGLE_RATING.count} Google reviews
        </p>
      )}

      {items.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {items.map((r) => (
            <div key={r.name + r.loc} style={{ background: "#fff", border: "1.5px solid #eef1f8", borderRadius: 16, padding: 28 }}>
              <div style={{ color: "#facc15", fontSize: 18, letterSpacing: 2, marginBottom: 12 }} aria-label={`${r.stars} out of 5 stars`}>
                {"★".repeat(r.stars)}
              </div>
              <p style={{ fontSize: 15, color: "#3d4a6b", lineHeight: 1.65, fontStyle: "italic" }}>“{r.text}”</p>
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, background: "#e8f0ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1a6bff" }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#0d1b3e" }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "#8a96b0" }}>{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasButton && (
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#1a6bff", color: "#fff", padding: "13px 26px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            Leave us a review on Google
          </a>
        </div>
      )}
    </div>
  );
}
