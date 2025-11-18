import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SpanishBadRequestFilter } from './common/pipes/spanish-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo permite los campos declarados en el DTO
      forbidNonWhitelisted: true, // si llega un campo NO permitido, lanza Error
      transform: true, // Convierte tipo automáticamente (string -> number)
    }),
  )

  // Filtro personalizado (Traducción de errores)
  app.useGlobalFilters(new SpanishBadRequestFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
