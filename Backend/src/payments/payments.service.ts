import {
  ConflictException, ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus, UserRole } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear un pago para un estudiante
   */
  async createPayment(dto: CreatePaymentDto) {
    const { studentId, amount, month } = dto;

    //1. validar que el alumno exista
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Alumno no encontrado');
    }

    //2. Opcional: evitar pagos duplicados por alumno + mes
    const existing = await this.prisma.payment.findFirst({
      where: {
        studentId,
        month,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Ya existe un pago registrado para este alumno y mes',
      );
    }

    // 3. Crear el pago
    return this.prisma.payment.create({
      data: {
        studentId,
        amount,
        month,
        status: PaymentStatus.PENDING,
        provider: 'MANUAL',
      },
    });
  }

  /**
   * Listar pagos por un alumno
   */
  async getPaymentsByStudent(studentId: number) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { payments: true },
    });

    if (!student) {
      throw new NotFoundException('Alumno no encontrado');
    }

    return student.payments;
  }

  /**
   * Listar pagos de todos los hijos de un padre
   */
  async getPaymentsByParent(parentId: number) {
    const students = await this.prisma.student.findMany({
      where: { parentId },
      include: { payments: true },
    });

    // Devuelves cada alumno con sus pagos
    return students.map((s) => ({
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      grade: s.grade,
      payments: s.payments,
    }));
  }

  /**
   * Marcar un pago como pagado
   */
  async markAsPaid(paymentId: number, currentUserId: number, currentRole: UserRole) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { student: true },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    if (payment.status === PaymentStatus.PAID) {
      throw new ConflictException('El pago ya está marcado como pagado');
    }

    // Si es PARENT, valide que el alumno sea suyo
    if(currentRole === UserRole.PARENT && payment.student.parentId !== currentUserId){
      throw new ForbiddenException('No puedes pagar un alumno que no es tu hijo')
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.PAID,
        paidAt: new Date(),
      },
    });
  }
}
