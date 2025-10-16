import express from 'express';
import userController from '../controllers/user.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import validateSchema from '~/globals/middlewares/validateSchema.middleware';
import { userMeSchema } from '../schemas/user.schema';

const userRouter = express.Router();

userRouter.get('/me', validateSchema(userMeSchema), asyncWrapper(userController.getCurrentUser));

export default userRouter;
