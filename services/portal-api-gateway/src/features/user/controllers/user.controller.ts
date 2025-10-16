import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import { BadRequestException } from '~/globals/cores/error.core';

class UserController {
  public async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return next(new BadRequestException('User not found'));
      }
      res.status(200).json({
        message: 'User found successfully',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}
const userController: UserController = new UserController();
export default userController;
