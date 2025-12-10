import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/CreateStudentDto';
import { UpdateStudentDto } from './dto/UpdateStudentDto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({summary:'Crear estudiante'})
  @ApiResponse({status: 201, description: 'Estudiante creado'})
  @ApiResponse({status: 400, description: 'Datos inválidos'})
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @ApiOperation({summary:'Listar estudiante'})
  @ApiResponse({status: 200, description: 'Retorna todos los estudiantes'})
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Obtener estudiante por ID'})
  @ApiResponse({status: 200, description: 'Obtener estudiante por ID'})
  @ApiResponse({status: 404, description: 'Estudiante no encontrado'})
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

/*  @Get('parent/:id')
  @ApiOperation({summary:'Obtener estudiante por ID'})
  @ApiResponse({status: 200, description: 'Obtener estudiante por ID'})
  @ApiResponse({status: 400, description: 'Estudiante no encontrado'})
  findByParent(@Param('id') id: string) {
    return this.studentsService.findByParent(+id);
  }*/

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar estudiante' })
  @ApiResponse({ status: 200, description: 'Estudiante actualizado' })
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estudiante' })
  @ApiResponse({ status: 200, description: 'Estudiante eliminado' })
  @Roles(UserRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.studentsService.delete(+id);
  }
}
