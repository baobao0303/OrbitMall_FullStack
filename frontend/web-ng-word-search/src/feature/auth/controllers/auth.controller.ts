import { Request, Response } from 'express';

export class AuthController {
  // ===== API ENDPOINTS (JSON Response) =====

  // POST /auth/api/login - API đăng nhập
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, remember } = req.body;

      // TODO: Implement login logic
      // 1. Validate input
      // 2. Check user credentials
      // 3. Create session/token

      console.log('🔐 Login API called:', { email, remember });

      // API Response (luôn trả về JSON)
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: { email },
          token: 'temp_token_123',
          expiresIn: '24h'
        }
      });
    } catch (error) {
      console.error('🚨 Login error:', error);

      // API Error Response
      res.status(400).json({
        success: false,
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /auth/api/register - API đăng ký
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, password, confirmPassword, agreeTerms } = req.body;

      // TODO: Implement registration logic
      // 1. Validate input
      // 2. Check if user exists
      // 3. Hash password
      // 4. Create user account

      console.log('📝 Registration API called:', { fullName, email, agreeTerms });

      // API Response (luôn trả về JSON)
      res.json({
        success: true,
        message: 'Account created successfully',
        data: {
          user: { fullName, email },
          userId: 'temp_user_123'
        }
      });
    } catch (error) {
      console.error('🚨 Registration error:', error);

      // API Error Response
      res.status(400).json({
        success: false,
        message: 'Registration failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // POST /auth/api/forgot-password - API quên mật khẩu
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      // TODO: Implement forgot password logic
      // 1. Validate email
      // 2. Check if user exists
      // 3. Generate reset token
      // 4. Send reset email

      console.log('🔑 Forgot password API called:', { email });

      // API Response (luôn trả về JSON)
      res.json({
        success: true,
        message: 'Reset instructions sent to your email',
        data: { email }
      });
    } catch (error) {
      console.error('🚨 Forgot password error:', error);

      // API Error Response
      res.status(400).json({
        success: false,
        message: 'Failed to process request',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // GET /auth/api/logout - API đăng xuất
  public logout(req: Request, res: Response): void {
    // TODO: Implement logout logic
    // 1. Clear session/token

    console.log('🚪 Logout API called');

    // API Response (luôn trả về JSON)
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }
}
