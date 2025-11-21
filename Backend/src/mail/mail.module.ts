import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT ?? "2525"),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"Soporte" <no-reply@sistema.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 IMPORTANTE
})
export class MailModule {}
