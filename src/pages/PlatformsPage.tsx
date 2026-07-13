import {
  ArrowSquareOut,
  FacebookLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { PageHeader, SectionHeading, Seo } from "../components/PageElements";
import { platforms } from "../data/content";

const comingSoon = [
  "CellularJourneys.org",
  "Additional multilingual resources",
  "New video series",
  "Community engagement initiatives",
  "Student-led science communication projects",
  "Virtual learning opportunities",
] as const;

function platformIcon(name: string): Icon {
  if (name.startsWith("YouTube")) return YoutubeLogo;
  if (name.startsWith("Facebook")) return FacebookLogo;
  if (name.startsWith("Instagram")) return InstagramLogo;
  if (name.startsWith("LinkedIn")) return LinkedinLogo;
  if (name.startsWith("CancerQuest")) return Globe;
  return Globe;
}

export function PlatformsPage() {
  return (
    <>
      <Seo
        title="Our Platforms"
        description="Explore Cellular Journeys and CancerQuest education across the web, video, and social platforms."
      />
      <PageHeader
        title="Education that meets people where they are."
        intro="Find cancer education, biology learning, interviews, community updates, and multilingual resources across our platforms."
      />

      <section className="page-shell section">
        <div className="grid gap-5 md:grid-cols-2">
          {platforms.map((platform, index) => {
            const PlatformIcon = platformIcon(platform.name);
            return (
              <article
                key={platform.name}
                className={`platform-card ${
                  index === 0
                    ? "featured md:col-span-2 md:grid md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-10"
                    : ""
                }`}
              >
                <div>
                  <PlatformIcon
                    size={34}
                    weight="duotone"
                    className="text-[var(--brand)]"
                    aria-hidden
                  />
                  <p className="mt-5 text-sm font-bold text-[var(--muted)]">
                    {platform.type}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">{platform.name}</h2>
                </div>
                <div>
                  <p className="mt-4 leading-7 text-muted md:mt-0">
                    {platform.description}
                  </p>
                  <a
                    className="btn btn-secondary mt-6"
                    href={platform.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit platform <ArrowSquareOut size={18} aria-hidden />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section">
          <SectionHeading
            title="Coming Soon"
            intro="The organization is continuing to expand its education and community programs."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((item) => (
              <div
                className="coming-soon-item"
                key={item}
              >
                <Globe
                  size={26}
                  weight="duotone"
                  className="shrink-0 text-[var(--brand)]"
                  aria-hidden
                />
                <p className="font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
