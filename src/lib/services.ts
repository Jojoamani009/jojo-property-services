// Service page content + calculator prices (matched to your BookingModal prices).
// A page goes live only when published: true. Unpublished pages 404 and stay out of menus.

export type PriceModel =
  | { kind: "hourly"; rate: number; minHours: number; maxHours: number; maxStaff: number; presets?: { label: string; hours: number; staff: number }[] }
  | { kind: "tiers"; label: string; tiers: { label: string; price: number }[] }
  | { kind: "unit"; rate: number; unitLabel: string; max: number }
  | { kind: "poa" };

// ids match the ones used in HomePage and BookingModal
export const CALC: Record<string, { name: string; model: PriceModel }> = {
  domestic: { name: "Domestic Cleaning", model: { kind: "hourly", rate: 20, minHours: 2, maxHours: 8, maxStaff: 4 } },
  airbnb: { name: "Airbnb / Serviced Accommodation", model: { kind: "hourly", rate: 20, minHours: 2, maxHours: 8, maxStaff: 4 } },
  commercial: { name: "Commercial Cleaning", model: { kind: "hourly", rate: 25, minHours: 3, maxHours: 12, maxStaff: 10 } },
  tenancy: { name: "End of Tenancy / Move-in/out Deep Clean", model: {
      kind: "hourly", rate: 25, minHours: 3, maxHours: 12, maxStaff: 3,
      // typical times by property size (from Jojo)
      presets: [
        { label: "Studio / 1 bedroom", hours: 6, staff: 1 },
        { label: "2 bedrooms", hours: 8, staff: 1 },
        { label: "3 bedrooms", hours: 7, staff: 2 },
        { label: "4-5 bedrooms", hours: 8, staff: 2 },
      ],
    },
  },
  carpet: { name: "Carpet & Upholstery", model: { kind: "unit", rate: 70, unitLabel: "Number of rooms", max: 10 } },
  oven: {
    name: "Oven Cleaning",
    model: { kind: "tiers", label: "Oven type", tiers: [{ label: "Standard oven", price: 70 }, { label: "Double range oven", price: 75 }] },
  },
  sofa: { name: "Sofa Deep Clean", model: { kind: "unit", rate: 30, unitLabel: "Number of seats", max: 10 } },
  painting: { name: "Painting & Decoration", model: { kind: "unit", rate: 200, unitLabel: "Number of rooms", max: 10 } },
  manvan: { name: "Man & Van", model: { kind: "poa" } },
  clearance: { name: "House Clearance", model: { kind: "poa" } },
  maintenance: { name: "Property Maintenance", model: { kind: "poa" } },
  plumbing: { name: "Plumbing & Heating", model: { kind: "poa" } },
  garden: { name: "Garden Maintenance", model: { kind: "poa" } },
};

export type Service = {
  slug: string;
  label: string;
  published: boolean;
  calcId: string; // preselects this option in the calculator
  tiersFrom?: string; // show this CALC entry's tiers as the price table
  hourlyTable?: boolean; // show an hours x cleaners price table (hourly services)
  priceRows?: { label: string; price: string }[]; // simple price table (label + price)
  extras?: { label: string; price: string }[]; // add-ons and extras table
  title: string; // under 60 characters
  description: string;
  h1: string;
  intro: string;
  included?: string[];
  faqs?: { q: string; a: string }[];
  related?: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "end-of-tenancy-cleaning-peterborough",
    label: "End of tenancy cleaning",
    published: true,
    calcId: "tenancy",
    hourlyTable: true,
    title: "End of Tenancy Cleaning Peterborough | £25/hr | Jojo",
    description:
      "End of tenancy, move-in and deep cleaning in Peterborough at £25 per hour per cleaner. Fully insured, DBS-checked. Get an instant price online.",
    h1: "End of Tenancy Cleaning in Peterborough",
    intro:
      "Moving out is stressful enough without worrying about whether your landlord or letting agent will accept the clean. We provide professional end of tenancy cleaning in Peterborough, Bourne, Stamford, Market Deeping, March, Whittlesey and Wisbech. Our DBS-checked team is fully insured, and you get a clear quote before we start. The same service is available as a move-in clean or a one-off deep clean.",
    included: [
      "Kitchen: worktops, cupboards inside and out, sink and taps, hob, extractor and appliance exteriors",
      "Bathrooms: descaling of taps, tiles, shower and glass, toilet, bath, sink and mirrors",
      "Bedrooms and living areas: dusting, skirting boards, door frames, windows (inside), light switches and fittings",
      "Floors: vacuumed and mopped throughout",
    ],
    faqs: [
      { q: "How much does end of tenancy cleaning cost in Peterborough?", a: "End of tenancy, move-in/out and one-off deep cleans are charged at £25 per hour, per cleaner. Your total is the number of hours multiplied by the number of cleaners, so you can work out the price instantly with our calculator. We confirm the price before work starts." },
      { q: "How long does an end of tenancy clean take?", a: "As a guide, a studio or one-bedroom property takes about 6 hours with one cleaner (£150). Two bedrooms takes about 8 hours with one cleaner (£200). Three bedrooms takes about 7 hours with two cleaners (£350), and four to five bedrooms about 8 hours with two cleaners (£400). Times vary with the size and condition of the property." },
      { q: "Do you work weekends?", a: "Yes. Evenings and weekends are available, subject to availability." },
      { q: "Which areas do you cover?", a: "Peterborough, Bourne, Stamford, Market Deeping, March, Whittlesey and Wisbech." },
    ],
    related: ["carpet-and-sofa-cleaning-peterborough", "oven-cleaning-peterborough"],
  },
  {
    slug: "carpet-and-sofa-cleaning-peterborough",
    label: "Carpet & sofa cleaning",
    published: true,
    calcId: "carpet",
    title: "Carpet & Sofa Cleaning Peterborough | Jojo",
    description: "Professional carpet and sofa deep cleaning in Peterborough. Carpets from £70 per room, sofas from £30 per seat. Fully insured. Free quote.",
    h1: "Carpet and Sofa Cleaning in Peterborough",
    intro:
      "Carpets and sofas collect dirt, stains and odours over time, and a proper deep clean makes a real difference to how a home looks and feels. We provide professional carpet and upholstery deep cleaning, using deep extraction cleaning, in Peterborough, Bourne, Stamford, Market Deeping, March, Whittlesey and Wisbech. Our DBS-checked team is fully insured, prices are clear upfront, and evening and weekend appointments are available.",
    included: [
      "Carpet deep cleaning, priced per room",
      "Sofa deep cleaning, priced per seat",
      "Upholstery and mattress cleaning (ask us for a quote)",
    ],
    priceRows: [
      { label: "Carpet deep clean", price: "From £70 per room" },
      { label: "Sofa deep clean", price: "From £30 per seat" },
    ],
    faqs: [
      { q: "How much does carpet cleaning cost in Peterborough?", a: "Carpet deep cleaning starts from £70 per room. For example, three rooms starts from £210. We confirm the final price before work starts." },
      { q: "How much does sofa cleaning cost?", a: "Sofa deep cleaning starts from £30 per seat, so a three-seat sofa starts from £90. Use the calculator on this page for an instant estimate." },
      { q: "Do you work weekends?", a: "Yes. Evenings and weekends are available, subject to availability." },
      { q: "Which areas do you cover?", a: "Peterborough, Bourne, Stamford, Market Deeping, March, Whittlesey and Wisbech." },
    ],
    related: ["oven-cleaning-peterborough", "end-of-tenancy-cleaning-peterborough"],
  },
  {
    slug: "oven-cleaning-peterborough",
    label: "Oven cleaning",
    published: true,
    calcId: "oven",
    title: "Oven Cleaning Peterborough | From £70 | Jojo",
    description: "Professional oven deep cleaning in Peterborough from £70 for a standard oven, £75 for a double range oven. Fully insured. Book online or call.",
    h1: "Oven Cleaning in Peterborough",
    intro:
      "A greasy, baked-on oven looks bad, can smoke when you cook, and is one of the jobs landlords and letting agents look at when a tenancy ends. We provide professional oven deep cleaning and degreasing in Peterborough, Bourne, Stamford, Market Deeping, March, Whittlesey and Wisbech. Our DBS-checked team is fully insured, and you get a clear price before we start.",
    included: [
      "Professional degreasing of your oven",
      "Standard ovens and double range ovens",
      "Available alongside our domestic and commercial cleaning (charged separately)",
    ],
    priceRows: [
      { label: "Standard oven", price: "From £70" },
      { label: "Double range oven", price: "From £75" },
    ],
    faqs: [
      { q: "How much does oven cleaning cost in Peterborough?", a: "A standard oven starts from £70 and a double range oven from £75. We confirm the final price before work starts." },
      { q: "Can I add an oven clean to another service?", a: "Yes. Oven cleaning can be booked alongside our domestic and commercial cleaning, and charged separately. Moving out? Ask us about adding it to your end of tenancy clean." },
      { q: "Do you work weekends?", a: "Yes. Evenings and weekends are available, subject to availability." },
      { q: "Which areas do you cover?", a: "Peterborough, Bourne, Stamford, Market Deeping, March, Whittlesey and Wisbech." },
    ],
    related: ["carpet-and-sofa-cleaning-peterborough", "end-of-tenancy-cleaning-peterborough"],
  },
  {
    slug: "airbnb-changeover-cleaning-peterborough",
    label: "Airbnb changeover cleaning",
    published: true,
    calcId: "airbnb",
    hourlyTable: true,
    title: "Airbnb Cleaning Peterborough | From £20/hr | Jojo",
    description: "Reliable Airbnb changeover cleaning in Peterborough and Bourne from £20/hr. Linen hire, laundry, restocking and damage reports. Same-day available.",
    h1: "Airbnb and Serviced Accommodation Cleaning in Peterborough",
    intro:
      "Guests judge a stay by how clean it is, and a quick, consistent changeover keeps your reviews high and your calendar full. We provide changeover cleaning for Airbnb hosts and serviced accommodation in Peterborough, Bourne, Stamford, Market Deeping, March, Whittlesey and Wisbech, with weekend, same-day and short-notice bookings available. Our DBS-checked team is fully insured, and our rates are published upfront.",
    included: [
      "Changeover cleaning between guests, charged at £20 per hour per cleaner",
      "Linen hire, laundry, bed-making and linen changeover",
      "We can supply and restock guest essentials such as toilet rolls, hand soap, tea and coffee",
      "We report any damage, missing items or maintenance issues we notice while cleaning",
      "Weekend, same-day and short-notice bookings, plus key collection and return",
    ],
    extras: [
      { label: "Linen hire & laundry, 2-bedroom property", price: "+£50" },
      { label: "Linen hire & laundry, 3-bedroom property", price: "+£75" },
      { label: "Linen hire & laundry, 4-bedroom property", price: "+£100" },
      { label: "Weekend / bank holiday rate", price: "+£15" },
      { label: "Same-day / express booking", price: "+£25" },
      { label: "Key collection and return", price: "+£20" },
    ],
    faqs: [
      { q: "How much does Airbnb cleaning cost in Peterborough?", a: "Changeover cleaning is £20 per hour, per cleaner, with a minimum booking of 2 hours. For example, a 3-hour clean with one cleaner is £60. Linen and laundry, weekend, same-day and key collection extras are listed on this page." },
      { q: "Do you provide linen and laundry?", a: "Yes. We offer linen hire, laundry, bed-making and linen changeover. It is priced by property size: +£50 for two bedrooms, +£75 for three and +£100 for four." },
      { q: "Can you do same-day changeovers and weekends?", a: "Yes, subject to availability. Same-day or express bookings are +£25, and weekends and bank holidays are +£15." },
      { q: "Can you restock guest essentials?", a: "Yes. We can supply and restock essentials such as toilet rolls, hand soap, tea and coffee." },
      { q: "Will you tell me about damage or problems?", a: "Yes. We report any damage, missing items or maintenance issues we notice while cleaning, so you can deal with them before your next guests arrive." },
      { q: "Which areas do you cover?", a: "Peterborough, Bourne, Stamford, Market Deeping, March, Whittlesey and Wisbech." },
    ],
    related: ["end-of-tenancy-cleaning-peterborough", "carpet-and-sofa-cleaning-peterborough", "oven-cleaning-peterborough"],
  },
  { slug: "house-clearance-peterborough", label: "House clearance & man and van", published: false, calcId: "clearance", title: "House Clearance Peterborough | Jojo Property Services", description: "House, garage, shed and garden clearance in Peterborough. Licensed waste carrier. Free quote.", h1: "House Clearance and Man and Van in Peterborough", intro: "" },
  { slug: "domestic-cleaning-peterborough", label: "Domestic cleaning", published: false, calcId: "domestic", title: "Domestic Cleaners Peterborough | From £20/hr | Jojo", description: "Regular, flexible home cleaning in Peterborough from £20 per hour. DBS-checked, fully insured.", h1: "Domestic Cleaning in Peterborough", intro: "" },
  { slug: "commercial-cleaning-peterborough", label: "Commercial cleaning", published: false, calcId: "commercial", title: "Office Cleaning Peterborough | From £25/hr | Jojo", description: "Regular office and retail cleaning in Peterborough from £25 per hour. Fully insured.", h1: "Office and Commercial Cleaning in Peterborough", intro: "" },
  { slug: "painting-and-decorating-peterborough", label: "Painting & decorating", published: false, calcId: "painting", title: "Painter & Decorator Peterborough | From £200/room", description: "Reliable painters and decorators in Peterborough from £200 per room. Free quotes.", h1: "Painting and Decorating in Peterborough", intro: "" },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const publishedServices = () => SERVICES.filter((s) => s.published);