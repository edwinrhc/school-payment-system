import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/CreateStudentDto';
import { UpdateStudentDto } from './dto/UpdateStudentDto';

@Injectable()
export class StudentsService {

  constructor(private prisma: PrismaService){}

  create(data: CreateStudentDto){
    return this.prisma.student.create({data});
  }

  findAll(){
    return this.prisma.student.findMany({
      include:{
        parent:true
      }
    })
  }

  findOne(id: number){
    return this.prisma.student.findUnique({
      where:{id},
      include:{
        parent:true
      }
    })
  }

  async update(id: number, data: UpdateStudentDto){
    const exists = await this.prisma.student.findUnique({ where: { id } });
    if(!exists) throw new NotFoundException('Estudiante no encontrado');

    // Validar duplicado de documento
    if(data.numDoc){
      const numDocExists = await this.prisma.student.findUnique({
        where: {
          numDoc:data.numDoc
        }
      });

      // Evitar choque con el mismo registro
      if (numDocExists && numDocExists.id !== id) {
        throw new BadRequestException('El número de documento ya está registrado');
      }

    }

    // Validar typeDoc
    if(data.typeDoc){
      const validDocs = ['DNI','CE','PASSPORT'];
      if(!validDocs.includes(data.typeDoc)){
        throw new BadRequestException('Tipo de documento inválido');
      }
    }

    return this.prisma.student.update({
      where:{id},
      data
    });
  }

  delete(id: number){
    return this.prisma.student.delete({where:{id}});
  }

  findByParent(parentId: number){
    return this.prisma.student.findMany({
      where:{parentId},
      include:{parent:true}
    });
  }

}
