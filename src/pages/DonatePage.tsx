import { ArrowSquareOut, HandHeart } from "@phosphor-icons/react";
import { PageHeader, SectionHeading, Seo } from "../components/PageElements";

const waysToGive = [
  "Educational content development",
  "CancerQuest resources",
  "Student internship programs",
  "Community outreach initiatives",
  "Website development and maintenance",
  "Educational events and workshops",
  "Program operations and growth",
] as const;

export function DonatePage() {
  return (
    <>
      <Seo
        title="Donate"
        description="Learn how support can advance Cellular Journeys education, internships, outreach, and program operations."
      />
      <PageHeader
        title="Support trustworthy education."
        intro="Your support can help expand cancer education, student learning, community outreach, and educational resources."
      />
      <section className="page-shell section">
        <SectionHeading title="Make a Gift" />
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <article className="surface flex flex-col gap-4 bg-[var(--surface-soft)] p-7">
            <h2 className="display text-2xl font-bold">Donate online</h2>
            <p className="leading-7 text-muted">
              Give securely through PayPal using any major debit or credit card,
              or your PayPal account.
            </p>
            <div>
              <a
                className="btn btn-primary inline-flex items-center gap-2"
                href="https://www.paypal.com/donate/?hosted_button_id=45T4RGFHRG34E"
                target="_blank"
                rel="noreferrer"
              >
                Donate with PayPal
                <ArrowSquareOut size={18} aria-hidden />
              </a>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <img
                src="/images/paypal-donate-qr.png"
                alt="QR code linking to the Cellular Journeys PayPal donation page"
                width="120"
                height="120"
                className="h-28 w-28 shrink-0 rounded-lg bg-white p-2"
              />
              <p className="text-sm text-muted">
                Or scan this QR code with your phone camera to donate.
              </p>
            </div>
          </article>
          <article className="surface flex flex-col gap-4 p-7">
            <h2 className="display text-2xl font-bold">Donate by mail</h2>
            <p className="leading-7 text-muted">
              If you prefer to give by standard mail, please make checks payable
              to <strong>Cellular Journeys Inc.</strong> and mail to:
            </p>
            <address className="not-italic leading-7 text-muted">
              Cellular Journeys
              <br />
              c/o Dr. Fatima Rehman
              <br />
              University of North Florida
              <br />
              1 UNF Drive, Building 59
              <br />
              Jacksonville, FL 32224
            </address>
          </article>
        </div>
        <p className="mt-7 max-w-3xl text-sm text-muted">
          Cellular Journeys, Inc. is a 501(c)(3) tax-exempt organization (EIN
          33-4407653). Your contribution may be tax-deductible to the extent
          allowed by law.
        </p>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section">
          <SectionHeading
            title="Ways to Give"
            intro="Cellular Journeys plans to direct support to these areas of its mission and programs."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {waysToGive.map((item, index) => (
              <article
                className={`surface p-6 ${
                  index === 0 || index === 6 ? "bg-[var(--surface-soft)]" : ""
                }`}
                key={item}
              >
                <HandHeart
                  size={28}
                  weight="duotone"
                  className="text-[var(--brand)]"
                  aria-hidden
                />
                <h2 className="mt-4 text-lg font-bold">{item}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
