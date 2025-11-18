import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo permite los campos declarados en el DTO
      forbidNonWhitelisted: true, // si llega un campo NO permitido, lanza Error
      transform: true, // Convierte tipo automáticamente (string -> number)
    }),
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
