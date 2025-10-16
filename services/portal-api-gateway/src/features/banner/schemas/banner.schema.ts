import Joi from 'joi';

export const bannerSchema = Joi.object({
  imageUrl: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required()
});
