import { UserRole } from '../entities/user.entity';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';


export class UpdateUserDto{
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserRole, { message:' El rol debe ser admin, user o parent ' })
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

}