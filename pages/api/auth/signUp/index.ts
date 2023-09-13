import { NextApiRequest, NextApiResponse } from "next";
import logger from "jet-logger";
import { v4 as uuidv4 } from "uuid";

import signUpSchema from "./index.validator";
import { validate } from "../../utils/validator";
import DBConnection from "../../../database/databaseActions/handlers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const uuid = uuidv4();
      const newUser = {
        uuid: uuid,
        ...req.body,
      };

      // Add the new user to the existing users array
      const data = await DBConnection.getAllData();
      const fillteredUsers = data.users.filter(
        (element) => element.username === newUser.username
      );
      if (fillteredUsers.length) {
        res.status(401).json({
          message: `User already exist with the username: ${newUser.username}`,
        });
        return;
      }

      validate(signUpSchema, newUser);

      data.users.push(newUser);
      DBConnection.saveData(data);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      logger.err(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
