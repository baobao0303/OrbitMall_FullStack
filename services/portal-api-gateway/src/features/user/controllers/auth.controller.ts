import { NextFunction, Request, Response } from 'express';
import User from '~/features/user/models/user.model';
import Verification from '~/features/user/models/verification.model';
import { BadRequestException } from '~/globals/cores/error.core';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import sendTokenViaCookie from '~/globals/helpers/cookie.helper';
import { generateToken } from '~/globals/helpers/jwt.helper';
import HttpConstants from '~/globals/constants/http.constants';
import { EMAIL_TYPES, sendInviteEmail } from '~/globals/config/email';
import createMessage from '~/globals/config/phone';
import { generatePhoneNumber } from '~/globals/helpers/randomNumber';

// Get JWT secret from environment or use a fallback
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

class AuthController {
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      message: 'Get all auths successfully',
      data: []
    });
  }
  // CREATE AUTH - SIGNUP BASICALLY
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, name, email, password, state, city, locality, phone } = req.body;
      const newUser = await User.findOne({ email, phone });
      if (newUser) {
        return next(new BadRequestException('User already exists'));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        fullName,
        name,
        email,
        password: hashedPassword.toString(),
        state,
        city,
        locality,
        phone,
        role: 'user'
      });

      res.status(201).json({
        message: 'Signup successfully',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
  //TODO: CREATE AUTH - SIGNUP EMAIL VERIFICATION
  public async signUpEmailVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        //TODO: SEND EMAIL VERIFICATION
      }

      res.status(HttpConstants.SUCCESS).json({
        message: 'Email verification sent successfully',
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // LOGIN AUTH - SIGNIN BASICALLY
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return next(new BadRequestException('User not found'));
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(new BadRequestException('Invalid password'));
      }
      const token = await generateToken({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        fullName: user.fullName
      });

      // SEND TOKEN VIA COOKIE
      await sendTokenViaCookie(res, token.accessToken);

      res.status(HttpConstants.SUCCESS).json({
        message: 'Đăng nhập thành công',
        vato: token.accessToken,
        vrto: token.refreshToken,
        fullName: user.fullName
      });
    } catch (error) {
      next(error);
    }
  }

  // FORGOT PASSWORD
  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return next(new BadRequestException('User not found'));
      }
      // GENERATE PASSWORD RANDOMLY
      const generatePassword = crypto.randomBytes(8).toString('hex');
      const hashedPassword = await bcrypt.hash(generatePassword, 10);

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

      // UPDATE PASSWORD
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });

      res.status(HttpConstants.SUCCESS).json({
        message: 'Forgot password sent successfully',
        data: user,
        token
      });
    } catch (error) {
      next(error);
    }
  }

  // RESET PASSWORD
  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return next(new BadRequestException('User not found'));
      }
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, fullName: user.fullName },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const link = `https://localhost:4200/reset-password?verification=${token}`;
      //SEND LINK = https://localhost:4200/reset-password?verification={token}
      await sendInviteEmail(email, {
        subject: 'Reset Password',
        data: { user, link },
        typeEmail: EMAIL_TYPES.PASSWORD_RESET
      });
      res.status(HttpConstants.SUCCESS).json({
        message: 'Reset password sent successfully',
        data: user,
        token
      });
    } catch (error) {
      next(error);
    }
  }

  // TASK: RESET PASSWORD PHONE - USING OTP TWILIO
  // Get OTP: https://console.twilio.com/us1/develop/sms/virtual-phone
  public async resetPasswordPhone(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.body;
      const user = await User.findOne({ phone });
      if (!user) {
        return next(new BadRequestException('User not found'));
      }
      const codeNumber = generatePhoneNumber();
      const randomNumber = String(codeNumber).padStart(6, '0');
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      //  Lưu vào bảng verification theo schema
      const exists = await Verification.findOne({ phone, randomNumber });
      if (!exists) {
        await Verification.create({
          userId: user._id,
          phone,
          randomNumber,
          accessToken: token,
          used: false,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, { isReset: true });
      // SEND MESSAGE TO PHONE
      const messageResult = await createMessage(
        phone,
        `Your verification code is ${randomNumber}. It expires in 15 minutes.`
      );

      res.status(HttpConstants.SUCCESS).json({
        message: 'Reset password sent successfully',
        data: updatedUser,
        token,
        messagePhone: messageResult.body
      });
    } catch (error) {
      next(error);
    }
  }

  // Verify OTP
  public async verifyOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, otp } = req.body;
      const verification = await Verification.findOne({ phone, randomNumber: otp });
      if (!verification) {
        return next(new BadRequestException('Invalid OTP'));
      }
      if (verification.used) {
        return next(new BadRequestException('OTP already used'));
      }
      const user = await User.findOne({ phone });
      if (!user) {
        return next(new BadRequestException('User not found'));
      }

      // vượt 15 phút thì xoá cái verification
      // OTP only valid for 15 minutes since creation
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      if (verification.createdAt && verification.createdAt < fifteenMinutesAgo) {
        await Verification.findByIdAndDelete(verification._id);
        return next(new BadRequestException('OTP expired'));
      }
      // mark used and reset flag
      await Verification.findByIdAndUpdate(verification._id, { used: true });
      const updatedUser = await User.findByIdAndUpdate(user._id, { isReset: false }, { new: true });
      res.status(HttpConstants.SUCCESS).json({
        message: 'OTP verified successfully',
        data: updatedUser,
        token: verification.accessToken
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE PASSWORD WHEN VERIFY OTP SUCCESS
  public async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, accessToken } = req.body;
      const decoded = jwt.verify(accessToken, JWT_SECRET) as JwtPayload & { id: string };
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new BadRequestException('User not found'));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      // XÓA CÁI VERIFICATION
      await Verification.findByIdAndDelete(user._id);
      res.status(HttpConstants.SUCCESS).json({
        message: 'Password updated successfully',
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }

  // renew-access-token
  public async renewAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { vrto } = req.body;
      const decoded = jwt.verify(vrto, JWT_SECRET) as JwtPayload & { id: string };
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new BadRequestException('User not found'));
      }
      const token = await generateToken({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        fullName: user.fullName
      });
      res.status(HttpConstants.SUCCESS).json({
        message: 'Renew access token successfully',
        vato: token.accessToken,
        vrto: token.refreshToken,
        fullName: user.fullName
      });
    } catch (error) {
      next(error);
    }
  }
}
const authController: AuthController = new AuthController();
export default authController;
