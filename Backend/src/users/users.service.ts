import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Nota: Solo Login
  async findByEmailInternal(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
  ) {
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

  //Nota: Uso general sin password
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

  // Buscar por ID
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
