import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth/auth.service';
import { LoginInterface } from '../auth.types';
import { validate } from 'src/utils/validator';
import { UserI } from 'src/database/databaseActions/model.types';
import { loginSchema, signUpSchema } from '../service/auth/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async getLogedIn(@Body() user: LoginInterface) {
    validate(loginSchema, user);
    const res = await this.authService.login(user);
    return res;
  }

  @Post('/sign-up')
  async signUp(@Body() userInfo: UserI) {
    validate(signUpSchema, userInfo);
    const res = await this.authService.signUp(userInfo);
    return res;
  }
}
