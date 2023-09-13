import * as joi from "joi";
import logger from "jet-logger";

export function validate<T>(schema: joi.Schema, data: T) {
  const { error } = schema.validate(data);

  if (error) {
    logger.warn(error);
    throw TypeError("Validation issue!");
  }
}
