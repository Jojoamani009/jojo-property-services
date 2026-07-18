import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Jojo Property Services",

  description:
    "Meet Jojo Property Services Ltd — reliable, professional cleaning for homes in your local area.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
        About Us
      </h1>

      <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
        <p>
          We&apos;re a dedicated cleaning and property services company,
          proud to help homes across our local area stay spotless,
          comfortable, and well looked after.
        </p>
        <p>
          At Jojo Property Services Ltd, we believe a clean home should feel
          effortless for you. Whether you need a regular domestic clean, a
          one-off deep clean, garden maintainance, painting, clearance, waste removal, plumbing services or
          general property maintenance services, our team is here to make it simple, reliable, and
          stress-free.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            What We Offer
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Domestic & commercial cleaning (hourly and scheduled visits)</li>
            <li>Deep cleans and one-off cleans</li>
            <li>Carpet & upholstery deep clean</li>
            <li>Clearance & waste removal services</li>
            <li>Painting & Decoration</li>
            <li>Garden Maintenance</li>
            <li>Furniture assembly & disassembly</li>
            <li>Garden fence panel installation</li>
            <li>Add-on services tailored to your needs</li>
            <li>Flexible booking via our website, phone, or WhatsApp</li>
          </ul>
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
              <strong>Easy Booking</strong> &mdash; book online, by phone, or
              message us directly on WhatsApp.
            </li>
            <li>
              <strong>Straightforward Pricing</strong> &mdash; clear, upfront
              pricing with no hidden fees.
            </li>
            <li>
              <strong>Trusted by Local Clients</strong> &mdash; we take pride
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
          <p>📞 07305851573</p>
        </section>
      </div>
    </main>
  );
}
