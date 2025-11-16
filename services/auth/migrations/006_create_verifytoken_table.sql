-- Create verifytoken table for email verification
CREATE TABLE IF NOT EXISTS verify_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(uuid_id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    otp_code VARCHAR(10) NOT NULL,
    verification_type VARCHAR(50) NOT NULL DEFAULT 'email', -- 'email', 'password_reset', etc.
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_verify_tokens_user_id ON verify_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_verify_tokens_token ON verify_tokens(token);
CREATE INDEX IF NOT EXISTS idx_verify_tokens_otp_code ON verify_tokens(otp_code);
CREATE INDEX IF NOT EXISTS idx_verify_tokens_expires_at ON verify_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_verify_tokens_is_used ON verify_tokens(is_used);



