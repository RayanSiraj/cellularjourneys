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
        <aside className="address-panel">
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
          <h2 className="mt-6 text-xl font-bold">Contact</h2>
          <div className="mt-3 grid gap-1 leading-7 text-muted">
            <p className="font-bold text-[var(--ink)]">Fatima K. Rehman, Ph.D.</p>
            <p>
              <a className="brand-link font-bold" href="mailto:cellularjourneys@gmail.com">
                cellularjourneys@gmail.com
              </a>
            </p>
            <p>
              <a className="brand-link font-bold" href="tel:+13123435386">
                (312) 343-5386
              </a>
            </p>
          </div>
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
