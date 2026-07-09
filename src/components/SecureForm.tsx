import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import {
  type FormEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

type Attachment = {
  filename: string;
  content: string;
  contentType: string;
};

async function encodeFile(file: File): Promise<Attachment> {
  if (file.size > 4 * 1024 * 1024) {
    throw new Error("Media files must be 4 MB or smaller.");
  }
  const result = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("The media file could not be read."));
    reader.readAsDataURL(file);
  });
  return {
    filename: file.name,
    content: result.split(",")[1] ?? "",
    contentType: file.type || "application/octet-stream",
  };
}

export function SecureForm({
  formName,
  children,
  submitLabel = "Send",
  onValidate,
}: {
  formName: string;
  children: ReactNode;
  submitLabel?: string;
  onValidate?: (form: HTMLFormElement) => string | null;
}) {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const requiredCheckboxGroups = form.querySelectorAll<HTMLElement>(
      '[data-required-checkbox-group="true"]',
    );
    for (const group of requiredCheckboxGroups) {
      if (!group.querySelector<HTMLInputElement>('input[type="checkbox"]:checked')) {
        const firstCheckbox = group.querySelector<HTMLInputElement>(
          'input[type="checkbox"]',
        );
        firstCheckbox?.focus();
        setStatus({
          state: "error",
          message: "Select at least one option in each required checkbox group.",
        });
        return;
      }
    }
    const validationMessage = onValidate?.(form);
    if (validationMessage) {
      setStatus({ state: "error", message: validationMessage });
      return;
    }

    setStatus({ state: "submitting" });
    const data = new FormData(form);
    const fields: Record<string, string | string[]> = {};
    const attachments: Attachment[] = [];

    try {
      for (const [key, value] of data.entries()) {
        if (value instanceof File) {
          if (value.size > 0) attachments.push(await encodeFile(value));
          continue;
        }
        const existing = fields[key];
        if (existing === undefined) fields[key] = value;
        else if (Array.isArray(existing)) existing.push(value);
        else fields[key] = [existing, value];
      }

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName, fields, attachments }),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message || "The form could not be sent.");
      }
      form.reset();
      setStatus({
        state: "success",
        message: payload.message || "Your form was sent.",
      });
      formRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
    } catch (error: unknown) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The form could not be sent. Please try again.",
      });
    }
  }

  return (
    <form
      ref={formRef}
      className="grid gap-6"
      onSubmit={handleSubmit}
      noValidate={false}
    >
      <div className="hidden" aria-hidden>
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {children}
      <div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status.state === "submitting"}
        >
          {status.state === "submitting" ? "Sending..." : submitLabel}
        </button>
      </div>
      <div aria-live="polite">
        {status.state === "success" && (
          <p className="flex items-center gap-2 font-bold text-[var(--brand-strong)]">
            <CheckCircle size={22} weight="fill" aria-hidden />
            {status.message}
          </p>
        )}
        {status.state === "error" && (
          <p className="flex items-start gap-2 font-bold text-red-700 dark:text-red-300">
            <WarningCircle size={22} weight="fill" className="mt-0.5 shrink-0" aria-hidden />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

export function TextField({
  label,
  name,
  type = "text",
  required = false,
  helper,
  autoComplete,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  helper?: string;
  autoComplete?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        className="input"
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        min={min}
        max={max}
        aria-describedby={helper ? `${name}-helper` : undefined}
      />
      {helper && (
        <p className="helper" id={`${name}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  required = false,
  helper,
}: {
  label: string;
  name: string;
  required?: boolean;
  helper?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>
      <textarea
        className="input"
        id={name}
        name={name}
        required={required}
        aria-describedby={helper ? `${name}-helper` : undefined}
      />
      {helper && (
        <p className="helper" id={`${name}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  name,
  required = false,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </label>
      <select className="input" id={name} name={name} required={required}>
        <option value="">Select an option</option>
        {children}
      </select>
    </div>
  );
}

export function FileField({
  label,
  name,
  accept,
  helper,
}: {
  label: string;
  name: string;
  accept?: string;
  helper?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        className="input py-2"
        id={name}
        name={name}
        type="file"
        accept={accept}
        aria-describedby={helper ? `${name}-helper` : undefined}
      />
      {helper && (
        <p className="helper" id={`${name}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
}

export function ChoiceGroup({
  legend,
  name,
  options,
  type = "checkbox",
  required = false,
}: {
  legend: string;
  name: string;
  options: readonly (string | { label: string; value: string })[];
  type?: "checkbox" | "radio";
  required?: boolean;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="legend-label">
        {legend}
        {required ? " *" : ""}
      </legend>
      <div
        className="grid gap-3 sm:grid-cols-2"
        data-required-checkbox-group={required && type === "checkbox" ? "true" : undefined}
      >
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;
          const id = `${name}-${value}`.replace(/[^a-zA-Z0-9-]/g, "-");
          return (
            <label
              key={value}
              htmlFor={id}
              className="flex min-h-11 items-start gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-3"
            >
              <input
                id={id}
                name={name}
                type={type}
                value={value}
                required={required && type === "radio"}
                className="mt-1 size-4 accent-[#234c7c]"
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
