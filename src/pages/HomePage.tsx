import {
  ArrowRight,
  CalendarBlank,
  GlobeHemisphereWest,
  HandsClapping,
  ShieldCheck,
  Student,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  Callout,
  IconCard,
  SectionHeading,
  Seo,
} from "../components/PageElements";
import { mission, platforms } from "../data/content";

export function HomePage() {
  return (
    <>
      <Seo
        title="Cancer education and scientific literacy"
        description="Cellular Journeys is a nonprofit advancing cancer education, scientific literacy, research awareness, and community impact."
      />
      <section className="home-hero page-shell">
        <div className="home-hero__copy">
          <p className="home-hero__kicker">
            Learn. Create. Inspire. Impact.
          </p>
          <h1 className="display">
            Knowledge turns science into action.
          </h1>
          <p className="home-hero__mission">{mission}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" to="/get-involved">
              Get Involved <ArrowRight size={18} aria-hidden />
            </Link>
            <Link className="btn btn-secondary" to="/internship">
              Internship Program
            </Link>
          </div>
        </div>
        <div className="specimen-stage">
          <div className="brand-lens">
            <img
              src="/images/cellular-journeys-logo.webp"
              alt="Cellular Journeys"
              width="1200"
              height="561"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section">
          <SectionHeading
            title="Cancer Awareness Fair"
            intro="Join Cellular Journeys in Jacksonville for cancer education, community connection, and opportunities to get involved."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-[0.7fr_1.3fr]">
            <div className="event-date-block">
              <CalendarBlank
                size={32}
                weight="duotone"
                className="text-[var(--brand)]"
                aria-hidden
              />
              <p className="utility mt-5 text-lg font-semibold">July 18, 2026</p>
              <p className="mt-2 text-muted">Jacksonville, Florida</p>
              <p className="mt-1 text-muted">Location: TBD</p>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="display text-3xl font-bold">
                A featured community event
              </h3>
              <p className="mt-3 max-w-2xl leading-7 text-muted">
                Registration, volunteer, and sponsorship interest forms are
                available on the events page.
              </p>
              <Link className="btn btn-secondary mt-6 self-start" to="/events">
                Event details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section">
        <SectionHeading
          title="Education across platforms"
          intro="Explore evidence-based cancer education, biology learning, interviews, and community resources."
        />
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
          {platforms.slice(0, 3).map((platform, index) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              className={`platform-preview${index === 0 ? " featured" : ""}`}
            >
              <GlobeHemisphereWest
                size={28}
                weight="duotone"
                className="text-[var(--brand)]"
                aria-hidden
              />
              <h3 className="mt-5 text-xl font-bold">{platform.name}</h3>
              <p className="mt-3 leading-7 text-muted">{platform.description}</p>
            </a>
          ))}
        </div>
        <Link className="btn btn-secondary mt-7" to="/platforms">
          View all platforms
        </Link>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-soft)]">
        <div className="page-shell section">
          <SectionHeading title="Choose how to take part" />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <IconCard
              icon={HandsClapping}
              title="Support the work"
              action={{ label: "Ways to give", to: "/donate" }}
            >
              Help sustain education, internships, outreach, and program
              operations.
            </IconCard>
            <IconCard
              icon={Student}
              title="Learn by doing"
              action={{ label: "Explore internships", to: "/internship" }}
            >
              Build science communication, research translation, and project
              experience.
            </IconCard>
            <IconCard
              icon={ShieldCheck}
              title="Review our governance"
              action={{ label: "View transparency", to: "/governance" }}
            >
              Learn how the board oversees strategy, stewardship, policy, and
              sustainability.
            </IconCard>
          </div>
        </div>
      </section>

      <div className="page-shell section">
        <Callout
          title="Help make trustworthy science accessible."
          action={
            <Link className="btn btn-primary" to="/get-involved">
              Find your pathway
            </Link>
          }
        >
          Volunteer, mentor, share a story, form a partnership, or attend an
          upcoming event.
        </Callout>
      </div>
    </>
  );
}
