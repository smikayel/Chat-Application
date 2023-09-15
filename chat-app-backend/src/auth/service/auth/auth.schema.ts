import * as Joi from 'joi';

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(5).max(16).required(),
});

export const signUpSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(5).max(16).required(),
  image: Joi.string(),
});
