import * as Joi from "joi";

const signUpSchema = Joi.object().keys({
  uuid: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().min(5).max(16).required(),
  image: Joi.string(),
});

export default signUpSchema;
