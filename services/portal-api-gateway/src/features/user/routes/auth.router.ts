import express from 'express';
import authController from '../controllers/auth.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import validateSchema from '~/globals/middlewares/validateSchema.middleware';
import { signInSchema, signUpSchema } from '../schemas/auth.schema';

const authRouter = express.Router();

authRouter.post('/signup', validateSchema(signUpSchema), asyncWrapper(authController.signUp));
authRouter.post('/signin', validateSchema(signInSchema), asyncWrapper(authController.signIn));
authRouter.post('/forgot-password', asyncWrapper(authController.forgotPassword));
authRouter.post('/reset-password', asyncWrapper(authController.resetPassword));

// router otp reset password
authRouter.post('/reset-password-phone', asyncWrapper(authController.resetPasswordPhone));
authRouter.post('/verify-otp', asyncWrapper(authController.verifyOTP));
authRouter.post('/update-password', asyncWrapper(authController.updatePassword));

export default authRouter;
