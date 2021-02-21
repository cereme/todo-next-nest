import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AuthType } from '../user.entity';

export class SocialRegisterDTO {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  username: string;

  @IsString()
  auth_id: string;

  auth_type: AuthType;
}
