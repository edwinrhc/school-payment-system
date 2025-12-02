import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Buscar usuario por email interno
   * @param email
   */
  async findByEmailInternal(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Crear usuario
   * @param name
   * @param email
   * @param password
   * @param role
   */
  async createUser(name: string,email: string,password: string,role: UserRole = UserRole.USER){
    // Validar que el email no exista
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('EL correo ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role,
      },
    });

    const { password: _, ...rest } = newUser;
    return rest;
  }


  /**
   * Actualizar usuario
   * @param id
   * @param dto
   * @param updatedBy
   */
  async updateUser(id: number, dto: UpdateUserDto, updatedBy: number) {

    const existingUser = await this.prisma.user.findUnique({
      where:{id},
    });

    if(!existingUser){
      throw new NotFoundException('Usuario no encontrado');
    }

    // Validar email único
    if(dto.email){
      const emailExists = await this.prisma.user.findUnique({
        where:{email:dto.email}
      });

      if(emailExists && emailExists.id !== id){
        throw new BadRequestException('El email ya está registrado');
      }
    }

    return this.prisma.user.update({
      where:{id},
      data:{
        ...dto,
        updatedBy: updatedBy,
      },
      select:{
        id:true,
        name:true,
        email:true,
        role:true,
        isActive:true,
        updatedBy:true,
      },
    });
  }


  /**
   * Actualizar contraseña
   * @param id
   * @param oldPass
   * @param newPass
   * @param updatedBy
   */
  async updatePassword(id: number, oldPass: string, newPass: string, updatedBy: number){
    const user = await this.prisma.user.findUnique({where:{id}});
    if(!user) throw new NotFoundException('Usuario no encontrado');

    const match = await bcrypt.compare(oldPass,user.password);
    if(!match) throw new UnauthorizedException('Contraseña actual incorrecta');

    const hash = await bcrypt.hash(newPass,10);

    await this.prisma.user.update({
      where: {id},
      data:{
        password: hash,
        updatedBy: updatedBy
      },
    });
    return { message: 'Contraseña actualizada correctamente'};

  }

  /**
   * Actualizar estado de usuario
   * @param id
   * @param isActive
   * @param updatedBy
   */
  async  updateStatus(id: number, isActive: boolean, updatedBy: number){
    const user = await this.prisma.user.findUnique({where:{id}});
    if(!user) throw new NotFoundException('Usuario no encontrado');

    return this.prisma.user.update({
      where: { id },
      data: {
        isActive,
        updatedBy,
      },
      select: {
        id: true,
        email: true,
        isActive: true,
        updatedAt: true,
      },
    });

  }


  /**
   * Listar usuarios
   */
  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
      },
    });
  }

  /**
   * Buscar usuario por email
   * @param email
   */
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // sin password
      },
    });
  }

  /**
   * Obtener usuario por ID
   * @param id
   */
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }




}
