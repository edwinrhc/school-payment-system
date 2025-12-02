import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('payments')
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Crear pago
   * @param dto
   */
  @Post()
  @ApiOperation({ summary: 'Crear pago para un alumno ' })
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(dto);
  }

  @Get('student/:id')
  @ApiOperation({ summary: 'Listar pagos de un alumno' })
  getByStudents(@Param('id') id: string){
    return this.paymentsService.getPaymentsByStudent(+id);
  }



  /**
   * Obtiene la lista de pagos asociados a los hijos del padre que ha iniciado sesión.
   *
   * @param {Request} req - El objeto de solicitud HTTP, que contiene la información del usuario padre.
   * @return {Promise<Array>} Una promesa que se resuelve con un array de pagos asociados a los hijos del padre.
   */
  @Get('me')
  @ApiOperation({ summary: 'Listar pagos de los hijos del padre logueado' })
  getMyPayments(@Req() req) {
    const parentId = req.user.id;
    return this.paymentsService.getPaymentsByParent(parentId);
  }

  /**
   * Marcar pago como pagado
   */
  @Patch(':id/pay')
  @ApiOperation({ summary: 'Marcar un paco como pagado' })
  markAskPaid(@Param('id') id: string) {
    return this.paymentsService.markAsPaid(+id);
  }
}
