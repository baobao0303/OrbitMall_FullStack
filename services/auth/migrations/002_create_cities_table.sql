-- Create cities table for administrative units (provinces/cities and wards)
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'province' or 'ward'
    province_code VARCHAR(20), -- NULL for provinces, set for wards
    parent_code VARCHAR(20), -- NULL for provinces, province_code for wards
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_cities_code ON cities(code);
CREATE INDEX IF NOT EXISTS idx_cities_type ON cities(type);
CREATE INDEX IF NOT EXISTS idx_cities_province_code ON cities(province_code);
CREATE INDEX IF NOT EXISTS idx_cities_parent_code ON cities(parent_code);





