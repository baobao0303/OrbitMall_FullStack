-- Create gender table
CREATE TABLE IF NOT EXISTS genders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_genders_code ON genders(code);

-- Insert default gender values
INSERT INTO genders (name, code) VALUES 
    ('Male', 'MALE'),
    ('Female', 'FEMALE'),
    ('Other', 'OTHER')
ON CONFLICT (code) DO NOTHING;



