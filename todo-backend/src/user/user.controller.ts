import { Body, Controller, Post } from '@nestjs/common';
import { LocalRegisterDTO } from './dto/local-register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/local')
  async localRegister(@Body() dto: LocalRegisterDTO): Promise<void> {
    await this.userService.registerUserLocal(dto);
  }
}
