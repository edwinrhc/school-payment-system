import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateStudentDto {

  @IsString({message:'EL nombre debe ser un texto'})
  @IsNotEmpty({message:'El nombre es obligatorio'})
  firstName: string;

  @IsString({message:'EL apellido debe ser un texto'})
  @IsNotEmpty({message:'El apellido es obligatorio'})
  lastName: string;

  @IsString({message:'EL grado debe ser un texto'})
  @IsNotEmpty({message:'El grado es obligatorio'})
  grade: string;

  @IsNumber({}, { message: 'El ID del padre debe ser un número' })
  parentId: number;

}