-- ============================================
-- SQL Queries for user: lcho332002@gmail.com
-- ============================================

-- 1. SELECT - Xem thông tin user
SELECT 
    uuid_id,
    email,
    first_name,
    middle_name,
    last_name,
    active,
    city_id,
    gender_id,
    dob,
    invitation_token,
    created_at,
    updated_at
FROM users 
WHERE email = 'lcho332002@gmail.com';

-- 2. SELECT với thông tin city và gender
SELECT 
    u.uuid_id,
    u.email,
    u.first_name,
    u.middle_name,
    u.last_name,
    u.active,
    u.dob,
    u.created_at,
    u.updated_at,
    c.name as city_name,
    c.code as city_code,
    g.name as gender_name,
    g.code as gender_code
FROM users u
LEFT JOIN cities c ON u.city_id = c.id
LEFT JOIN genders g ON u.gender_id = g.id
WHERE u.email = 'lcho332002@gmail.com';

-- 3. INSERT - Tạo user mới (với password đã hash)
-- Lưu ý: Password cần được hash bằng bcrypt trước khi insert
-- Ví dụ password "password123" sau khi hash: $2a$12$...
INSERT INTO users (
    uuid_id,
    email,
    first_name,
    middle_name,
    last_name,
    password,
    active,
    city_id,
    gender_id,
    dob,
    invitation_token,
    created_at,
    updated_at
) VALUES (
    uuid_generate_v4(),
    'lcho332002@gmail.com',
    'First',
    'Middle',
    'Last',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyY5Y5Y5Y5Y5', -- Replace with actual bcrypt hash
    true,
    NULL, -- city_id (optional)
    NULL, -- gender_id (optional)
    NULL, -- dob (optional)
    NULL, -- invitation_token (optional)
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING
RETURNING uuid_id, email, first_name, last_name;

-- 4. UPDATE - Cập nhật thông tin user
UPDATE users 
SET 
    first_name = 'Updated First Name',
    middle_name = 'Updated Middle Name',
    last_name = 'Updated Last Name',
    city_id = 1, -- Replace with actual city_id
    gender_id = 1, -- Replace with actual gender_id (1=Male, 2=Female, 3=Other)
    dob = '1990-01-01', -- Replace with actual date
    updated_at = CURRENT_TIMESTAMP
WHERE email = 'lcho332002@gmail.com'
RETURNING uuid_id, email, first_name, last_name;

-- 5. UPDATE - Kích hoạt/tắt tài khoản
UPDATE users 
SET 
    active = true, -- Set to false to deactivate
    updated_at = CURRENT_TIMESTAMP
WHERE email = 'lcho332002@gmail.com';

-- 6. UPDATE - Reset password (cần hash password trước)
UPDATE users 
SET 
    password = '$2a$12$NEW_HASHED_PASSWORD_HERE', -- Replace with actual bcrypt hash
    updated_at = CURRENT_TIMESTAMP
WHERE email = 'lcho332002@gmail.com';

-- 7. SELECT - Xem verify tokens của user
SELECT 
    vt.id,
    vt.token,
    vt.otp_code,
    vt.verification_type,
    vt.expires_at,
    vt.is_used,
    vt.created_at
FROM verify_tokens vt
JOIN users u ON vt.user_id = u.uuid_id
WHERE u.email = 'lcho332002@gmail.com'
ORDER BY vt.created_at DESC;

-- 8. DELETE - Xóa verify tokens đã hết hạn của user
DELETE FROM verify_tokens
WHERE user_id = (
    SELECT uuid_id FROM users WHERE email = 'lcho332002@gmail.com'
)
AND expires_at < CURRENT_TIMESTAMP;

-- 9. DELETE - Xóa user và tất cả dữ liệu liên quan (CASCADE)
DELETE FROM users 
WHERE email = 'lcho332002@gmail.com';

-- 10. SELECT - Kiểm tra user có tồn tại không
SELECT EXISTS(
    SELECT 1 FROM users WHERE email = 'lcho332002@gmail.com'
) as user_exists;

-- 11. SELECT - Đếm số verify tokens của user
SELECT 
    u.email,
    COUNT(vt.id) as total_tokens,
    COUNT(CASE WHEN vt.is_used = false AND vt.expires_at > CURRENT_TIMESTAMP THEN 1 END) as active_tokens
FROM users u
LEFT JOIN verify_tokens vt ON u.uuid_id = vt.user_id
WHERE u.email = 'lcho332002@gmail.com'
GROUP BY u.email;

