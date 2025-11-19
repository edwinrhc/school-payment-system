import { UserRole } from '../entities/user.entity';


export class UpdateUserDto{
  name?: string;
  email?: string;
  role?: UserRole;
}