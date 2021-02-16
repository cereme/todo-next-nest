import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicRegisterDTO } from './dto/basic-register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkEmailAvailable(email: string): Promise<boolean> {
    const res = await this.userRepository.find({ email });
    return !!res;
  }

  async registerUserBasic(dto: BasicRegisterDTO): Promise<any> {
    await this.userRepository.insert(dto);
  }
}
