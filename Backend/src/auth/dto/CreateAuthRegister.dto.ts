import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateAuthRegisterDto {

  @ApiProperty({example: 'Edwin', description:'Nombre Completo del usuario'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example: 'correo@correo.com', description:'Correo electrónico del usuario'})
  @IsEmail()
  email: string;


  @ApiProperty({example: '123456', description:'Contraseña del usuario'})
  @IsString()
  @MinLength(6)
  password: string;


  @ApiProperty({example: 'parent',required:false ,description:'Rol del usuario'})
  @IsOptional()
  @IsString()
  role?: string;




}