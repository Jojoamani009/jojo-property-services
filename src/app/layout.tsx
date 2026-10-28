import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  // Lets relative URLs like canonical: "/" resolve to the full address
  metadataBase: new URL("https://jojopropertyservices.co.uk"),
  title: "Cleaning & Property Services Peterborough | Jojo",
  description: "Fully insured, DBS-checked cleaning and property services in Peterborough. End of tenancy, domestic, commercial, carpet & oven cleaning. Call 07305851573.",
  openGraph: {
    title: "Jojo Property Services Ltd | Peterborough",
    description: "Professional cleaning & property services in Peterborough. Fully insured, DBS-checked. Book online or call 07305851573.",
    url: "https://jojopropertyservices.co.uk",
    siteName: "Jojo Property Services Ltd",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://jojopropertyservices.co.uk/logo.jpg",
        width: 800,
        height: 800,
        alt: "Jojo Property Services Ltd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jojo Property Services Ltd | Peterborough",
    description: "Professional cleaning & property services in Peterborough. Fully insured, DBS-checked.",
    images: ["https://jojopropertyservices.co.uk/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // NOTE: no site-wide canonical here. A canonical in the root layout is inherited by
  // every page (/about, /booking, ...) and tells Google they are all copies of the
  // homepage. The homepage canonical is set in src/app/page.tsx instead.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
