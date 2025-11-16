-- Add new columns to users table for sign-up
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS middle_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS city_id INTEGER REFERENCES cities(id),
ADD COLUMN IF NOT EXISTS gender_id INTEGER REFERENCES genders(id),
ADD COLUMN IF NOT EXISTS dob DATE,
ADD COLUMN IF NOT EXISTS invitation_token VARCHAR(255);

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_users_city_id ON users(city_id);
CREATE INDEX IF NOT EXISTS idx_users_gender_id ON users(gender_id);
CREATE INDEX IF NOT EXISTS idx_users_invitation_token ON users(invitation_token);



