import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const userMeSchema = Joi.object({
  email: Joi.string().email().required()
});
