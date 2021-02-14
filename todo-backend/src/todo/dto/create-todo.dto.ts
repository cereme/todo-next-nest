import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isFinished?: boolean;
}
