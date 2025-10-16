import Joi from 'joi';

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
  phone: Joi.string().required().pattern(/^(?:\+84|0084|0)(?:[235789])\d{8}$/),
  state: Joi.string().required(),
  city: Joi.string().required(),
  locality: Joi.string().required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
