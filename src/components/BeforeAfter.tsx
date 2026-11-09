"use client";
import { useRef, useState } from "react";

type Props = { before?: string; after?: string; image?: string; alt: string; title?: string; aspect?: string; mode?: "slider" | "side" | "single"; labels?: boolean };

const imgStyle: React.CSSProperties = {
  position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none",
};
const pill: React.CSSProperties = {
  position: "absolute", top: 12, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
  background: "rgba(13,27,62,0.75)", color: "#fff", pointerEvents: "none",
};

// Drag the handle (or use the left/right arrow keys) to compare before and after.
export default function BeforeAfter({ before, after, image, alt, title, aspect = "4 / 3", mode = "slider", labels = true }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  if (mode === "single") {
    return (
      <figure style={{ margin: 0 }}>
        <div style={{ position: "relative", aspectRatio: aspect, overflow: "hidden", borderRadius: 16, background: "#eef1f8" }}>
          <img src={image ?? after ?? before} alt={alt} loading="lazy" style={imgStyle} />
        </div>
        {title && <figcaption style={{ marginTop: 10, fontSize: 14, color: "#5a6782", textAlign: "center" }}>{title}</figcaption>}
      </figure>
    );
  }

  if (mode === "side") {
    const cell: React.CSSProperties = { position: "relative", aspectRatio: aspect, overflow: "hidden", borderRadius: 14, background: "#eef1f8" };
    return (
      <figure style={{ margin: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={cell}>
            <img src={before} alt={`${alt} (before)`} loading="lazy" style={imgStyle} />
            {labels && <span style={{ ...pill, left: 10 }}>Before</span>}
          </div>
          <div style={cell}>
            <img src={after} alt={`${alt} (after)`} loading="lazy" style={imgStyle} />
            {labels && <span style={{ ...pill, left: 10 }}>After</span>}
          </div>
        </div>
        {title && <figcaption style={{ marginTop: 10, fontSize: 14, color: "#5a6782", textAlign: "center" }}>{title}</figcaption>}
      </figure>
    );
  }

  return (
    <figure style={{ margin: 0 }}>
      <div
        ref={box}
        role="slider"
        tabIndex={0}
        aria-label={`Before and after: ${title ?? alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => { if (dragging.current) move(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
        style={{ position: "relative", aspectRatio: aspect, overflow: "hidden", borderRadius: 16, cursor: "ew-resize", touchAction: "pan-y", userSelect: "none", background: "#eef1f8", border: "1.5px solid #eef1f8" }}
      >
        <img src={after} alt={`${alt} (after)`} loading="lazy" draggable={false} style={imgStyle} />
        <img src={before} alt={`${alt} (before)`} loading="lazy" draggable={false} style={{ ...imgStyle, clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        {labels && <span style={{ ...pill, left: 12 }}>Before</span>}
        {labels && <span style={{ ...pill, right: 12 }}>After</span>}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 3, marginLeft: -1.5, background: "#fff", boxShadow: "0 0 6px rgba(0,0,0,0.35)", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 36, height: 36, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a6bff", fontWeight: 700, fontSize: 14 }}>
            ⇄
          </div>
        </div>
      </div>
      {title && <figcaption style={{ marginTop: 10, fontSize: 14, color: "#5a6782", textAlign: "center" }}>{title}</figcaption>}
    </figure>
  );
}
