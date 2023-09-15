import * as jwt from 'jsonwebtoken';
import logger from 'jet-logger';
import { UserI } from 'src/database/databaseActions/model.types';

export function generateJWT(data: UserI) {
  try {
    const expiresIn = '1d';
    const generatedToken = jwt.sign(
      data,
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn },
    );

    return generatedToken;
  } catch (err) {
    logger.err(err);
    throw new Error('Jwt creation faild!');
  }
}
