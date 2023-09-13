import { NextApiRequest, NextApiResponse } from "next";
import logger from "jet-logger";

import loginSchema from "./index.validator";
import { validate } from "../../utils/validator";
import DBConnection from "../../../database/databaseActions/handlers";
import { generateJWT } from "../../utils/jwtGenerator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = await DBConnection.getAllData();

      const foundUser = data.users.find(
        (element) => element.username === req.body.username
      );

      if (!foundUser) {
        res
          .status(401)
          .json({ message: `User Not Found: ${req.body.username}` });
        return;
      } else if (foundUser.password !== req.body.password) {
        res.status(401).json({ message: `Wrong Password!` });
        return;
      }

      validate(loginSchema, req.body);
      const accessToken = generateJWT(foundUser);
      foundUser.accessToken = accessToken;

      DBConnection.saveData(data);
      res.status(201).json({ message: "You are signed In", user: foundUser });
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
