package handlers

// Token-related types

// VerifyAccessTokenRequest represents the request body for verify access token
type VerifyAccessTokenRequest struct {
	Token string `json:"token" example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`
}

// VerifyAccessTokenResponse represents the response for verify access token
type VerifyAccessTokenResponse struct {
	Valid   bool   `json:"valid" example:"true"`
	Message string `json:"message" example:"Token is valid"`
}

// RenewAccessTokenRequest represents the request body for renew access token
type RenewAccessTokenRequest struct {
	Vrto string `json:"vrto" example:"refresh_token_string"`
}

// RenewAccessTokenResponse represents the response for renew access token
type RenewAccessTokenResponse struct {
	AccessToken  string `json:"accessToken" example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`
	RefreshToken string `json:"refreshToken" example:"refresh_token_string"`
	ExpiresIn    int    `json:"expiresIn" example:"3600"`
}

// User-related types

// SignInRequest represents the request body for user sign-in
type SignInRequest struct {
	UserName string `json:"userName" example:"john.doe@example.com"`
	Password string `json:"password" example:"password123"`
	Code     string `json:"code" example:"123456"`
}

// SignInResponse represents the response for user sign-in
type SignInResponse struct {
	AccessToken  string `json:"accessToken" example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`
	RefreshToken string `json:"refreshToken" example:"refresh_token_string"`
	ExpiresIn    int    `json:"expiresIn" example:"3600"`
	UserID       string `json:"userId" example:"3fa85f64-5717-4562-b3fc-2c963f66afa6"`
	UserName     string `json:"userName" example:"john.doe@example.com"`
}

// SignUpRequest represents the request body for user sign-up
type SignUpRequest struct {
	FirstName      string  `json:"firstName" example:"John"`
	MiddleName     *string `json:"middleName,omitempty" example:"Michael"`
	LastName       string  `json:"lastName" example:"Doe"`
	Email          string  `json:"email" example:"john.doe@example.com"`
	Password       string  `json:"password" example:"password123"`
	CityID         *string `json:"cityId,omitempty" example:"1"` // Will be parsed to int
	GenderID       *string `json:"genderId,omitempty" example:"1"` // Will be parsed to int
	DOB            *string `json:"dob,omitempty" example:"1990-01-15T00:00:00Z"` // ISO 8601 date format
	InvitationToken *string `json:"invitationToken,omitempty" example:"invitation_token_string"`
}

// SignUpResponse represents the response for user sign-up
type SignUpResponse struct {
	UserID    string `json:"userId" example:"3fa85f64-5717-4562-b3fc-2c963f66afa6"`
	Email     string `json:"email" example:"john.doe@example.com"`
	FirstName string `json:"firstName" example:"John"`
	LastName  string `json:"lastName" example:"Doe"`
	Message   string `json:"message" example:"User registered successfully"`
}

// VerifyMailRequest represents the request body for email verification
type VerifyMailRequest struct {
	VerificationOTPCode string `json:"verificationOTPCode" example:"3fa85f64-5717-4562-b3fc-2c963f66afa6"`
	OTP                 string `json:"otp" example:"123456"`
}

// VerifyMailResponse represents the response for email verification
type VerifyMailResponse struct {
	Message string `json:"message" example:"Email verified successfully"`
	UserID  string `json:"userId" example:"3fa85f64-5717-4562-b3fc-2c963f66afa6"`
}

// ResendOTPRequest represents the request body for resending OTP
type ResendOTPRequest struct {
	VerificationOTPCode string `json:"verificationOTPCode" example:"3fa85f64-5717-4562-b3fc-2c963f66afa6"`
}

// ResendOTPResponse represents the response for resending OTP
type ResendOTPResponse struct {
	Message           string `json:"message" example:"OTP sent successfully"`
	VerificationToken string `json:"verificationToken" example:"3fa85f64-5717-4562-b3fc-2c963f66afa6"`
}

// ForgetPasswordSendEmailRequest represents the request body for forget password send email
type ForgetPasswordSendEmailRequest struct {
	Email string `json:"email" example:"user@example.com"`
}

// ForgetPasswordSendEmailResponse represents the response for forget password send email
type ForgetPasswordSendEmailResponse struct {
	Message string `json:"message" example:"Password reset email sent successfully"`
	Email   string `json:"email" example:"user@example.com"`
}

