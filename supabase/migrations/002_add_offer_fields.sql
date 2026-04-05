-- Add cellphone number
ALTER TABLE leads ADD COLUMN IF NOT EXISTS cellphone_number VARCHAR(20);

-- Add offer type
ALTER TABLE leads ADD COLUMN IF NOT EXISTS offer_type VARCHAR(50);

-- Personal Loan: loan amount range bucket
ALTER TABLE leads ADD COLUMN IF NOT EXISTS loan_amount_range VARCHAR(50);

-- Debt Consolidation: total debt and monthly installments
ALTER TABLE leads ADD COLUMN IF NOT EXISTS total_debt_amount DECIMAL(12, 2);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS monthly_installments DECIMAL(12, 2);

-- Index on offer_type for filtering/analytics
CREATE INDEX IF NOT EXISTS idx_leads_offer_type ON leads (offer_type);
