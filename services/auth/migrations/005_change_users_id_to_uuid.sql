-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 1: Add new UUID column
ALTER TABLE users ADD COLUMN IF NOT EXISTS uuid_id UUID;

-- Step 2: Generate UUIDs for existing rows
UPDATE users SET uuid_id = uuid_generate_v4() WHERE uuid_id IS NULL;

-- Step 3: Make uuid_id NOT NULL
ALTER TABLE users ALTER COLUMN uuid_id SET NOT NULL;

-- Step 4: Create unique index on uuid_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_uuid_id ON users(uuid_id);

-- Step 5: Drop foreign key constraints that reference users.id (if any)
-- Note: Update city_id and gender_id foreign keys if they reference users.id
-- This is a placeholder - adjust based on your actual foreign key relationships

-- Step 6: Drop old primary key constraint
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey;

-- Step 7: Set uuid_id as new primary key
ALTER TABLE users ADD PRIMARY KEY (uuid_id);

-- Step 8: Rename uuid_id to id (optional, keeps column name consistent)
-- ALTER TABLE users RENAME COLUMN uuid_id TO id;

-- Note: The old 'id' column (SERIAL) is kept for backward compatibility
-- You can drop it later with: ALTER TABLE users DROP COLUMN IF EXISTS id;

