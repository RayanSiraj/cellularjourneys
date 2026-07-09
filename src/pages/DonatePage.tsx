import { HandHeart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  Callout,
  PageHeader,
  SectionHeading,
  Seo,
} from "../components/PageElements";

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
      </section>
      <div className="page-shell pb-20">
        <Callout
          title="Online giving is not yet connected."
          action={
            <Link className="btn btn-primary" to="/contact">
              Contact Us
            </Link>
          }
        >
          {/* TODO(client): connect the approved payment processor and legal donation language. */}
          A payment processor has not been selected. Contact Cellular Journeys
          with questions about supporting the organization.
        </Callout>
      </div>
    </>
  );
}
