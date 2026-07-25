import {
  ArrowSquareOut,
  FileText,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  PageHeader,
  SectionHeading,
  Seo,
} from "../components/PageElements";
import { documentLibrary } from "../data/content";

const accountability = [
  "Responsible nonprofit governance",
  "Decisions made in the community interest",
  "Careful stewardship of donor support",
  "Accurate educational and organizational information",
  "Compliance with applicable requirements",
  "Ethical, transparent decision-making",
] as const;

const boardOversight = [
  "Organizational strategy",
  "Financial stewardship",
  "Policy development",
  "Program evaluation",
  "Risk management",
  "Executive leadership support",
  "Long-term sustainability",
] as const;

const donationSupport = [
  "Educational content development",
  "CancerQuest resources",
  "Student internship programs",
  "Community outreach initiatives",
  "Website development and maintenance",
  "Educational events and workshops",
  "Program operations and growth",
] as const;

export function GovernancePage() {
  return (
    <>
      <Seo
        title="Governance & Transparency"
        description="Review Cellular Journeys governance, accountability commitments, document library, and stewardship priorities."
      />
      <PageHeader
        title="Governance & Transparency"
        intro="Cellular Journeys is committed to accountability, responsible stewardship, accurate information, and ethical decision-making."
      />

      <section className="page-shell section">
        <SectionHeading title="Our Commitment to Accountability" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accountability.map((item) => (
            <div className="accountability-item" key={item}>
              <ShieldCheck
                size={25}
                weight="duotone"
                className="shrink-0 text-[var(--brand)]"
                aria-hidden
              />
              <p className="font-bold leading-6">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section">
          <SectionHeading
            title="Board oversight"
            intro="The Board of Directors provides oversight across these areas of organizational responsibility."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {boardOversight.map((item) => (
              <p
                className="research-note font-bold"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
          <Link className="btn btn-secondary mt-7" to="/about">
            Board biographies
          </Link>
        </div>
      </section>

      <section className="page-shell section">
        <SectionHeading
          title="Financial Transparency"
          intro="Public-ready governance, financial, impact, and policy documents will be linked here when approved files are available."
        />
        <div className="mt-9 grid gap-7 md:grid-cols-2">
          {Object.entries(documentLibrary).map(([category, documents]) => (
            <section className="document-group" key={category}>
              <h3 className="display text-2xl font-bold">{category}</h3>
              <div className="mt-5 grid gap-4">
                {documents.map((document) => (
                  <div
                    className="flex items-center justify-between gap-5 border-b border-[var(--line)] pb-4 last:border-0 last:pb-0"
                    key={document.name}
                  >
                    <div className="flex items-center gap-3">
                      <FileText
                        size={23}
                        weight="duotone"
                        className="shrink-0 text-[var(--brand)]"
                        aria-hidden
                      />
                      <span className="font-bold">{document.name}</span>
                    </div>
                    {document.href ? (
                      <a
                        className="brand-link inline-flex items-center gap-1 font-bold"
                        href={document.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                        <ArrowSquareOut size={17} aria-hidden />
                      </a>
                    ) : (
                      <span className="shrink-0 text-sm text-muted">
                        Available upon request
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-soft)]">
        <div className="page-shell section grid gap-8 md:grid-cols-2">
          <article className="policy-item">
            <h2 className="display text-3xl font-bold">Annual Impact Reports</h2>
            <p className="mt-4 leading-7 text-muted">
              Future reports will describe educational programs, internships,
              community outreach, and approved platform reach information. No
              figures are published until they are verified and approved.
            </p>
          </article>
          <article className="policy-item">
            <h2 className="display text-3xl font-bold">
              Conflict of Interest Policy
            </h2>
            {/* TODO(client): provide the approved Conflict of Interest Policy paragraph and file. */}
            <p className="mt-4 leading-7 text-muted">
              The approved policy statement and downloadable document will be
              added when supplied.
            </p>
          </article>
          <article className="policy-item">
            <h2 className="display text-3xl font-bold">
              Diversity, Equity, Inclusion, and Respect
            </h2>
            {/* TODO(client): provide the approved DEI and Respect statement. */}
            <p className="mt-4 leading-7 text-muted">
              The approved organizational statement will be added when
              supplied.
            </p>
          </article>
          <article className="policy-item">
            <h2 className="display text-3xl font-bold">
              Stewardship of Donations
            </h2>
            <div className="mt-4 grid gap-2 text-muted">
              {donationSupport.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="page-shell section">
        <div className="surface flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <h2 className="display text-3xl font-bold">Questions or requests</h2>
            <p className="mt-2 text-muted">
              Contact Cellular Journeys about governance, finances, or
              available documents.
            </p>
          </div>
          <Link className="btn btn-primary" to="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
