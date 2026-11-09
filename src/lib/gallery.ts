// Before and after photos.
// 1. Put the image files in the project's  public/gallery/  folder.
// 2. Add an entry below. Nothing shows on the site until there is at least one entry.
//
//    service  = the service page slug the photos belong to (see lib/services.ts)
//    featured = true to also show it in the "Our Work" section on the homepage
//    alt      = a plain description of the job, e.g. "Oven in a Peterborough rental property"
//
// Use real photos of your own jobs, taken from the same spot before and after,
// and avoid personal items, documents or people in the shot.

export type GalleryItem = {
  id: string;
  service: string;
  title: string;
  before?: string; // not needed for single photos
  after?: string;
  image?: string; // use with mode "single" for one photo (for example a photo split into before and after)
  alt: string;
  featured?: boolean;
  aspect?: string; // shape of the photos, e.g. "4 / 3" (default, landscape) or "3 / 4" (portrait)
  mode?: "slider" | "side" | "single"; // "side" = two photos side by side. Use it when the two shots are not taken from the same spot
  labels?: boolean; // set false if the photos already have "Before" / "After" written on them
};

export const GALLERY: GalleryItem[] = [
  {
    id: "carpet-split-1",
    service: "carpet-and-sofa-cleaning-peterborough",
    title: "Carpet deep clean: cleaned section (bottom) against uncleaned (top)",
    image: "/gallery/carpet-split-1.jpg",
    alt: "Carpet half cleaned, showing the difference between the cleaned and uncleaned sections",
    featured: false,
    aspect: "2 / 3",
    mode: "single", // one photo with Before / After written on it
  },
  {
    id: "bed-upholstery-1",
    service: "carpet-and-sofa-cleaning-peterborough",
    title: "Upholstered bed deep clean in progress",
    image: "/gallery/bed-upholstery-clean.jpg",
    alt: "Upholstered bed being deep cleaned with a hot water extraction machine",
    featured: false,
    aspect: "3 / 4",
    mode: "single",
  },
  {
    id: "garden-gravel-1",
    service: "garden-maintenance-peterborough", // no page yet; shows once that page is published
    title: "Front garden weeding and tidy-up",
    before: "/gallery/garden-gravel-before.jpg",
    after: "/gallery/garden-gravel-after.jpg",
    alt: "Front garden gravel area weeded and tidied",
    featured: false,
    aspect: "3 / 4",
    mode: "side",
  },
  {
    id: "oven-clean-1",
    service: "oven-cleaning-peterborough",
    title: "Oven deep clean",
    before: "/gallery/oven-clean-before.jpg",
    after: "/gallery/oven-clean-after.jpg",
    alt: "Oven deep clean",
    featured: true,
    aspect: "3 / 4",
    mode: "side", // the two shots are at slightly different zoom, so side by side looks cleaner than the slider
  },
  {
    id: "hob-clean-1",
    service: "oven-cleaning-peterborough",
    title: "Hob deep clean (drag to compare)",
    before: "/gallery/hob-clean-before.jpg",
    after: "/gallery/hob-clean-after.jpg",
    alt: "Gas hob deep clean",
    featured: false, // oven page only; set true to also show on the homepage
    aspect: "3 / 4",
    mode: "slider", // these two shots line up well
  },
  {
    id: "garden-clearance-1",
    service: "house-clearance-peterborough", // shows on that page once it is published
    title: "Garden waste clearance and removal",
    before: "/gallery/garden-clearance-before.jpg",
    after: "/gallery/garden-clearance-after.jpg",
    alt: "Garden waste clearance and removal",
    featured: false, // clearance page only; set true to also show on the homepage
    aspect: "3 / 4",
    mode: "side",
  },
  {
    id: "shower-tray-1",
    service: "end-of-tenancy-cleaning-peterborough",
    title: "Shower tray deep clean",
    before: "/gallery/shower-tray-before.jpg",
    after: "/gallery/shower-tray-after.jpg",
    alt: "Shower tray deep clean",
    featured: false,
    aspect: "1 / 1", // square crop: the photos are different shapes (landscape before, portrait after)
    mode: "side",
  },
  {
    id: "garage-clearance-1",
    service: "house-clearance-peterborough", // shows on that page once it is published
    title: "Garage clearance and removal",
    before: "/gallery/garage-clearance-before.jpg",
    after: "/gallery/garage-clearance-after.jpg",
    alt: "Garage clearance and removal",
    featured: false,
    aspect: "9 / 16",
    mode: "side",
    labels: false, // these photos already say Before / After
  },
  {
    id: "bedroom-carpet-1",
    service: "carpet-and-sofa-cleaning-peterborough",
    title: "Bedroom carpet deep clean",
    before: "/gallery/bedroom-carpet-before.jpg",
    after: "/gallery/bedroom-carpet-after.jpg",
    alt: "Bedroom carpet deep clean",
    featured: true,
    aspect: "3 / 4",
    mode: "side",
  },
  {
    id: "bedroom-carpet-2",
    service: "carpet-and-sofa-cleaning-peterborough",
    title: "Children's bedroom carpet deep clean",
    before: "/gallery/bedroom-carpet-2-before.jpg",
    after: "/gallery/bedroom-carpet-2-after.jpg",
    alt: "Children's bedroom carpet deep clean",
    featured: false, // carpet page only; set true to also show on the homepage
    aspect: "3 / 4",
    mode: "side",
  },
  {
    id: "kitchen-clearance-1",
    service: "house-clearance-peterborough", // shows on that page once it is published
    title: "Kitchen clearance and deep clean",
    before: "/gallery/kitchen-clearance-before.jpg",
    after: "/gallery/kitchen-clearance-after.jpg",
    alt: "Kitchen clearance and deep clean",
    featured: true,
    aspect: "3 / 4",
    mode: "side",
  },
  // {
  //   id: "oven-1",
  //   service: "oven-cleaning-peterborough",
  //   title: "Oven deep clean",
  //   before: "/gallery/oven-1-before.jpg",
  //   after: "/gallery/oven-1-after.jpg",
  //   alt: "Oven deep clean in Peterborough",
  //   featured: true,
  // },
];