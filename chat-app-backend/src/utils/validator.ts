import { BadRequestException } from '@nestjs/common';
import logger from 'jet-logger';
import * as joi from 'joi';

export function validate<T>(schema: joi.Schema, data: T) {
  const { error } = schema.validate(data);

  if (error) {
    logger.warn(error);
    throw new BadRequestException(error.message);
  }
}
