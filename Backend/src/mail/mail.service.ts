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

  async sendEmail(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      from: '"School System" <no-reply@school.com>',
      to,
      subject,
      html,
    });
  }


  getResetPasswordTemplate(token: string) {
    const url = `http://localhost:3000/auth/reset-password?token=${token}`;

    return `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>🔐 Recuperación de contraseña</h2>
    <p>Hola,</p>
    <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>

    <p>Haz clic en el botón para continuar:</p>

    <a href="${url}" 
      style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 15px;
      ">
      Resetear contraseña
    </a>

    <p style="margin-top: 20px;">
      Si tú no solicitaste este cambio, ignora este mensaje.
    </p>

    <p style="font-size: 12px; color: #888; margin-top: 30px;">
      © ${new Date().getFullYear()} School System - Todos los derechos reservados.
    </p>
  </div>
  `;
  }

}
