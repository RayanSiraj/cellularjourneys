import {
  ArrowRight,
  ArrowSquareOut,
  CalendarBlank,
  GlobeHemisphereWest,
  HandHeart,
  HandsClapping,
  ShieldCheck,
  Student,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SectionHeading, Seo } from "../components/PageElements";
import { platforms } from "../data/content";

type GatewayDestination = {
  title: string;
  description: string;
  href: string;
  icon: Icon;
  external?: boolean;
};

const gatewayDestinations: GatewayDestination[] = [
  {
    title: "CancerQuest",
    description: "Cancer education and resources",
    href: platforms[0].url,
    icon: GlobeHemisphereWest,
    external: true,
  },
  {
    title: "Biology Basics",
    description: "Biology lessons and scientific skills",
    href: platforms[2].url,
    icon: GlobeHemisphereWest,
    external: true,
  },
  {
    title: "Programs & events",
    description: "Upcoming education and community programs",
    href: "/events",
    icon: CalendarBlank,
  },
  {
    title: "Internships",
    description: "Program details, deadlines, and application",
    href: "/internship",
    icon: Student,
  },
  {
    title: "Get involved",
    description: "Volunteer, mentor, partner, or share your story",
    href: "/get-involved",
    icon: HandsClapping,
  },
  {
    title: "Support our work",
    description: "Ways to help sustain the mission",
    href: "/donate",
    icon: HandHeart,
  },
  {
    title: "Governance",
    description: "Board oversight and transparency",
    href: "/governance",
    icon: ShieldCheck,
  },
];

function GatewayCard({
  destination,
}: {
  destination: GatewayDestination;
}) {
  const IconComponent = destination.icon;
  const content = (
    <>
      <IconComponent
        size={28}
        weight="duotone"
        className="text-[var(--brand)]"
        aria-hidden
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold">{destination.title}</h3>
        <p className="mt-1 leading-6 text-muted">{destination.description}</p>
      </div>
      {destination.external ? (
        <ArrowSquareOut
          size={19}
          className="shrink-0 text-[var(--brand)]"
          aria-hidden
        />
      ) : (
        <ArrowRight
          size={19}
          className="shrink-0 text-[var(--brand)]"
          aria-hidden
        />
      )}
    </>
  );
  const className =
    "surface flex items-start gap-4 p-5 no-underline transition-transform hover:-translate-y-1";

  if (destination.external) {
    return (
      <a
        className={className}
        href={destination.href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={className} to={destination.href}>
      {content}
    </Link>
  );
}

export function HomePage() {
  return (
    <>
      <Seo
        title="Cancer education and scientific literacy"
        description="Cellular Journeys is a nonprofit advancing cancer education, scientific literacy, research awareness, and community impact."
      />
      <section className="page-shell grid items-center gap-8 py-8 md:grid-cols-[1fr_0.9fr] md:py-10">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
            Learn. Create. Inspire. Impact.
          </p>
          <h1 className="display mt-3 text-5xl font-bold leading-[1.03] md:text-6xl">
            Start your journey.
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-7 text-muted">
            Explore trusted cancer and biology education, find programs, or
            take action with Cellular Journeys.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn btn-primary" to="/platforms">
              Explore platforms <ArrowRight size={18} aria-hidden />
            </Link>
            <Link className="btn btn-secondary" to="/get-involved">
              Get involved
            </Link>
          </div>
        </div>
        <div className="cell-window h-64 md:h-96">
          <img
            src="/images/cellular-journeys-hero.webp"
            alt=""
            width="1536"
            height="1024"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section">
          <SectionHeading
            title="Where would you like to go?"
            intro="Choose a destination and move directly to the information or action you need."
          />
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gatewayDestinations.map((destination) => (
              <GatewayCard
                key={destination.title}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section">
        <div className="surface grid gap-6 bg-[var(--surface-soft)] p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
          <CalendarBlank
            size={34}
            weight="duotone"
            className="text-[var(--brand)]"
            aria-hidden
          />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--brand)]">
              Featured event
            </p>
            <h2 className="display mt-1 text-3xl font-bold">
              Cancer Awareness Fair
            </h2>
            <p className="mt-2 leading-7 text-muted">
              July 18, 2026 · Jacksonville, Florida
            </p>
          </div>
          <Link className="btn btn-secondary md:justify-self-end" to="/events">
            Event details
          </Link>
        </div>
      </section>
    </>
  );
}
