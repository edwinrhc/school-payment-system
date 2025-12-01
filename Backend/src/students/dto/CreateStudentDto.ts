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

  @ApiProperty({ example: 'DNI', description: 'Tipo de documento' })
  @IsString({message:'EL tipo de documento debe ser un texto'})
  @IsNotEmpty({message:'El tipo de documento es obligatorio'})
  typeDoc: string;

  @ApiProperty({example: '01234567', description: 'Ingrese número de documento'})
  @IsNotEmpty({message:'EL número de documento es obligatorio'})
  numDoc: string;

  @ApiProperty({ example: '6to A', description: 'Grado y sección' })
  @IsString({message:'EL grado debe ser un texto'})
  @IsNotEmpty({message:'El grado es obligatorio'})
  grade: string;

  @ApiProperty({ example: 1, description: 'ID del padre asociado' })
  @IsNumber({}, { message: 'El ID del padre debe ser un número' })
  parentId: number;

}