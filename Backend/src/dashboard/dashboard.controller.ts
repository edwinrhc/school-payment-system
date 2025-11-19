import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/RolesGuard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard,RolesGuard)
export class DashboardController {

  @Get()
  @ApiOperation({ summary: 'Dashboard general' })
  index(){
    return {
      message: 'Bienvenido al Dashboard'
    }
  }



  @Get('admin')
  @Roles('admin')
  @ApiOperation({ summary: 'Dashboard exclusivo para administradores' })
  adminOnly(){
    return {
      message: 'Solo administradores pueden acceder a este recurso'
    };
  }


}
