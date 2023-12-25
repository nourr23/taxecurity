import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto, signUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: signUpDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signIn(@Body() dto: signInDto) {
    return this.authService.signIn(dto);
  }
}
