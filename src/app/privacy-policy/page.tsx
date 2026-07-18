import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Data Policy | Jojo Property Services",
  description:
    "How Jojo Property Services Ltd collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
        Privacy &amp; Data Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Jojo Property Services Ltd &middot; Last updated: 17 July 2026
      </p>

      <div className="mt-10 space-y-10 text-gray-700 leading-relaxed">
        <p>
          Jojo Property Services Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;) is committed to protecting your privacy and
          handling your personal data responsibly, in line with the UK
          General Data Protection Regulation (UK GDPR) and the Data
          Protection Act 2018.
        </p>
        <p>
          This policy explains what information we collect when you book our
          cleaning services, why we collect it, how we use it, and your
          rights regarding that information.
        </p>

        <Section title="1. Who We Are">
          <p>Jojo Property Services Ltd</p>
          <p>Email: info@jojopropertyservices.co.uk</p>
          <p>Phone: 07305851573</p>
          <p className="mt-2">
            We are the &ldquo;data controller&rdquo; for the personal
            information we collect from you.
          </p>
        </Section>


        <Section title="2. What Information We Collect">
          <p>
            When you make a booking with us &mdash; via our website form, by
            phone, or via WhatsApp &mdash; we may collect:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Your name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Property address</li>
            <li>Booking details (service type, date, time, duration, add-ons)</li>
            <li>
              Any additional notes you provide about your property or the job
              (e.g. access instructions, specific requirements)
            </li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> collect or store any payment card
            details. Payments are made by bank transfer directly to us, so we
            do not process or hold card information at any point.
          </p>
        </Section>


        <Section title="3. How We Use Your Information">
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Schedule and confirm your booking</li>
            <li>Contact you about your appointment (confirmations, reminders, or changes)</li>
            <li>Provide the cleaning service you&apos;ve requested</li>
            <li>Send you an invoice or payment reference for bank transfer</li>
            <li>Respond to any queries, complaints, or feedback</li>
            <li>Keep basic business records as required for accounting and tax purposes</li>
          </ul>
          <p className="mt-3">
            We do not use your information for marketing unless you have
            separately given us permission to do so, and you can opt out of
            any such communication at any time.
          </p>
        </Section>


        <Section title="4. Lawful Basis for Processing">
          <p>We process your personal data on the following legal bases:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li><strong>Contract</strong>: to provide the service you&apos;ve booked with us</li>
            <li><strong>Legal obligation</strong>: to meet accounting and tax record-keeping requirements</li>
            <li><strong>Legitimate interest</strong>: to run and improve our business, such as contacting you about your booking</li>
          </ul>
        </Section>


        <Section title="5. How We Store Your Information">
          <p>
            Your information is stored securely via our booking system,
            email, and/or phone/WhatsApp records. We take reasonable steps to
            protect your data from unauthorised access, loss, or misuse.
          </p>
          <p className="mt-3">
            We do not sell or share your personal information with third
            parties for marketing purposes. We may share limited information
            with cleaning staff assigned to your booking, solely for the
            purpose of carrying out the service (e.g. your address and access
            notes).
          </p>
        </Section>


        <Section title="6. How Long We Keep Your Information">
          <p>We retain personal data only for as long as necessary:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>
              Booking and contact details: for the duration of our working
              relationship, plus a reasonable period afterwards in case of
              repeat bookings or queries
            </li>
            <li>
              Financial records (e.g. invoices): as required by UK tax law,
              typically 6 years
            </li>
          </ul>
        </Section>


        <Section title="7. Your Rights">
            
          <p>Under UK GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (where we&apos;re not legally required to keep it)</li>
            <li>Object to or restrict certain processing</li>
            <li>Withdraw consent, where processing is based on consent</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:info@jojopropertyservices.co.uk"
              className="underline underline-offset-2"
            >
              info@jojopropertyservices.co.uk
            </a>{" "}
            or 07305851573.
          </p>
        </Section>


        <Section title="8. Complaints">
          <p>
            If you have concerns about how we handle your data, please
            contact us directly so we can resolve the issue. You also have
            the right to lodge a complaint with the Information
            Commissioner&apos;s Office (ICO) at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              ico.org.uk
            </a>
            .
          </p>
        </Section>


        <Section title="9. Changes to This Policy">
          <p>
            We may update this policy from time to time. Any changes will be
            posted on this page with an updated revision date.
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
      {children}
    </section>
  );
}
