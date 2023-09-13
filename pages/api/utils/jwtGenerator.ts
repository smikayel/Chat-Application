import jwt from "jsonwebtoken";
import logger from "jet-logger";
import dotenv from "dotenv";

import { UserI } from "../../database/databaseActions/model.types";

dotenv.config();

export function generateJWT(data: UserI) {
  try {
    const expiresIn = "1d";
    const generatedToken = jwt.sign(
      data,
      process.env.JWT_SECRET || "supersecret",
      { expiresIn }
    );

    return generatedToken;
  } catch (err) {
    logger.err(err);
    throw new Error("Jwt creation faild!");
  }
}
