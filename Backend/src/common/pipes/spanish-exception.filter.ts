import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
} from '@nestjs/common';

export class SpanishBadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const original = exception.getResponse() as any;

    const messages = Array.isArray(original.message)
      ? original.message.map((msg) =>
          msg.includes('should not exist')
            ? `El campo ${msg.split(' ')[1]} no está permitido`
            : msg,
        )
      : original.message;

    response.status(400).json({
      statusCode: 400,
      error: 'Solicitud inválida',
      messages,
    });
  }
}
