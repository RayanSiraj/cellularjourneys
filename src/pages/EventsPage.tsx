import {
  CalendarBlank,
  ImageSquare,
  MapPin,
  Megaphone,
  UsersThree,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  ChoiceGroup,
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
import {
  communityPresentations,
  recurringEvents,
  summerEvents,
} from "../data/content";
import { useOpenHashTarget } from "../components/useOpenHashTarget";

const signatureEvents = [
  "Cancer Awareness Fair",
  "Student Research & Communication Showcase",
  "CancerQuest Community Education Series",
  "Volunteer Appreciation Event",
] as const;

const volunteerOpportunities = [
  "Cancer Awareness Fair Volunteers, July 2026",
  "Social Media Volunteers, year-round",
  "Translators",
  "Student Mentors",
] as const;

const highlightPlaceholders = [
  "Internship Program Launch",
  "Community Outreach Presentation",
  "Cancer Survivor Interview Series",
] as const;

export function EventsPage() {
  useOpenHashTarget();

  return (
    <>
      <Seo
        title="Upcoming Events & Calendar"
        description="View Cellular Journeys events, community presentations, volunteer opportunities, and recurring annual programs."
      />
      <PageHeader
        title="Upcoming Events & Calendar"
        intro="Connect with cancer education, student learning, community outreach, and volunteer opportunities."
      />

      <section className="page-shell section">
        <article className="surface overflow-hidden bg-[var(--surface)]">
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-[var(--surface-soft)] p-7 md:p-10">
              <CalendarBlank
                size={38}
                weight="duotone"
                className="text-[var(--brand)]"
                aria-hidden
              />
              <p className="mt-6 text-lg font-bold">July 18, 2026</p>
              <p className="mt-2 flex items-center gap-2 text-muted">
                <MapPin size={20} aria-hidden />
                Jacksonville, Florida
              </p>
              <p className="mt-2 font-bold">Location: TBD</p>
            </div>
            <div className="p-7 md:p-10">
              <h2 className="display text-4xl font-bold">
                Cancer Awareness Fair
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                A community event focused on cancer education, awareness, and
                opportunities to connect with Cellular Journeys.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#event-registration">
                  Register
                </a>
                <a className="btn btn-secondary" href="#event-volunteer">
                  Volunteer
                </a>
                <Link className="btn btn-secondary" to="/get-involved#sponsor">
                  Sponsor
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section">
          <SectionHeading
            title="Summer 2026"
            intro="Program timing will be updated as event details are confirmed."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {summerEvents.map((entry, index) => (
              <article
                key={entry.month}
                className={`surface p-6 ${
                  index === 1 ? "bg-[var(--surface-soft)]" : ""
                }`}
              >
                <h3 className="display text-3xl font-bold">{entry.month}</h3>
                <div className="mt-5 grid gap-4">
                  {entry.items.map((item) => (
                    <p key={item} className="leading-7 text-muted">
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading title="Signature annual events" />
            <div className="mt-7 grid gap-3">
              {signatureEvents.map((event) => (
                <div
                  key={event}
                  className="rounded-lg border-l-4 border-[var(--brand)] bg-[var(--surface)] px-5 py-4 font-bold"
                >
                  {event}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Year at a glance" />
            <div className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {recurringEvents.map(([month, event]) => (
                <article key={`${month}-${event}`}>
                  <h3 className="font-bold text-[var(--brand-strong)]">{month}</h3>
                  <p className="mt-1 leading-7 text-muted">{event}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-soft)]">
        <div className="page-shell section">
          <SectionHeading
            title="Community Presentations"
            intro="Organizations and community groups can request a speaker for one of these seminars."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {communityPresentations.map((topic) => (
              <div className="surface flex items-center gap-4 p-5" key={topic}>
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
        </div>
      </section>

      <section className="page-shell section">
        <SectionHeading
          title="Volunteer Opportunities"
          intro="Support events, social content, translation, or student mentorship."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {volunteerOpportunities.map((item) => (
            <article className="surface p-5" key={item}>
              <UsersThree
                size={28}
                weight="duotone"
                className="text-[var(--brand)]"
                aria-hidden
              />
              <h3 className="mt-4 font-bold">{item}</h3>
            </article>
          ))}
        </div>

        <details className="surface mt-8 p-6" id="event-volunteer">
          <summary className="cursor-pointer text-xl font-bold">Sign Up</summary>
          <div className="mt-7">
            <SecureForm formName="event-volunteer" submitLabel="Send sign-up">
              <div className="grid gap-5 md:grid-cols-2">
                <TextField label="Name" name="name" required />
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
                <TextField
                  label="Availability"
                  name="availability"
                  required
                />
              </div>
              <ChoiceGroup
                legend="Volunteer interests"
                name="volunteerInterests"
                options={volunteerOpportunities}
                required
              />
              <ChoiceGroup
                legend="Translation languages, if applicable"
                name="languages"
                options={["Spanish", "Arabic", "Urdu", "Other language"]}
              />
              <TextField
                label="Other language"
                name="otherLanguage"
                helper="Complete this field if you selected Other language."
              />
              <TextAreaField label="Message" name="message" />
            </SecureForm>
          </div>
        </details>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section">
          <SectionHeading
            title="Recent Event Highlights"
            intro="Approved photographs and recaps will be added here as they become available."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {highlightPlaceholders.map((title) => (
              <article className="surface overflow-hidden" key={title}>
                {/* TODO(client): add a real, approved event photograph. */}
                <div className="flex aspect-[4/3] items-center justify-center bg-[var(--surface-soft)]">
                  <ImageSquare
                    size={52}
                    weight="duotone"
                    className="text-[var(--brand)]"
                    aria-label="Event photo coming soon"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    Photos and event details coming soon.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section" id="event-registration">
        <div className="form-section">
          <SectionHeading
            title="Register your interest"
            intro="Share your contact details to receive Cancer Awareness Fair updates as details are confirmed."
          />
          <SecureForm
            formName="cancer-awareness-fair-registration"
            submitLabel="Register interest"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TextField label="Name" name="name" required />
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
            </div>
            <TextAreaField label="Message" name="message" />
          </SecureForm>
        </div>
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
