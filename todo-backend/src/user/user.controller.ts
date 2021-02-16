import { Body, Controller, Post } from '@nestjs/common';
import { BasicRegisterDTO } from './dto/basic-register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/basic')
  async basicRegister(@Body() dto: BasicRegisterDTO): Promise<void> {
    await this.userService.registerUserBasic(dto);
  }
}
