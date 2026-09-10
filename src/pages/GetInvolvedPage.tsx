import {
  CalendarCheck,
  ChalkboardTeacher,
  HandHeart,
  Handshake,
  Heart,
  Megaphone,
  ShareNetwork,
  Student,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  ChoiceGroup,
  FileField,
  SecureForm,
  SelectField,
  TextAreaField,
  TextField,
} from "../components/SecureForm";
import {
  IconCard,
  PageHeader,
  SectionHeading,
  Seo,
} from "../components/PageElements";
import { useOpenHashTarget } from "../components/useOpenHashTarget";

const volunteerAreas = [
  "Community outreach",
  "Events",
  "Social media",
  "Translation",
  "Student support",
  "Educational content",
] as const;

const mentorHelp = [
  "Share career insights",
  "Student workshops",
  "Professional development guidance",
  "Support student projects",
  "Guest speaker",
] as const;

const sponsorshipPrograms = [
  "Student Internship Program",
  "Cancer Education Initiatives",
  "Community Outreach Programs",
  "Educational Media Projects",
] as const;

function FormDisclosure({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="surface p-6" id={id}>
      <summary className="cursor-pointer text-xl font-bold">{title}</summary>
      <div className="mt-7">{children}</div>
    </details>
  );
}

export function GetInvolvedPage() {
  useOpenHashTarget();

  return (
    <>
      <Seo
        title="Get Involved"
        description="Volunteer, intern, mentor, share your story, partner, sponsor, attend events, or follow Cellular Journeys."
      />
      <PageHeader
        title="Bring your time, experience, or support."
        intro="Choose a pathway that fits your interests and help advance cancer education, scientific literacy, and community impact."
      />

      <section className="page-shell section">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <IconCard
            icon={HandHeart}
            title="Become a Volunteer"
            action={{ label: "Volunteer form", to: "#volunteer" }}
          >
            Support outreach, events, education, translation, and student
            programs.
          </IconCard>
          <IconCard
            icon={Student}
            title="Apply for an Internship"
            action={{ label: "Internship Program", to: "/internship" }}
          >
            Gain hands-on science communication and project experience.
          </IconCard>
          <IconCard
            icon={ChalkboardTeacher}
            title="Become a Mentor"
            action={{ label: "Mentor form", to: "#mentor" }}
          >
            Share career insights and guide student learning.
          </IconCard>
          <IconCard
            icon={Megaphone}
            title="Share Your Story"
            action={{ label: "Story form", to: "#story" }}
          >
            Contribute an experience as a survivor, caregiver, professional,
            student, or community member.
          </IconCard>
          <IconCard
            icon={Handshake}
            title="Partner With Us"
            action={{ label: "Partnership form", to: "#partner" }}
          >
            Explore education, outreach, research awareness, or community
            collaboration.
          </IconCard>
          <IconCard
            icon={Heart}
            title="Sponsor a Program"
            action={{ label: "Sponsor form", to: "#sponsor" }}
          >
            Support internships, education, outreach, or educational media.
          </IconCard>
          <IconCard
            icon={CalendarCheck}
            title="Attend an Event"
            action={{ label: "View events", to: "/events" }}
          >
            Join an upcoming community event, seminar, or student program.
          </IconCard>
          <IconCard
            icon={ShareNetwork}
            title="Follow and Share"
            action={{ label: "Our Platforms", to: "/platforms" }}
          >
            Connect with CancerQuest and Cellular Journeys online.
          </IconCard>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-soft)]">
        <div className="page-shell section">
          <SectionHeading
            title="Interest forms"
            intro="Select a form below. Submissions are sent privately to the organization and are not published."
          />
          <div className="mt-8 grid gap-5">
            <FormDisclosure id="volunteer" title="Volunteer Interest Form">
              <SecureForm formName="volunteer-interest" submitLabel="Send interest">
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
                  legend="Areas of interest"
                  name="areasOfInterest"
                  options={volunteerAreas}
                  required
                />
                <TextAreaField label="Message" name="message" />
              </SecureForm>
            </FormDisclosure>

            <FormDisclosure id="mentor" title="Mentor Sign-Up Form">
              <SecureForm formName="mentor-sign-up" submitLabel="Send sign-up">
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
                    label="Profession or expertise"
                    name="expertise"
                    required
                  />
                </div>
                <ChoiceGroup
                  legend="How would you like to help?"
                  name="waysToHelp"
                  options={mentorHelp}
                  required
                />
              </SecureForm>
            </FormDisclosure>

            <FormDisclosure id="story" title="Share Your Story Form">
              <SecureForm formName="story-submission" submitLabel="Send story">
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField label="Name" name="name" required />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
                <SelectField
                  label="Relationship to Cellular Journeys"
                  name="relationship"
                  required
                >
                  {[
                    "Survivor",
                    "Caregiver",
                    "Healthcare professional",
                    "Student",
                    "Community member",
                  ].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </SelectField>
                <TextAreaField label="Your story" name="story" required />
                <FileField
                  label="Optional media upload"
                  name="media"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  helper="Accepted formats: JPG, PNG, WebP, or PDF. Maximum 4 MB."
                />
                <label className="flex items-start gap-3 rounded-[var(--radius-control)] border border-[var(--line)] p-4">
                  <input
                    type="checkbox"
                    name="mediaConsent"
                    value="I consent to review of the uploaded media"
                    required
                    className="mt-1 size-4"
                  />
                  <span>
                    I consent to Cellular Journeys reviewing the submitted story
                    and any uploaded media. *
                  </span>
                </label>
              </SecureForm>
            </FormDisclosure>

            <FormDisclosure id="partner" title="Partnership Inquiry Form">
              <SecureForm formName="partnership-inquiry" submitLabel="Send inquiry">
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="Organization name"
                    name="organization"
                    required
                  />
                  <TextField label="Contact name" name="contactName" required />
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
                    label="Type of partnership"
                    name="partnershipType"
                    required
                  />
                </div>
                <TextAreaField label="Message" name="message" required />
              </SecureForm>
            </FormDisclosure>

            <FormDisclosure id="sponsor" title="Sponsorship Inquiry Form">
              <SecureForm formName="sponsorship-inquiry" submitLabel="Send inquiry">
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="Organization name"
                    name="organization"
                    required
                  />
                  <TextField label="Contact name" name="contactName" required />
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
                <ChoiceGroup
                  legend="Program interests"
                  name="programInterests"
                  options={sponsorshipPrograms}
                  required
                />
                <TextAreaField label="Message" name="message" required />
              </SecureForm>
            </FormDisclosure>
          </div>
        </div>
      </section>

      <section className="page-shell section">
        <div className="surface flex flex-col items-start gap-5 bg-[var(--surface)] p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <h2 className="display text-3xl font-bold">
              Looking for another way to help?
            </h2>
            <p className="mt-2 text-muted">
              Use the contact form for general questions or new ideas.
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
