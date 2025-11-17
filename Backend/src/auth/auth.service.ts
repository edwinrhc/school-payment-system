import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(name: string, email: string, password: string, role: UserRole = UserRole.USER){
    const user = await this.usersService.createUser(name, email, password,role);
    return user;
  }


  async login(email: string, password: string){
    const user = this.usersService.findByEmail(email);
    if(!user) throw new UnauthorizedException('Credenciales inválidas');

    const check = await bcrypt.compare(password, user.password);
    if(!check) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, role: user.role};

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }


}
