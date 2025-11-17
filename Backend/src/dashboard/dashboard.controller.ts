import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/RolesGuard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard,RolesGuard)
export class DashboardController {

  @Get()
  index(){
    return {
      message: 'Bienvenido al Dashboard'
    }
  }

  @Get('admin')
  @Roles('admin')
  adminOnly(){
    return {
      message: 'Solo administradores pueden acceder a este recurso'
    };
  }


}
