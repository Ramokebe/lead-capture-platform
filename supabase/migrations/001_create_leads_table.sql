CREATE TYPE lead_status AS ENUM ('new', 'qualified', 'submitted', 'declined');

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    id_number VARCHAR(255) NOT NULL,
    monthly_income DECIMAL(12, 2) NOT NULL,
    consent_given BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address INET,
    utm_source VARCHAR(100),
    utm_campaign VARCHAR(100),
    status lead_status NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX idx_leads_utm_source ON leads (utm_source);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
