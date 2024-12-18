import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtPayload } from 'models/jwt';
import { Public } from 'decorators/isPublic.decorator';
import { CredentialsDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(
    @Body() _credentials: CredentialsDto,
    @Request() req,
  ): Promise<{ token: string }> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req): JwtPayload {
    return req.user;
  }
}
