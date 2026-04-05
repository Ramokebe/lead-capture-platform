import { z } from "zod";
import { validateSAID } from "./sa-id";

export const OFFER_TYPES = [
  { value: "personal_loan", label: "Personal Loan" },
  { value: "debt_consolidation", label: "Debt Consolidation" },
  { value: "store_card", label: "Store Card" },
  { value: "insurance", label: "Insurance" },
] as const;

export const LOAN_AMOUNT_RANGES = [
  { value: "R350 - R8,000", label: "R350 - R8,000" },
  { value: "R8,001 - R50,000", label: "R8,001 - R50,000" },
  { value: "R50,001 - R350,000", label: "R50,001 - R350,000" },
] as const;

export const leadFormSchema = z
  .object({
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
    cellphoneNumber: z
      .string()
      .min(1, "Cellphone number is required")
      .regex(
        /^(\+27|0)[6-8][0-9]{8}$/,
        "Enter a valid SA cellphone number (e.g. 0821234567)"
      ),
    idNumber: z
      .string()
      .length(13, "ID number must be exactly 13 digits")
      .regex(/^\d{13}$/, "ID number must contain only digits")
      .refine((val) => validateSAID(val).valid, {
        message: "Invalid South African ID number",
      }),
    offerType: z.enum(
      ["personal_loan", "debt_consolidation", "store_card", "insurance"],
      { errorMap: () => ({ message: "Please select an offer type" }) }
    ),
    loanAmountRange: z.string().optional(),
    totalDebtAmount: z
      .number({ invalid_type_error: "Enter a valid amount" })
      .positive("Amount must be greater than zero")
      .optional(),
    monthlyInstallments: z
      .number({ invalid_type_error: "Enter a valid amount" })
      .positive("Amount must be greater than zero")
      .optional(),
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
  })
  .superRefine((data, ctx) => {
    if (data.offerType === "personal_loan" && !data.loanAmountRange) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a loan amount range",
        path: ["loanAmountRange"],
      });
    }
    if (data.offerType === "debt_consolidation") {
      if (!data.totalDebtAmount || data.totalDebtAmount <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter your total debt amount",
          path: ["totalDebtAmount"],
        });
      }
      if (!data.monthlyInstallments || data.monthlyInstallments <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter your monthly installments",
          path: ["monthlyInstallments"],
        });
      }
    }
  });

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
