import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../../components/SiteChrome";

export const metadata: Metadata = {
  title: "About Us | Jojo Property Services",
  description:
    "Jojo Property Services Ltd is a Peterborough-based cleaning and property services company, serving Peterborough and nearby towns and villages.",
  alternates: { canonical: "/about" },
};

const link = "underline underline-offset-2 text-blue-700 hover:text-blue-900";

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          About Us
        </h1>

        <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
          <p>
            Jojo Property Services Ltd is a Peterborough-based cleaning and
            property services company. We help homes, landlords, Airbnb hosts
            and businesses across Peterborough and the surrounding towns and
            villages stay clean, comfortable and well looked after.
          </p>
          <p>
            We believe a clean home should feel effortless for you. Whether you
            need a regular domestic clean, a one-off deep clean, garden
            maintenance, painting, clearance, waste removal, plumbing or general
            property maintenance, our team is here to make it simple, reliable
            and stress-free.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Story</h2>
            <p>
              The company was first registered in November 2024 as Jojo Cleaning
              Services Ltd. As we grew beyond cleaning and began offering a
              wider range of property services, it became Jojo Property Services
              Ltd. We&apos;re a local business, based in Peterborough, and we
              take pride in doing the job properly and keeping our customers
              informed from the first quote to the final clean.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              What We Offer
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Domestic &amp; commercial cleaning (hourly and scheduled visits)</li>
              <li>
                <Link href="/end-of-tenancy-cleaning-peterborough" className={link}>
                  End of tenancy, move-in/out and one-off deep cleans
                </Link>
              </li>
              <li>
                <Link href="/airbnb-changeover-cleaning-peterborough" className={link}>
                  Airbnb &amp; serviced accommodation changeover cleaning
                </Link>
              </li>
              <li>
                <Link href="/carpet-and-sofa-cleaning-peterborough" className={link}>
                  Carpet, upholstery, sofa &amp; mattress deep cleaning
                </Link>
              </li>
              <li>
                <Link href="/oven-cleaning-peterborough" className={link}>
                  Oven deep cleaning
                </Link>
              </li>
              <li>House, garage &amp; garden clearance and waste removal</li>
              <li>Man &amp; Van services</li>
              <li>Painting &amp; Decoration</li>
              <li>Garden maintenance and garden fence panel installation</li>
              <li>Furniture assembly &amp; disassembly, and TV wall installation</li>
              <li>Plumbing &amp; heating services</li>
              <li>Add-on services tailored to your needs</li>
              <li>Flexible booking via our website, phone, or WhatsApp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Where We Work
            </h2>
            <p>
              We&apos;re based in Peterborough and work across the surrounding
              towns and villages in Cambridgeshire and nearby areas, including
              Wisbech, March, Whittlesey, Market Deeping, Bourne and Stamford.
              Not sure whether we cover you? Get in touch &mdash; we may still
              be able to help.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Why Choose Us
            </h2>
            <ul className="space-y-3">
              <li>
                <strong>Reliable &amp; Professional</strong> &mdash; we turn up
                on time and do the job properly, every time.
              </li>
              <li>
                <strong>Insured &amp; Vetted</strong> &mdash; we&apos;re fully
                insured, our staff are DBS-checked, and we&apos;re a registered
                waste carrier.
              </li>
              <li>
                <strong>Easy Booking</strong> &mdash;{" "}
                <Link href="/booking" className={link}>book online</Link>, by
                phone, or message us directly on WhatsApp.
              </li>
              <li>
                <strong>Straightforward Pricing</strong> &mdash; clear, upfront
                pricing with no hidden fees.
              </li>
              <li>
                <strong>Trusted by Local Customers</strong> &mdash; we take pride
                in building long-term relationships with the homes and clients
                we serve.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Get in Touch
            </h2>
            <p>We&apos;d love to help keep your property in great shape.</p>
            <p className="mt-2">
              📧{" "}
              <a
                href="mailto:info@jojopropertyservices.co.uk"
                className="underline underline-offset-2"
              >
                info@jojopropertyservices.co.uk
              </a>
            </p>
            <p>
              📞{" "}
              <a href="tel:07305851573" className="underline underline-offset-2">
                07305851573
              </a>
            </p>
            <p>
              💬{" "}
              <a
                href="https://wa.me/447341958822"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                WhatsApp 07341958822
              </a>
            </p>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
