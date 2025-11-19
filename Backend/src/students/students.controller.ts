import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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


@ApiTags('Students')
@ApiBearerAuth()
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({summary:'Crear estudiante'})
  @ApiResponse({status: 201, description: 'Estudiante creado'})
  @ApiResponse({status: 400, description: 'Datos inválidos'})
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Get()
  @ApiOperation({summary:'Listar estudiante'})
  @ApiResponse({status: 200, description: 'Retorna todos los estudiantes'})
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Obtener estudiante por ID'})
  @ApiResponse({status: 200, description: 'Obtener estudiante por ID'})
  @ApiResponse({status: 400, description: 'Estudiante no encontrado'})
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
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estudiante' })
  delete(@Param('id') id: string) {
    return this.studentsService.delete(+id);
  }
}
