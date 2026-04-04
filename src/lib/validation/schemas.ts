import { z } from "zod";
import { validateSAID } from "./sa-id";

export const leadFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be 100 characters or less"),
  surname: z
    .string()
    .trim()
    .min(1, "Surname is required")
    .max(100, "Surname must be 100 characters or less"),
  idNumber: z
    .string()
    .length(13, "ID number must be exactly 13 digits")
    .regex(/^\d{13}$/, "ID number must contain only digits")
    .refine((val) => validateSAID(val).valid, {
      message: "Invalid South African ID number",
    }),
  monthlyIncome: z
    .number({ invalid_type_error: "Monthly income is required" })
    .positive("Income must be greater than zero")
    .max(99999999.99, "Income value is too large"),
  consentGiven: z.literal(true, {
    errorMap: () => ({
      message: "You must consent to the processing of your personal information",
    }),
  }),
  utmSource: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
