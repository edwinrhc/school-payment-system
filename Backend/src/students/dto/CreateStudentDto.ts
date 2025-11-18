import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateStudentDto {

  @ApiProperty({ example: 'Dafne', description: 'Nombre del estudiante' })
  @IsString({message:'EL nombre debe ser un texto'})
  @IsNotEmpty({message:'El nombre es obligatorio'})
  firstName: string;

  @ApiProperty({ example: 'Cuevas', description: 'Apellido del estudiante' })
  @IsString({message:'EL apellido debe ser un texto'})
  @IsNotEmpty({message:'El apellido es obligatorio'})
  lastName: string;

  @ApiProperty({ example: '6to A', description: 'Grado y sección' })
  @IsString({message:'EL grado debe ser un texto'})
  @IsNotEmpty({message:'El grado es obligatorio'})
  grade: string;

  @ApiProperty({ example: 1, description: 'ID del padre asociado' })
  @IsNumber({}, { message: 'El ID del padre debe ser un número' })
  parentId: number;

}