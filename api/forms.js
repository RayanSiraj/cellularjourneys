var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var allowedForms = new Set([
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
var allowedAttachmentTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
]);
function isFields(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return false;
    return Object.values(value).every(function (field) {
        return typeof field === "string" ||
            (Array.isArray(field) &&
                field.every(function (entry) { return typeof entry === "string"; }));
    });
}
function isAttachment(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return false;
    var record = value;
    return (typeof record.filename === "string" &&
        typeof record.content === "string" &&
        typeof record.contentType === "string");
}
function parseSubmission(body) {
    var parsed = body;
    if (typeof body === "string") {
        try {
            parsed = JSON.parse(body);
        }
        catch (_a) {
            return null;
        }
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
        return null;
    var record = parsed;
    if (typeof record.formName !== "string" || !isFields(record.fields))
        return null;
    if (record.attachments !== undefined &&
        (!Array.isArray(record.attachments) ||
            !record.attachments.every(isAttachment))) {
        return null;
    }
    return {
        formName: record.formName,
        fields: record.fields,
        attachments: record.attachments,
    };
}
function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
function renderFields(fields) {
    return Object.entries(fields)
        .filter(function (_a) {
        var key = _a[0];
        return key !== "website";
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        var displayValue = Array.isArray(value) ? value.join(", ") : value;
        return "<tr><th style=\"padding:8px;text-align:left;vertical-align:top\">".concat(escapeHtml(key), "</th><td style=\"padding:8px;white-space:pre-wrap\">").concat(escapeHtml(displayValue), "</td></tr>");
    })
        .join("");
}
function fieldValue(fields, key) {
    var _a;
    var value = fields[key];
    return Array.isArray(value) ? (_a = value[0]) !== null && _a !== void 0 ? _a : "" : value !== null && value !== void 0 ? value : "";
}
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var submission, age, guardianContact, guardianSignature, guardianSignatureDate, serializedLength, attachments, apiKey, destination, from, safeFormName, response;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res.setHeader("Cache-Control", "no-store");
                    if (req.method !== "POST") {
                        res.status(405).json({ message: "Method not allowed." });
                        return [2 /*return*/];
                    }
                    submission = parseSubmission(req.body);
                    if (!submission || !allowedForms.has(submission.formName)) {
                        res.status(400).json({ message: "The form submission is invalid." });
                        return [2 /*return*/];
                    }
                    if (submission.fields.website) {
                        res.status(200).json({ message: "Your form was sent." });
                        return [2 /*return*/];
                    }
                    if (submission.formName === "internship-application") {
                        age = Number(fieldValue(submission.fields, "studentAge"));
                        if (!Number.isFinite(age) || age < 15) {
                            res.status(400).json({
                                message: "Applicants must be at least 15 by the internship start date.",
                            });
                            return [2 /*return*/];
                        }
                        if (age < 18) {
                            guardianContact = [
                                "guardianOneName",
                                "guardianOneEmail",
                                "guardianTwoName",
                                "guardianTwoEmail",
                            ].some(function (field) { return fieldValue(submission.fields, field).trim(); });
                            guardianSignature = fieldValue(submission.fields, "parentSignature").trim();
                            guardianSignatureDate = fieldValue(submission.fields, "parentSignatureDate").trim();
                            if (!guardianContact || !guardianSignature || !guardianSignatureDate) {
                                res.status(400).json({
                                    message: "A parent or guardian contact, signature, and date are required for applicants under 18.",
                                });
                                return [2 /*return*/];
                            }
                        }
                    }
                    serializedLength = JSON.stringify(submission).length;
                    if (serializedLength > 6 * 1024 * 1024) {
                        res.status(413).json({ message: "The submission is too large." });
                        return [2 /*return*/];
                    }
                    attachments = (_a = submission.attachments) !== null && _a !== void 0 ? _a : [];
                    if (attachments.length > 1 ||
                        attachments.some(function (attachment) {
                            return !allowedAttachmentTypes.has(attachment.contentType) ||
                                attachment.content.length > 5.6 * 1024 * 1024;
                        })) {
                        res.status(400).json({ message: "The attachment is not supported." });
                        return [2 /*return*/];
                    }
                    apiKey = process.env.RESEND_API_KEY;
                    destination = process.env.FORM_DESTINATION_EMAIL;
                    from = process.env.FORM_FROM_EMAIL;
                    if (!apiKey || !destination || !from) {
                        res.status(503).json({
                            message: "Form delivery is not configured yet. Please contact Cellular Journeys after launch details are added.",
                        });
                        return [2 /*return*/];
                    }
                    safeFormName = submission.formName.replace(/[^a-zA-Z0-9-]/g, "");
                    return [4 /*yield*/, fetch("https://api.resend.com/emails", {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(apiKey),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                from: from,
                                to: [destination],
                                subject: "Cellular Journeys form: ".concat(safeFormName),
                                html: "<h1>New ".concat(escapeHtml(safeFormName), " submission</h1><table style=\"border-collapse:collapse\">").concat(renderFields(submission.fields), "</table>"),
                                attachments: attachments.map(function (attachment) { return ({
                                    filename: attachment.filename.replace(/[^a-zA-Z0-9._-]/g, "_"),
                                    content: attachment.content,
                                    content_type: attachment.contentType,
                                }); }),
                            }),
                        })];
                case 1:
                    response = _b.sent();
                    if (!response.ok) {
                        res.status(502).json({
                            message: "The form could not be delivered. Please try again later.",
                        });
                        return [2 /*return*/];
                    }
                    res.status(200).json({ message: "Your form was sent securely." });
                    return [2 /*return*/];
            }
        });
    });
}
