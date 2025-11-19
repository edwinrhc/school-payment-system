import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user.entity';


export class RegisterDto {
  @ApiProperty({
    example: 'Edwin',
    description: 'Nombre Completo del usuario' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'correo@correo.com',
    description: 'Correo electrónico del usuario',
    minLength: 6,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'parent',
    required: false,
    description: 'Rol del usuario',
  })
  @IsOptional()
  @IsEnum(UserRole, { message:' El rol debe ser admin, user o parent '})
  role?: UserRole;
}