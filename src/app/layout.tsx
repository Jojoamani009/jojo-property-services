import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Jojo Property Services Ltd | Cleaning & Property Services Peterborough",
  description: "Fully insured, DBS-checked cleaning and property services in Peterborough. End of tenancy, domestic, commercial, carpet, oven cleaning, plumbing, painting & more. Call 07305851573.",
  keywords: "cleaning services Peterborough, end of tenancy cleaning Peterborough, domestic cleaning Peterborough, commercial cleaning Peterborough, carpet cleaning Peterborough, oven cleaning Property, property maintenance Peterborough, house clearance Peterborough, painting & decoration Peterborough, furniture assembly & disassembly, fence panel installation, garden maintenance ",
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
  alternates: {
    canonical: "https://jojopropertyservices.co.uk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
