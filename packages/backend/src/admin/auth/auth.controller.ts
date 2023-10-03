import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInAdminDto, signUpAdminDto } from './dto';

@Controller('admin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: signUpAdminDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signIn(@Body() dto: signInAdminDto) {
    return this.authService.signIn(dto);
  }
}
