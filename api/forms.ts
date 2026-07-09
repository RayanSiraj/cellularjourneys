interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status(code: number): ApiResponse;
  setHeader(name: string, value: string): void;
  json(body: Record<string, string>): void;
}

type Attachment = {
  filename: string;
  content: string;
  contentType: string;
};

type Submission = {
  formName: string;
  fields: Record<string, string | string[]>;
  attachments?: Attachment[];
};

const allowedForms = new Set([
  "speaker-request",
  "event-volunteer",
  "cancer-awareness-fair-registration",
  "volunteer-interest",
  "mentor-sign-up",
  "story-submission",
  "partnership-inquiry",
  "sponsorship-inquiry",
  "internship-application",
  "parent-guardian-consent",
  "contact",
]);

const allowedAttachmentTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const requiredFields: Record<string, string[]> = {
  "speaker-request": [
    "name",
    "organization",
    "email",
    "preferredTopic",
    "preferredDates",
    "message",
  ],
  "event-volunteer": [
    "name",
    "email",
    "availability",
    "volunteerInterests",
  ],
  "cancer-awareness-fair-registration": ["name", "email"],
  "volunteer-interest": [
    "name",
    "email",
    "availability",
    "areasOfInterest",
  ],
  "mentor-sign-up": ["name", "email", "expertise", "waysToHelp"],
  "story-submission": [
    "name",
    "email",
    "relationship",
    "story",
    "mediaConsent",
  ],
  "partnership-inquiry": [
    "organization",
    "contactName",
    "email",
    "partnershipType",
    "message",
  ],
  "sponsorship-inquiry": [
    "organization",
    "contactName",
    "email",
    "programInterests",
    "message",
  ],
  "internship-application": [
    "lastName",
    "firstName",
    "dateOfBirth",
    "studentAge",
    "gradeLevel",
    "schoolName",
    "location",
    "studentEmail",
    "internshipCycle",
    "participationPreference",
    "skillsExperience",
    "hoursPerWeek",
    "daysAvailable",
    "whyInterested",
    "hopeToLearn",
    "proudExperience",
    "mostExcitingArea",
    "certification",
    "studentSignature",
    "studentSignatureDate",
  ],
  "parent-guardian-consent": [
    "studentName",
    "studentDob",
    "parentGuardianName",
    "parentGuardianEmail",
    "parentGuardianPhone",
    "emergencyContactName",
    "emergencyContactPhone",
    "medicalConditionsAllergies",
    "consentToParticipate",
    "photoRelease",
    "videoRelease",
    "audioRelease",
    "publicationRelease",
    "publicEngagementConsent",
    "confidentialityAgreement",
    "liabilityWaiver",
    "medicalAuthorization",
    "parentGuardianSignature",
    "parentGuardianSignatureDate",
    "studentSignature",
    "studentSignatureDate",
  ],
  contact: ["name", "email", "topic", "message"],
};

function isFields(value: unknown): value is Record<string, string | string[]> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every(
    (field) =>
      typeof field === "string" ||
      (Array.isArray(field) &&
        field.every((entry) => typeof entry === "string")),
  );
}

function isAttachment(value: unknown): value is Attachment {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.filename === "string" &&
    typeof record.content === "string" &&
    typeof record.contentType === "string"
  );
}

function parseSubmission(body: unknown): Submission | null {
  let parsed = body;
  if (typeof body === "string") {
    try {
      parsed = JSON.parse(body) as unknown;
    } catch {
      return null;
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const record = parsed as Record<string, unknown>;
  if (typeof record.formName !== "string" || !isFields(record.fields)) return null;
  if (
    record.attachments !== undefined &&
    (!Array.isArray(record.attachments) ||
      !record.attachments.every(isAttachment))
  ) {
    return null;
  }
  return {
    formName: record.formName,
    fields: record.fields,
    attachments: record.attachments as Attachment[] | undefined,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderFields(fields: Record<string, string | string[]>) {
  return Object.entries(fields)
    .filter(([key]) => key !== "website")
    .map(([key, value]) => {
      const displayValue = Array.isArray(value) ? value.join(", ") : value;
      return `<tr><th style="padding:8px;text-align:left;vertical-align:top">${escapeHtml(
        key,
      )}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(
        displayValue,
      )}</td></tr>`;
    })
    .join("");
}

function fieldValue(
  fields: Record<string, string | string[]>,
  key: string,
) {
  const value = fields[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  const submission = parseSubmission(req.body);
  if (!submission || !allowedForms.has(submission.formName)) {
    res.status(400).json({ message: "The form submission is invalid." });
    return;
  }

  if (submission.fields.website) {
    res.status(200).json({ message: "Your form was sent." });
    return;
  }

  const missingRequiredField = requiredFields[submission.formName].some(
    (field) => !fieldValue(submission.fields, field).trim(),
  );
  if (missingRequiredField) {
    res.status(400).json({ message: "Complete all required fields." });
    return;
  }

  if (submission.formName === "internship-application") {
    const age = Number(fieldValue(submission.fields, "studentAge"));
    if (!Number.isFinite(age) || age < 15) {
      res.status(400).json({
        message: "Applicants must be at least 15 by the internship start date.",
      });
      return;
    }
    if (age < 18) {
      const guardianContact = [
        "guardianOneName",
        "guardianOneEmail",
        "guardianTwoName",
        "guardianTwoEmail",
      ].some((field) => fieldValue(submission.fields, field).trim());
      const guardianSignature = fieldValue(
        submission.fields,
        "parentSignature",
      ).trim();
      const guardianSignatureDate = fieldValue(
        submission.fields,
        "parentSignatureDate",
      ).trim();
      if (!guardianContact || !guardianSignature || !guardianSignatureDate) {
        res.status(400).json({
          message:
            "A parent or guardian contact, signature, and date are required for applicants under 18.",
        });
        return;
      }
    }
  }

  const serializedLength = JSON.stringify(submission).length;
  if (serializedLength > 6 * 1024 * 1024) {
    res.status(413).json({ message: "The submission is too large." });
    return;
  }

  const attachments = submission.attachments ?? [];
  if (
    attachments.length > 1 ||
    attachments.some(
      (attachment) =>
        !allowedAttachmentTypes.has(attachment.contentType) ||
        attachment.content.length > 5.6 * 1024 * 1024,
    )
  ) {
    res.status(400).json({ message: "The attachment is not supported." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.FORM_DESTINATION_EMAIL;
  const from = process.env.FORM_FROM_EMAIL;
  if (!apiKey || !destination || !from) {
    res.status(503).json({
      message:
        "Form delivery is not configured yet. Please contact Cellular Journeys after launch details are added.",
    });
    return;
  }

  const safeFormName = submission.formName.replace(/[^a-zA-Z0-9-]/g, "");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [destination],
      subject: `Cellular Journeys form: ${safeFormName}`,
      html: `<h1>New ${escapeHtml(
        safeFormName,
      )} submission</h1><table style="border-collapse:collapse">${renderFields(
        submission.fields,
      )}</table>`,
      attachments: attachments.map((attachment) => ({
        filename: attachment.filename.replace(/[^a-zA-Z0-9._-]/g, "_"),
        content: attachment.content,
        content_type: attachment.contentType,
      })),
    }),
  });

  if (!response.ok) {
    res.status(502).json({
      message: "The form could not be delivered. Please try again later.",
    });
    return;
  }

  res.status(200).json({ message: "Your form was sent securely." });
}
