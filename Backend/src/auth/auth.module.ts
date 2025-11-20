import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global:true,
      secret: 'SUPER_SECRET_KEY',
      signOptions: { expiresIn: '2h' },
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      },
      defaults: {
        from: '"Soporte" <soporte@sistema.com>',
      },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService]
})
export class AuthModule {}
