import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
  ) {
  }

  /**
   * Registrar usuario
   * @param name
   * @param email
   * @param password
   * @param role
   */
  async register(name: string, email: string, password: string, role: UserRole = UserRole.USER) {
    const user = await this.usersService.createUser(
      name,
      email,
      password,
      role,
    );

    const payload = { sub: user.id, role: user.role };

    return {
      message: 'Usuario registrado exitosamente',
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  /**
   * Iniciar sesión
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmailInternal(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const check = await bcrypt.compare(password, user.password);
    if (!check) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, role: user.role };

    return {
      message: 'Login exitoso',
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }


  /**
   * Olvidar contraseña
   * @param email
   */
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmailInternal(email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutos

    await this.prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiresAt: expiresAt,
      },
    });
    await this.mailService.sendTestEmail(email, 'Recuperación de contraseña', `
    <p>Haz clic en el enlace para resetear tu contraseña:</p>
    <a href="http://localhost:3000/auth/reset-password?token=${token}">
      Resetear
    </a>
  `);

    return { message: 'Email enviado con instrucciones' };

  }


  /**
   * Recuperar contraseña
   * @param token
   * @param newPassword
   */
  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiresAt: { gt: new Date() },
      },
    });

    if (!user) throw new BadRequestException('Token inválido o expirado');

    const hash = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hash,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });

    return { message: 'Contraseña restablecida correctamente' };
  }


}
