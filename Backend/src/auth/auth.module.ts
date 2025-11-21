import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { MailModule } from '../mail/mail.module';


@Module({
  imports: [
    UsersModule,
    MailModule,
    JwtModule.register({
      global:true,
      secret: 'SUPER_SECRET_KEY',
      signOptions: { expiresIn: '2h' },
    }),

  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService]
})
export class AuthModule {}
