import { BookOpen, Flask, Globe, UsersThree } from "@phosphor-icons/react";
import { useState } from "react";
import {
  ChoiceGroup,
  SecureForm,
  TextAreaField,
  TextField,
} from "../components/SecureForm";
import {
  Callout,
  PageHeader,
  SectionHeading,
  Seo,
} from "../components/PageElements";

const internActivities = [
  "Create educational videos",
  "Create graphics, animations, and infographics",
  "Write articles and social content",
  "Interview patients, survivors, caregivers, researchers, and healthcare professionals",
  "Create content for YouTube, Facebook, Instagram, and the CancerQuest website",
  "Support community outreach and awareness events",
  "Contribute translation",
  "Help plan community seminars",
] as const;

const participationBenefits = [
  "Hands-on scientific communication experience",
  "Learn how to translate research for the public",
  "Build leadership, teamwork, and project management skills",
  "Develop a professional portfolio",
  "Explore careers across medicine, research, public health, communication, education, and media",
  "Make a meaningful impact",
] as const;

const educationGroups = [
  {
    label: "US and Canada",
    options: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
  },
  {
    label: "Cambridge",
    options: [
      "O-Level Year 1",
      "O-Level Year 2",
      "AS-Level",
      "A-Level Year 1",
      "A-Level Year 2",
    ],
  },
  {
    label: "International Baccalaureate",
    options: ["IB MYP", "IB DP Year 1", "IB DP Year 2"],
  },
  {
    label: "Other Secondary",
    options: ["Equivalent 9-10", "Equivalent 11-12", "Other"],
  },
] as const;

const interestGroups = [
  {
    title: "Scientific Research & Writing",
    name: "scientificResearchWriting",
    options: [
      "Researching cancer biology topics",
      "Reading scientific literature",
      "Writing educational articles",
      "Fact-checking",
      "Translating research",
    ],
  },
  {
    title: "Video & Media Production",
    name: "videoMediaProduction",
    options: [
      "Video recording and editing",
      "YouTube content",
      "Podcast production",
      "Photography",
      "Interviewing",
    ],
  },
  {
    title: "Graphic Design & Social Media",
    name: "graphicDesignSocialMedia",
    options: [
      "Infographics",
      "Social content",
      "Instagram",
      "Facebook",
      "Thumbnail design",
      "Canva",
    ],
  },
  {
    title: "Website & Digital Content",
    name: "websiteDigitalContent",
    options: ["Website content", "Blog writing", "Content organization", "SEO"],
  },
  {
    title: "Community Outreach",
    name: "communityOutreach",
    options: [
      "Education events",
      "Awareness seminars",
      "Public speaking",
      "Event planning",
      "Volunteer coordination",
      "Fundraising",
    ],
  },
  {
    title: "Healthcare & Patient Storytelling",
    name: "healthcarePatientStorytelling",
    options: [
      "Interviewing survivors",
      "Interviewing caregivers",
      "Interviewing patients",
      "Interviewing healthcare professionals",
      "Patient education materials",
    ],
  },
] as const;

const skills = [
  "Writing",
  "Public speaking",
  "Graphic design",
  "Video editing",
  "Photography",
  "Social media management",
  "Research experience",
  "Programming",
  "Website design",
  "Leadership experience",
  "None yet, interested in learning",
] as const;

function InternshipApplicationForm() {
  const [age, setAge] = useState("");
  const [participation, setParticipation] = useState("");
  const ageNumber = Number(age);
  const requiresGuardian = age !== "" && ageNumber < 18;

  function validate(form: HTMLFormElement) {
    const enteredAge = Number(
      new FormData(form).get("studentAge")?.toString() ?? "",
    );
    if (!Number.isFinite(enteredAge) || enteredAge < 15) {
      return "Applicants must be at least 15 by the internship start date.";
    }
    if (enteredAge < 18) {
      const formData = new FormData(form);
      const hasGuardianContact = [
        "guardianOneName",
        "guardianOneEmail",
        "guardianTwoName",
        "guardianTwoEmail",
      ].some((field) => formData.get(field)?.toString().trim());
      if (!hasGuardianContact) {
        return "Provide at least one parent or guardian contact for an applicant under 18.";
      }
      const parentSignature = (
        form.elements.namedItem("parentSignature") as HTMLInputElement | null
      )?.value.trim();
      const parentSignatureDate = (
        form.elements.namedItem(
          "parentSignatureDate",
        ) as HTMLInputElement | null
      )?.value;
      if (!parentSignature || !parentSignatureDate) {
        return "A parent or guardian signature and date are required for applicants under 18.";
      }
    }
    return null;
  }

  return (
    <SecureForm
      formName="internship-application"
      submitLabel="Send application"
      onValidate={validate}
    >
      <section className="form-section">
        <h3 className="display text-2xl font-bold">Student information</h3>
        <div className="grid gap-5 md:grid-cols-3">
          <TextField label="Last name" name="lastName" required />
          <TextField label="First name" name="firstName" required />
          <TextField label="Middle initial" name="middleInitial" />
          <TextField label="Preferred name" name="preferredName" />
          <TextField label="Date of birth" name="dateOfBirth" type="date" required />
          <div className="field">
            <label htmlFor="studentAge">Student age *</label>
            <input
              className="input"
              id="studentAge"
              name="studentAge"
              type="number"
              min="15"
              max="120"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              required
            />
            <p className="helper">Minimum age is 15 by the internship start date.</p>
          </div>
        </div>
        <div className="field">
          <label htmlFor="gradeLevel">Current grade level *</label>
          <select className="input" id="gradeLevel" name="gradeLevel" required>
            <option value="">Select a grade level</option>
            {educationGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option} value={`${group.label}: ${option}`}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <TextField
          label="Other grade level"
          name="otherGradeLevel"
          helper="Complete this field if you selected Other."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="School name" name="schoolName" required />
          <TextField
            label="City, state, and country"
            name="location"
            required
          />
          <TextField
            label="Student email"
            name="studentEmail"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Student phone"
            name="studentPhone"
            type="tel"
            autoComplete="tel"
          />
          <TextField label="Mother or guardian name" name="guardianOneName" />
          <TextField
            label="Mother or guardian email"
            name="guardianOneEmail"
            type="email"
          />
          <TextField label="Father or guardian name" name="guardianTwoName" />
          <TextField
            label="Father or guardian email"
            name="guardianTwoEmail"
            type="email"
          />
        </div>
        <p className="helper">
          Parent or guardian fields are optional for adult applicants. For
          applicants under 18, provide at least one parent or guardian contact.
        </p>
      </section>

      <section className="form-section">
        <h3 className="display text-2xl font-bold">Program preferences</h3>
        <ChoiceGroup
          legend="Internship cycle"
          name="internshipCycle"
          type="radio"
          required
          options={[
            { label: "Summer Internship, deadline March 15", value: "Summer" },
            { label: "Fall Internship, deadline July 15", value: "Fall" },
            { label: "Spring Internship, deadline December 15", value: "Spring" },
          ]}
        />
        <fieldset className="grid gap-3">
          <legend className="legend-label">Participation preference *</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {["In-Person", "Remote", "Hybrid"].map((option) => (
              <label
                className="flex min-h-11 items-center gap-3 rounded-[var(--radius-control)] border border-[var(--line)] bg-[var(--paper)] p-3"
                key={option}
              >
                <input
                  type="radio"
                  name="participationPreference"
                  value={option}
                  required
                  onChange={() => setParticipation(option)}
                  className="size-4"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
        {(participation === "In-Person" || participation === "Hybrid") && (
          <ChoiceGroup
            legend="Are you able to travel to the University of North Florida campus when needed?"
            name="unfTravelAvailability"
            type="radio"
            required
            options={["Yes", "No", "Occasionally"]}
          />
        )}
      </section>

      <section className="form-section">
        <h3 className="display text-2xl font-bold">Areas of Interest</h3>
        {interestGroups.map((group) => (
          <ChoiceGroup
            key={group.name}
            legend={group.title}
            name={group.name}
            options={group.options}
          />
        ))}
        <ChoiceGroup
          legend="Translation & International Outreach"
          name="translationInternationalOutreach"
          options={["Spanish", "Arabic", "Urdu", "Chinese", "Turkish", "Other"]}
        />
        <TextField
          label="Other translation language"
          name="otherTranslationLanguage"
        />
      </section>

      <section className="form-section">
        <h3 className="display text-2xl font-bold">Skills & Experience</h3>
        <ChoiceGroup
          legend="Select all that apply"
          name="skillsExperience"
          options={skills}
          required
        />
        <TextField label="Other skills" name="otherSkills" />
      </section>

      <section className="form-section">
        <h3 className="display text-2xl font-bold">Availability</h3>
        <ChoiceGroup
          legend="Hours available each week"
          name="hoursPerWeek"
          type="radio"
          required
          options={["2-4", "5-8", "8-12", "12+"]}
        />
        <ChoiceGroup
          legend="Days available"
          name="daysAvailable"
          required
          options={[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ]}
        />
      </section>

      <section className="form-section">
        <h3 className="display text-2xl font-bold">Short responses</h3>
        <TextAreaField
          label="Why are you interested in joining Cellular Journeys–CancerQuest?"
          name="whyInterested"
          required
        />
        <TextAreaField
          label="What do you hope to learn from this internship?"
          name="hopeToLearn"
          required
        />
        <TextAreaField
          label="Describe a project, activity, class, volunteer experience, or personal interest that you are particularly proud of."
          name="proudExperience"
          required
        />
        <TextAreaField
          label="What area of the internship most excites you and why?"
          name="mostExcitingArea"
          required
        />
      </section>

      <section className="form-section">
        <h3 className="display text-2xl font-bold">Optional reference</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="Reference name" name="referenceName" />
          <TextField
            label="Reference email"
            name="referenceEmail"
            type="email"
          />
        </div>
      </section>

      <section className="form-section">
        <h3 className="display text-2xl font-bold">Certification and signatures</h3>
        <label className="flex items-start gap-3 rounded-[var(--radius-control)] border border-[var(--line)] p-4">
          <input
            type="checkbox"
            name="certification"
            value="Certified"
            required
            className="mt-1 size-4"
          />
          <span>
            I certify that the information in this application is complete and
            accurate. *
          </span>
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            label="Student signature, typed full name"
            name="studentSignature"
            required
          />
          <TextField
            label="Student signature date"
            name="studentSignatureDate"
            type="date"
            required
          />
          <TextField
            label={`Parent or guardian signature${requiresGuardian ? "" : ", if applicant is under 18"}`}
            name="parentSignature"
            required={requiresGuardian}
          />
          <TextField
            label={`Parent or guardian signature date${requiresGuardian ? "" : ", if applicant is under 18"}`}
            name="parentSignatureDate"
            type="date"
            required={requiresGuardian}
          />
        </div>
        {requiresGuardian && (
          <p className="font-bold text-[var(--brand-strong)]">
            A parent or guardian signature and date are required because the
            applicant is under 18.
          </p>
        )}
      </section>
    </SecureForm>
  );
}

function ConsentForm() {
  const initialItems = [
    ["consentToParticipate", "Consent to participate"],
    ["photoRelease", "Photography authorization"],
    ["videoRelease", "Video recording authorization"],
    ["audioRelease", "Audio recording authorization"],
    ["publicationRelease", "Website and social media publication authorization"],
    ["publicEngagementConsent", "Interview and public engagement consent"],
    ["confidentialityAgreement", "Confidentiality agreement"],
    ["liabilityWaiver", "Assumption of risk and liability waiver"],
    ["medicalAuthorization", "Medical and emergency authorization"],
  ] as const;

  return (
    <SecureForm
      formName="parent-guardian-consent"
      submitLabel="Send consent form"
    >
      <section className="form-section">
        <h3 className="display text-2xl font-bold">Participant information</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField label="Student name" name="studentName" required />
          <TextField label="Student date of birth" name="studentDob" type="date" required />
          <TextField
            label="Parent or guardian name"
            name="parentGuardianName"
            required
          />
          <TextField
            label="Parent or guardian email"
            name="parentGuardianEmail"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Parent or guardian phone"
            name="parentGuardianPhone"
            type="tel"
            autoComplete="tel"
            required
          />
        </div>
      </section>
      <section className="form-section">
        <h3 className="display text-2xl font-bold">
          Emergency and medical information
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            label="Emergency contact name"
            name="emergencyContactName"
            required
          />
          <TextField
            label="Emergency contact phone"
            name="emergencyContactPhone"
            type="tel"
            required
          />
        </div>
        <TextAreaField
          label="Medical conditions or allergies"
          name="medicalConditionsAllergies"
          helper="Enter None if there are no known conditions or allergies."
          required
        />
      </section>
      <section className="form-section">
        <h3 className="display text-2xl font-bold">
          Consent, release, and authorization
        </h3>
        {/* TODO(client): replace section labels with approved legal language before launch. */}
        <p className="rounded-[var(--radius-panel)] border border-[var(--line)] bg-[var(--surface-soft)] p-4 text-muted">
          Final approved legal language is required before launch. Initial each
          item to record acknowledgment of the listed consent area.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {initialItems.map(([name, label]) => (
            <TextField
              key={name}
              label={`${label}, initials`}
              name={name}
              required
            />
          ))}
        </div>
      </section>
      <section className="form-section">
        <h3 className="display text-2xl font-bold">Final signatures</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            label="Parent or guardian signature, typed full name"
            name="parentGuardianSignature"
            required
          />
          <TextField
            label="Parent or guardian signature date"
            name="parentGuardianSignatureDate"
            type="date"
            required
          />
          <TextField
            label="Student signature, typed full name"
            name="studentSignature"
            required
          />
          <TextField
            label="Student signature date"
            name="studentSignatureDate"
            type="date"
            required
          />
        </div>
      </section>
    </SecureForm>
  );
}

const cohortPhotos = [
  {
    src: "/images/in-cohort.webp",
    alt: "Cellular Journeys summer interns working together around a table.",
  },
  {
    src: "/images/in-worksession.webp",
    alt: "Interns collaborating during a summer program work session.",
  },
  {
    src: "/images/in-group.webp",
    alt: "Cellular Journeys summer internship cohort gathered as a group.",
  },
  {
    src: "/images/in-welcome.webp",
    alt: "Hand-drawn welcome board greeting the Cellular Journeys interns.",
  },
  {
    src: "/images/in-shirts.webp",
    alt: "Cellular Journeys branded shirts prepared for the intern cohort.",
  },
  {
    src: "/images/in-poster.webp",
    alt: "Cancer-prevention education poster created during the internship.",
  },
] as const;

export function InternshipPage() {
  return (
    <>
      <Seo
        title="Internship Program"
        description="Explore the Cellular Journeys and CancerQuest internship program, eligibility, cycles, application, and parent or guardian consent form."
      />
      <PageHeader
        title="Learn science communication by doing it."
        intro="Interns turn research and health information into accessible education for communities around the world."
      >
        <a className="btn btn-primary" href="#application">
          Apply
        </a>
        <a className="btn btn-secondary" href="#consent">
          Consent form
        </a>
      </PageHeader>

      <section className="page-shell section grid items-center gap-10 md:grid-cols-2">
        <img
          src="/images/cellular-journeys-internship.webp"
          alt="A student using a microscope and taking notes in a teaching laboratory"
          width="1536"
          height="1024"
          loading="lazy"
          className="program-image aspect-[4/3] w-full object-cover"
        />
        <div>
          <SectionHeading title="About the program" />
          <p className="mt-5 text-lg leading-8 text-muted">
            Cellular Journeys advances cancer education, scientific literacy,
            research awareness, and community engagement. CancerQuest is an
            internationally recognized cancer education platform originally
            developed at Emory University and acquired by Cellular Journeys
            Inc. in September 2025.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-soft)]">
        <div className="page-shell section">
          <SectionHeading
            title="Summer 2026 Cohort"
            intro="Highlights from our first summer high school internship cohort."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cohortPhotos.map((photo) => (
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

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell section grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="What Interns Do" />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {internActivities.map((item) => (
                <div className="activity-item" key={item}>
                  <Flask
                    size={24}
                    weight="duotone"
                    className="text-[var(--brand)]"
                    aria-hidden
                  />
                  <p className="mt-3 font-bold leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Why Participate" />
            <div className="mt-7 grid gap-4">
              {participationBenefits.map((item) => (
                <div className="flex gap-4" key={item}>
                  <BookOpen
                    size={25}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-[var(--brand)]"
                    aria-hidden
                  />
                  <p className="leading-7 text-muted">{item}</p>
                </div>
              ))}
            </div>
            <div className="philosophy-panel mt-9">
              <h3 className="display text-2xl font-bold">Program Philosophy</h3>
              {/* TODO(client): provide the approved Program Philosophy paragraph. */}
              <p className="mt-3 text-muted">
                The approved Program Philosophy paragraph is coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section">
        <SectionHeading
          title="Eligibility"
          intro="The program welcomes students across educational systems and geographic locations."
        />
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="eligibility-item featured">
            <UsersThree
              size={30}
              weight="duotone"
              className="text-[var(--brand)]"
              aria-hidden
            />
            <h3 className="mt-4 text-xl font-bold">Age and education</h3>
            <p className="mt-3 leading-7 text-muted">
              Applicants must be at least 15 by the internship start date.
              Eligible students include High School Grades 9-12, O/AS/A-Level,
              IB, Community College, Undergraduate, Graduate or Professional,
              and recent graduates serving as volunteers or mentors.
            </p>
          </article>
          <article className="eligibility-item">
            <Globe
              size={30}
              weight="duotone"
              className="text-[var(--brand)]"
              aria-hidden
            />
            <h3 className="mt-4 text-xl font-bold">Location and technology</h3>
            <p className="mt-3 leading-7 text-muted">
              Applicants may live in any country. In-person and remote
              participation are available. Remote participants need reliable
              internet access and a device.
            </p>
          </article>
          <article className="eligibility-item">
            <BookOpen
              size={30}
              weight="duotone"
              className="text-[var(--brand)]"
              aria-hidden
            />
            <h3 className="mt-4 text-xl font-bold">Experience</h3>
            <p className="mt-3 leading-7 text-muted">
              No prior experience is required. Selection considers interest and
              enthusiasm, commitment and availability, communication skills,
              alignment of interests with projects, and potential for growth.
            </p>
          </article>
        </div>
        <div className="qualification-note mt-6">
          {/* TODO(client): provide the approved required qualities and preferred qualifications lists. */}
          <h3 className="text-xl font-bold">
            Required qualities and preferred qualifications
          </h3>
          <p className="mt-3 text-muted">
            The detailed approved lists are coming soon.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-soft)]">
        <div className="page-shell section">
          <SectionHeading
            title="Internship Cycles"
            intro="Applications are reviewed on a rolling basis after each deadline."
          />
          <div className="mt-8 overflow-x-auto rounded-[var(--radius-panel)] border border-[var(--line)] bg-[var(--surface)]">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead className="bg-[var(--surface-soft)]">
                <tr>
                  <th className="p-4">Cycle</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Application Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 font-bold">Summer Internship</td>
                  <td className="p-4">6-10 Weeks</td>
                  <td className="p-4">March 15</td>
                </tr>
                <tr className="bg-[var(--paper)]">
                  <td className="p-4 font-bold">Fall Internship</td>
                  <td className="p-4">12 Weeks</td>
                  <td className="p-4">July 15</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Spring Internship</td>
                  <td className="p-4">12 Weeks</td>
                  <td className="p-4">December 15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-shell section" id="application">
        <SectionHeading
          title="Internship Application"
          intro="Complete all required sections. Information is sent privately to Cellular Journeys and is not stored in the public website."
        />
        <div className="mt-9">
          <InternshipApplicationForm />
        </div>
      </section>

      <section
        className="border-y border-[var(--line)] bg-[var(--surface)]"
        id="consent"
      >
        <div className="page-shell section">
          <SectionHeading
            title="Parent/Guardian Consent, Media Release & Liability Form"
            intro="A parent or guardian should complete this form for a participant under 18."
          />
          <div className="mt-8">
            <Callout title="Legal review needed">
              The client must provide approved release, confidentiality,
              liability, and medical authorization language before launch. The
              form below captures the required fields without publishing
              unapproved legal terms.
            </Callout>
          </div>
          <div className="mt-9">
            <ConsentForm />
          </div>
        </div>
      </section>
    </>
  );
}
