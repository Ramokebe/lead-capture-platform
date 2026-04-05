export type LeadStatus = "new" | "qualified" | "submitted" | "declined";
export type OfferType = "personal_loan" | "debt_consolidation" | "store_card" | "insurance";

export interface Lead {
  id: string;
  first_name: string;
  surname: string;
  cellphone_number: string | null;
  id_number: string;
  offer_type: OfferType | null;
  loan_amount_range: string | null;
  total_debt_amount: number | null;
  monthly_installments: number | null;
  monthly_income: number;
  consent_given: boolean;
  ip_address: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface LeadFormData {
  firstName: string;
  surname: string;
  cellphoneNumber: string;
  idNumber: string;
  offerType: OfferType;
  loanAmountRange?: string;
  totalDebtAmount?: number;
  monthlyInstallments?: number;
  monthlyIncome: number;
  consentGiven: boolean;
  utmSource?: string;
  utmCampaign?: string;
}

export interface ApiResponse {
  success: boolean;
  reference?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}
