import { MapPin } from "@phosphor-icons/react";
import {
  SecureForm,
  SelectField,
  TextAreaField,
  TextField,
} from "../components/SecureForm";
import { PageHeader, Seo } from "../components/PageElements";

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact Cellular Journeys about programs, governance, partnerships, media, or general questions."
      />
      <PageHeader
        title="Contact Us"
        intro="Send a question about programs, governance, partnerships, or media."
      />
      <section className="page-shell section grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="surface h-fit bg-[var(--surface-soft)] p-7">
          <MapPin
            size={32}
            weight="duotone"
            className="text-[var(--brand)]"
            aria-hidden
          />
          <h2 className="mt-5 text-xl font-bold">Organizational address</h2>
          <address className="mt-3 not-italic leading-7 text-muted">
            1 UNF Drive, Building 59
            <br />
            University of North Florida
            <br />
            Jacksonville, FL 32224
          </address>
          {/* TODO(client): provide the public contact email and phone number. */}
          <p className="mt-6 text-sm text-muted">
            Public email and phone details are coming soon.
          </p>
        </aside>
        <div className="form-section">
          <SecureForm formName="contact" submitLabel="Send message">
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
            <SelectField label="Subject or topic" name="topic" required>
              {[
                "General Inquiry",
                "Governance/Finances",
                "Programs",
                "Partnership",
                "Media/Press",
              ].map((topic) => (
                <option value={topic} key={topic}>
                  {topic}
                </option>
              ))}
            </SelectField>
            <TextAreaField label="Message" name="message" required />
          </SecureForm>
        </div>
      </section>
    </>
  );
}
