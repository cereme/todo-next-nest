import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalRegisterDTO } from './dto/local-register.dto';
import { SocialRegisterDTO } from './dto/social-register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async getUserByAuthId(auth_id: string): Promise<User> {
    return this.userRepository.findOne({ auth_id });
  }

  async checkEmailAvailable(email: string): Promise<boolean> {
    const res = await this.userRepository.find({ email });
    return !!res;
  }

  async registerUserLocal(dto: LocalRegisterDTO): Promise<any> {
    await this.userRepository.insert(dto);
  }

  async registerUserSocial(dto: SocialRegisterDTO): Promise<any> {
    await this.userRepository.insert(dto);
  }
}
