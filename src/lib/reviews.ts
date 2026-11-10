// Customer reviews and Google review settings.

// 1. Paste your Google review link here (Google Business Profile > "Ask for reviews").
//    While this is empty, the "Leave us a review" buttons stay hidden.
export const GOOGLE_REVIEW_URL = "https://g.page/r/CTT-UGCAU-XWEAE/review";

// 2. Fill these in with your REAL Google rating and review count (for example 4.9 and 37).
//    They show only when both are above 0. Do not guess these numbers.
export const GOOGLE_RATING = { score: 0, count: 0 };

export type Review = {
  name: string;
  loc: string;
  stars: number;
  text: string;
  services: string[]; // service page slugs this review is shown on (the homepage shows all reviews)
};

// Copy reviews exactly as the customer wrote them, and only with their permission.
export const REVIEWS: Review[] = [
  {
    name: "Maria K.",
    loc: "Peterborough",
    stars: 5,
    text: "I was very happy with the service today. The upholstery, mattress, and sofa deep cleaning were done to a very high standard, and everything looks and feels much cleaner. Thank you for your excellent work.",
    services: ["carpet-and-sofa-cleaning-peterborough"],
  },
  {
    name: "Kat.",
    loc: "March",
    stars: 5,
    text: "Punctual, friendly and did an excellent job on an end of tenancy clean on a 2 bedroom apartment. Thank you",
    services: ["end-of-tenancy-cleaning-peterborough"],
  },
  {
    name: "Georgiana D.",
    loc: "Market Deeping",
    stars: 5,
    text: "Lovely service. Hard workers. Great experience all round",
    services: [],
  },
];