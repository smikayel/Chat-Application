import * as Joi from "joi";

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(5).max(16).required(),
});

export default loginSchema;
