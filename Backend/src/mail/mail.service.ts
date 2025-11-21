import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('MAIL_HOST'),
      port: this.config.get<number>('MAIL_PORT'),
      auth: {
        user: this.config.get<string>('MAIL_USER'),
        pass: this.config.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendTestEmail(to: string, p0: string, p1: string) {
    return await this.transporter.sendMail({
      from: '"School System" <no-reply@school.com>',
      to,
      subject: 'Prueba de Mailtrap ✔',
      text: 'Este es un correo de prueba.',
      html: '<b>Este es un correo de prueba enviado desde NestJS 🎉</b>',
    });
  }
}
