import {
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login/local')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async withGoogle() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  @Redirect(process.env.AUTH_REDIRECT_URL, 302)
  async withGoogleCallback(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(req.user);
    response.cookie('jwt', access_token);
    return {
      url: process.env.AUTH_REDIRECT_URL,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected-with-jwt')
  protectedWithJwt() {
    return 'Hi! This content is protected with JwtAuthGuard!';
  }
}
