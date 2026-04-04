export type LeadStatus = "new" | "qualified" | "submitted" | "declined";

export interface Lead {
  id: string;
  first_name: string;
  surname: string;
  id_number: string;
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
  idNumber: string;
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
