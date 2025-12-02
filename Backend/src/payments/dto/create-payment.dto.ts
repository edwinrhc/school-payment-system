import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePaymentDto {

  @IsInt({message: 'EL studentId debe ser un número entero'})
   studentId: number;


  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'El monto debe ser numérico '})
  @IsPositive({message: 'El monto debe ser mayor a 0'})
  amount: number;

  
  @IsString({ message: 'El mes debe ser una cadena de texto'})
  @IsNotEmpty({message: 'El mes es obligatorio'})
  month: string;




}