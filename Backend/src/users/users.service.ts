import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
  ) {

    // Validar que el email no exista
    const existing = await this.prisma.user.findUnique({
      where: { email},
    });

    if(existing){
      throw new ConflictException('EL correo ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role
      },
    });

    const { password: _, ...rest } = newUser;
    return rest;
  }

  async findByEmail(email:string){
    return this.prisma.user.findUnique({where:{email}});
  }

  // Buscar por ID
  async findById(id: number){
    return this.prisma.user.findUnique({where:{id}});
  }


}
