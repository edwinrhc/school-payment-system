import { Injectable, NotFoundException } from '@nestjs/common';
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
    const exists = await this.prisma.student.findUnique({where:{id}});
    if(!exists) throw new NotFoundException('Student not found');

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
