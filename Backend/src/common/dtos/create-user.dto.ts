import { UserRole } from '../../modules/user/user.entity';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role?: UserRole; // <- pakai enum
}
