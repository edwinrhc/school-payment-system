import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch() // Captura todas las excepciones
export class SpanishBadRequestFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Si no es BadRequestException, la dejamos pasar sin modificar
    if(!(exception instanceof BadRequestException)){
      const status = exception.status || 500;
      return response.status(status).json({
        statusCode: status,
        message: exception.message || 'Error interno del servidor',
      })
    }

    // Aquí sí sabemos que es un BadRequestException
    const original = exception.getResponse() as any;

    const messages = Array.isArray(original.message)
    ? original.message.map((msg) =>
          msg.includes('should not exist')
      ? `El campo ${msg.split(' ')[1]} no está permitido`
      :msg,
      )
    : original.message;

    response.status(400).json({
      statusCode: 400,
      error: 'Solicitud inválida',
      messages,
    });
  }
}
