import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateStudentDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsNumber()
  parentId: number;

}