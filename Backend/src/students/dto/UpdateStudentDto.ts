import { CreateStudentDto } from './CreateStudentDto';
import { PartialType } from '@nestjs/mapped-types';


export class UpdateStudentDto extends PartialType(CreateStudentDto){}