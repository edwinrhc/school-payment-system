import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {

  @Get()
  @ApiOperation({ summary: 'Dashboard general' })
  index(){
    return {
      message: 'Bienvenido al Dashboard'
    }
  }



  @Get('admin')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Dashboard exclusivo para administradores' })
  adminOnly(){
    return {
      message: 'Bienvenido es parte del grupo administradores pueden acceder a este recurso'
    };
  }


}
