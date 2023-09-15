import {
  Injectable,
  Post,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { LoginInterface } from 'src/auth/auth.types';
import DBConnection from 'src/database/databaseActions/handlers';
import { UserI } from 'src/database/databaseActions/model.types';
import { generateJWT } from 'src/utils/jwtGenerator';
import { v4 as uuidv4 } from 'uuid';
import logger from 'jet-logger';

@Injectable()
export class AuthService {
  @Post()
  async login(user: LoginInterface) {
    try {
      const data = await DBConnection.getAllData();

      const foundUser = data.users.find(
        (element) => element.username === user.username,
      );

      if (!foundUser) {
        throw new HttpException(
          'Forbidden, user not found!',
          HttpStatus.FORBIDDEN,
        );
      } else if (foundUser.password !== user.password) {
        throw new HttpException('Password are wrong', HttpStatus.FORBIDDEN);
      }
      const accessToken = generateJWT(foundUser);
      foundUser.accessToken = accessToken;

      DBConnection.saveData(data);
      return foundUser;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post()
  async signUp(userInfo: UserI) {
    try {
      const uuid = uuidv4();
      const newUser = {
        uuid: uuid,
        ...userInfo,
      };

      // Add the new user to the existing users array
      const data = await DBConnection.getAllData();
      const fillteredUsers = data.users.filter(
        (element) => element.username === newUser.username,
      );
      if (fillteredUsers.length) {
        throw new HttpException(
          'User already exist with the username',
          HttpStatus.FORBIDDEN,
        );
      }

      data.users.push(newUser);
      DBConnection.saveData(data);
      const res = { message: 'User created successfully', user: newUser };
      return res;
    } catch (error) {
      logger.err(error);
      throw new BadRequestException(error.message);
    }
  }
}
