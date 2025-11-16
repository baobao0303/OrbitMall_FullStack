package data

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
)

const dbTimeout = time.Second * 3

var db *sql.DB

// New is the function userd to create an instance of the data package. It return the type
// Model which contains the connection pool and a reference to the database pool.
func New(dbPool *sql.DB) Models {
	db = dbPool

	return Models{
		User:        User{},
		City:        City{},
		Gender:      Gender{},
		VerifyToken: VerifyToken{},
	}
}


// User is the model for the user table.
type Models struct {
	User        User
	City        City
	Gender      Gender
	VerifyToken VerifyToken
}

// User is the model for the user table.
type User struct {
	ID             string     `json:"id"` // UUID
	Email          string     `json:"email"`
	FirstName      string     `json:"first_name"`
	MiddleName     *string    `json:"middle_name,omitempty"`
	LastName       string     `json:"last_name"`
	Password       string     `json:"password"`
	Active         bool       `json:"active"`
	CityID         *int       `json:"city_id,omitempty"`
	GenderID       *int       `json:"gender_id,omitempty"`
	DOB            *time.Time `json:"dob,omitempty"`
	InvitationToken *string   `json:"invitation_token,omitempty"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// GetAll returns all users from the database.
func (u *User) GetAll() ([]*User, error) {

	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select uuid_id, email, first_name, last_name, active, created_at, updated_at from users order by last_name`

	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []*User

	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.Active, &user.CreatedAt, &user.UpdatedAt)
		if err != nil {
			return nil, err
		}
		users = append(users, &user)
	}
	return users, nil
}

// GetOne returns one user from the database by id (UUID).
func (u *User) GetOne(id string) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select uuid_id, email, first_name, last_name, active, created_at, updated_at from users where uuid_id = $1`

	var user User
	// Scan the result into the user struct.
	err := db.QueryRowContext(ctx, query, id).Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.Active, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// GetByEmail returns one user from the database by email.
func (u *User) GetByEmail(email string) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select uuid_id, email, first_name, last_name, password, active, created_at, updated_at from users where email = $1`

	var user User
	err := db.QueryRowContext(ctx, query, email).Scan(&user.ID, &user.Email, &user.FirstName, &user.LastName, &user.Password, &user.Active, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &user, nil
}



// update one user in the database by id.
func (u *User) Update() error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `update users set email = $1, first_name = $2, last_name = $3, active = $4 where uuid_id = $5`

	_, err := db.ExecContext(ctx, query, u.Email, u.FirstName, u.LastName, u.Active, time.Now(), u.ID)
	if err != nil {
		return err
	}
	return nil
}


// delete one user from the database by id.
func (u *User) Delete() error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `delete from users where uuid_id = $1`

	_, err := db.ExecContext(ctx, query, u.ID)
	if err != nil {
		return err
	}
	return nil
}

// delete one user from the database
func (u *User) DeleteByID(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `delete from users where uuid_id = $1`

	_, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}


// insert a new user into the database.
func (u *User) Insert(user User) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	// hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 12)
	if err != nil {
		return "", err
	}

	query := `insert into users (uuid_id, email, first_name, middle_name, last_name, password, active, city_id, gender_id, dob, invitation_token, created_at, updated_at) 
	          values (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning uuid_id`

	var id string
	err = db.QueryRowContext(ctx, query, 
		user.Email, 
		user.FirstName, 
		user.MiddleName, 
		user.LastName, 
		hashedPassword, 
		user.Active,
		user.CityID,
		user.GenderID,
		user.DOB,
		user.InvitationToken,
		time.Now(), 
		time.Now()).Scan(&id)

	if err != nil {
		return "", err
	}

	return id, nil
}


// reset password for a user.
func (u *User) ResetPassword(password string) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return err
	}

	query := `update users set password = $1 where uuid_id = $2`
	_, err = db.ExecContext(ctx, query, hashedPassword, u.ID)
	if err != nil {
		return err
	}
	return nil
}



// authenticate a user.
func (u *User) PasswordMatches(plainTextPassword string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(plainTextPassword))
	if err != nil {
		switch {
		case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
			return false, nil
		default:
			return false, err
		}
	}
	return true, nil
}

// City is the model for the cities table.
type City struct {
	ID          int       `json:"id"`
	Code        string    `json:"code"`
	Name        string    `json:"name"`
	Type        string    `json:"type"` // 'province' or 'ward'
	ProvinceCode string   `json:"province_code,omitempty"`
	ParentCode  string    `json:"parent_code,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Insert inserts a new city into the database
func (c *City) Insert(city City) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `INSERT INTO cities (code, name, type, province_code, parent_code, created_at, updated_at) 
	          VALUES ($1, $2, $3, $4, $5, $6, $7) 
	          ON CONFLICT (code) DO UPDATE SET 
	          name = EXCLUDED.name, 
	          type = EXCLUDED.type,
	          province_code = EXCLUDED.province_code,
	          parent_code = EXCLUDED.parent_code,
	          updated_at = EXCLUDED.updated_at
	          RETURNING id`

	var id int
	err := db.QueryRowContext(ctx, query, 
		city.Code, city.Name, city.Type, city.ProvinceCode, city.ParentCode, time.Now(), time.Now()).Scan(&id)
	
	if err != nil {
		return 0, err
	}
	return id, nil
}

// GetAllProvinces returns all provinces
func (c *City) GetAllProvinces() ([]*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, code, name, type, province_code, parent_code, created_at, updated_at 
	          FROM cities 
	          WHERE type = 'province' 
	          ORDER BY name`

	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cities []*City
	for rows.Next() {
		var city City
		err := rows.Scan(&city.ID, &city.Code, &city.Name, &city.Type, 
			&city.ProvinceCode, &city.ParentCode, &city.CreatedAt, &city.UpdatedAt)
		if err != nil {
			return nil, err
		}
		cities = append(cities, &city)
	}
	return cities, nil
}

// GetWardsByProvinceCode returns all wards for a province
func (c *City) GetWardsByProvinceCode(provinceCode string) ([]*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, code, name, type, province_code, parent_code, created_at, updated_at 
	          FROM cities 
	          WHERE type = 'ward' AND province_code = $1 
	          ORDER BY name`

	rows, err := db.QueryContext(ctx, query, provinceCode)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cities []*City
	for rows.Next() {
		var city City
		err := rows.Scan(&city.ID, &city.Code, &city.Name, &city.Type, 
			&city.ProvinceCode, &city.ParentCode, &city.CreatedAt, &city.UpdatedAt)
		if err != nil {
			return nil, err
		}
		cities = append(cities, &city)
	}
	return cities, nil
}

// GetOne returns a city by ID
func (c *City) GetOne(id int) (*City, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, code, name, type, province_code, parent_code, created_at, updated_at 
	          FROM cities 
	          WHERE id = $1`

	var city City
	err := db.QueryRowContext(ctx, query, id).Scan(&city.ID, &city.Code, &city.Name, &city.Type, 
		&city.ProvinceCode, &city.ParentCode, &city.CreatedAt, &city.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &city, nil
}

// DeleteAll deletes all cities (useful for re-sync)
func (c *City) DeleteAll() error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `DELETE FROM cities`
	_, err := db.ExecContext(ctx, query)
	return err
}

// Gender is the model for the genders table
type Gender struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Code      string    `json:"code"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// GetAll returns all genders
func (g *Gender) GetAll() ([]*Gender, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, name, code, created_at, updated_at FROM genders ORDER BY name`

	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var genders []*Gender
	for rows.Next() {
		var gender Gender
		err := rows.Scan(&gender.ID, &gender.Name, &gender.Code, &gender.CreatedAt, &gender.UpdatedAt)
		if err != nil {
			return nil, err
		}
		genders = append(genders, &gender)
	}
	return genders, nil
}

// GetByID returns a gender by ID
func (g *Gender) GetByID(id int) (*Gender, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, name, code, created_at, updated_at FROM genders WHERE id = $1`

	var gender Gender
	err := db.QueryRowContext(ctx, query, id).Scan(&gender.ID, &gender.Name, &gender.Code, &gender.CreatedAt, &gender.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &gender, nil
}

// VerifyToken is the model for the verify_tokens table
type VerifyToken struct {
	ID              int       `json:"id"`
	UserID          string    `json:"user_id"` // UUID
	Token           string    `json:"token"`
	OTPCode         string    `json:"otp_code"`
	VerificationType string   `json:"verification_type"`
	ExpiresAt       time.Time `json:"expires_at"`
	IsUsed          bool      `json:"is_used"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

// Insert creates a new verify token
func (v *VerifyToken) Insert(token VerifyToken) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `INSERT INTO verify_tokens (user_id, token, otp_code, verification_type, expires_at, created_at, updated_at) 
	          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`

	var id int
	err := db.QueryRowContext(ctx, query,
		token.UserID,
		token.Token,
		token.OTPCode,
		token.VerificationType,
		token.ExpiresAt,
		time.Now(),
		time.Now()).Scan(&id)

	if err != nil {
		return 0, err
	}
	return id, nil
}

// GetByToken returns a verify token by token string
func (v *VerifyToken) GetByToken(token string) (*VerifyToken, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, user_id, token, otp_code, verification_type, expires_at, is_used, created_at, updated_at 
	          FROM verify_tokens 
	          WHERE token = $1`

	var verifyToken VerifyToken
	err := db.QueryRowContext(ctx, query, token).Scan(
		&verifyToken.ID,
		&verifyToken.UserID,
		&verifyToken.Token,
		&verifyToken.OTPCode,
		&verifyToken.VerificationType,
		&verifyToken.ExpiresAt,
		&verifyToken.IsUsed,
		&verifyToken.CreatedAt,
		&verifyToken.UpdatedAt)

	if err != nil {
		return nil, err
	}
	return &verifyToken, nil
}

// GetByUserIDAndType returns the latest verify token for a user and type
func (v *VerifyToken) GetByUserIDAndType(userID, verificationType string) (*VerifyToken, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `SELECT id, user_id, token, otp_code, verification_type, expires_at, is_used, created_at, updated_at 
	          FROM verify_tokens 
	          WHERE user_id = $1 AND verification_type = $2 AND is_used = false AND expires_at > NOW()
	          ORDER BY created_at DESC 
	          LIMIT 1`

	var verifyToken VerifyToken
	err := db.QueryRowContext(ctx, query, userID, verificationType).Scan(
		&verifyToken.ID,
		&verifyToken.UserID,
		&verifyToken.Token,
		&verifyToken.OTPCode,
		&verifyToken.VerificationType,
		&verifyToken.ExpiresAt,
		&verifyToken.IsUsed,
		&verifyToken.CreatedAt,
		&verifyToken.UpdatedAt)

	if err != nil {
		return nil, err
	}
	return &verifyToken, nil
}

// MarkAsUsed marks a verify token as used
func (v *VerifyToken) MarkAsUsed(tokenID int) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `UPDATE verify_tokens SET is_used = true, updated_at = $1 WHERE id = $2`
	_, err := db.ExecContext(ctx, query, time.Now(), tokenID)
	return err
}

// DeleteExpiredTokens deletes expired tokens (cleanup)
func (v *VerifyToken) DeleteExpiredTokens() error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `DELETE FROM verify_tokens WHERE expires_at < NOW()`
	_, err := db.ExecContext(ctx, query)
	return err
}
