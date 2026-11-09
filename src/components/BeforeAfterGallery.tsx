import BeforeAfter from "./BeforeAfter";
import type { GalleryItem } from "../lib/gallery";

export default function BeforeAfterGallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
      {items.map((g) => (
        <BeforeAfter key={g.id} before={g.before} after={g.after} image={g.image} alt={g.alt} title={g.title} aspect={g.aspect} mode={g.mode} labels={g.labels} />
      ))}
    </div>
  );
}
