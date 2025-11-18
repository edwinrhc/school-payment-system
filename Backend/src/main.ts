import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SpanishBadRequestFilter } from './common/pipes/spanish-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  //NOTA: CONFIGURACIÓN SWAGGER
  const config = new DocumentBuilder()
    .setTitle('School Payment API')
    .setDescription('Documentación de la API para pagos escolares')
    .setVersion('1.0.0')
    .addBearerAuth() // Para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
