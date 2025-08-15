import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string; // bisa username atau email

  @IsNotEmpty()
  @IsString()
  password: string;
}
