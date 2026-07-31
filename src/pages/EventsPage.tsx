import {
  ArrowSquareOut,
  FacebookLogo,
  InstagramLogo,
  Megaphone,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  SecureForm,
  SelectField,
  TextAreaField,
  TextField,
} from "../components/SecureForm";
import {
  PageHeader,
  SectionHeading,
  Seo,
} from "../components/PageElements";
import { communityPresentations } from "../data/content";
import { useOpenHashTarget } from "../components/useOpenHashTarget";

const INSTAGRAM_URL = "https://www.instagram.com/cellularjourneys/";
const FACEBOOK_URL = "https://www.facebook.com/CancerQuest/";

const pastEventPhotos = [
  {
    src: "/images/pe-booth.webp",
    alt: "Cellular Journeys team members in branded shirts at a community cancer-awareness table.",
  },
  {
    src: "/images/pe-group.webp",
    alt: "Cellular Journeys team and students gathered at a community education event.",
  },
  {
    src: "/images/pe-poster-water.webp",
    alt: "Cancer-awareness education poster on water quality and environmental exposures.",
  },
  {
    src: "/images/pe-poster-incidence.webp",
    alt: "Cancer incidence education poster shared with the community.",
  },
] as const;

export function EventsPage() {
  useOpenHashTarget();

  return (
    <>
      <Seo
        title="Past Events"
        description="See highlights from past Cellular Journeys community education events, and follow us on social media for upcoming event announcements."
      />
      <PageHeader
        title="Past events"
        intro="A look back at recent Cellular Journeys community education, outreach, and student program activities."
      />

      <section className="page-shell section">
        <article className="event-feature">
          <div className="p-7 md:p-10">
            <div className="flex items-center gap-3">
              <Megaphone
                size={34}
                weight="duotone"
                className="text-[var(--brand)]"
                aria-hidden
              />
              <h2 className="display text-3xl font-bold">
                Upcoming event announcements
              </h2>
            </div>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
              We announce upcoming events, seminars, and community programs on
              our social media. Follow us to stay up to date.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                className="btn btn-primary inline-flex items-center gap-2"
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
              >
                <FacebookLogo size={20} weight="fill" aria-hidden />
                Facebook
                <ArrowSquareOut size={16} aria-hidden />
              </a>
              <a
                className="btn btn-secondary inline-flex items-center gap-2"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                <InstagramLogo size={20} weight="fill" aria-hidden />
                Instagram
                <ArrowSquareOut size={16} aria-hidden />
              </a>
            </div>
          </div>
        </article>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section">
          <SectionHeading
            title="Event highlights"
            intro="Moments from recent community education events and student program activities."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pastEventPhotos.map((photo) => (
              <figure className="highlight-card" key={photo.src}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section">
        <SectionHeading
          title="Community Presentations"
          intro="Organizations and community groups can request a speaker for one of these seminars."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communityPresentations.map((topic) => (
            <div className="topic-item" key={topic}>
              <Megaphone
                size={26}
                weight="duotone"
                className="shrink-0 text-[var(--brand)]"
                aria-hidden
              />
              <p className="font-bold">{topic}</p>
            </div>
          ))}
        </div>

        <details className="surface mt-8 p-6" id="speaker-request">
          <summary className="cursor-pointer text-xl font-bold">
            Request a Speaker
          </summary>
          <div className="mt-7">
            <SecureForm formName="speaker-request" submitLabel="Send request">
              <div className="grid gap-5 md:grid-cols-2">
                <TextField label="Name" name="name" required />
                <TextField label="Organization" name="organization" required />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                />
                <SelectField
                  label="Preferred topic"
                  name="preferredTopic"
                  required
                >
                  {communityPresentations.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </SelectField>
                <TextField
                  label="Preferred dates"
                  name="preferredDates"
                  required
                />
              </div>
              <TextAreaField label="Message" name="message" required />
            </SecureForm>
          </div>
        </details>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--surface-soft)]">
        <div className="page-shell flex flex-col items-start gap-5 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display text-3xl font-bold">Suggest an Event</h2>
            <p className="mt-2 text-muted">
              Share an outreach, education, or community event idea.
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
