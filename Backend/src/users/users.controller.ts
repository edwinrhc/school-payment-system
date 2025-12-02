import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/RolesGuard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { UpdateStatusDto } from './dto/UpdateStatusDto';

import type { Request } from 'express';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}

  /**
   * GET /users
   * GET /users?email=email
   * @param email
   */
  @Get()
  @ApiOperation({summary:'Listar usuarios o buscar por email'})
  @ApiResponse({status: 200, description: 'Retorna  los usuarios o  un usuario por email'})
  @ApiResponse({status: 404, description: 'Usuarios  no encontrados o  no se encontró usuario por email'})
  @Roles(UserRole.ADMIN)
  find(@Query('email') email?: string){
    if(email){
      return this.usersService.findByEmail(email);
    }
    return this.usersService.findAll();
  }

  // @Get('email/:email')
  // @ApiOperation({summary:'Obtener usuario por email'})
  // @ApiResponse({status: 200, description: 'Obtener usuario por email'})
  // @ApiResponse({status: 404, description: 'Usuario no encontrado'})
  // @Roles(UserRole.ADMIN)
  // findByEmail(@Param('email') email:string){
  //   return this.usersService.findByEmail(email);
  // }


  /**
   * GET /users/:id
   */
  @Get(':id')
  @ApiOperation({summary:'Obtener usuario por ID'})
  @ApiResponse({status: 200, description: 'Usuario encontrado'})
  @ApiResponse({status: 404, description: 'Usuario no encontrado'})
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string){
    return this.usersService.findOne(+id);
  }

  /**
   * PATCH /users/:id
   * @param id
   * @param dto
   * @param req
   */
  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateUserDto, @Req() req: Request) {
    return this.usersService.updateUser(+id, dto, req.user.id);
  }


  /**
   * PATCH /users/:id/password
   * @param id
   * @param dto
   * @param req
   */
  @Patch(':id/password')
  updatePassword(@Param('id') id: string,@Body() dto: UpdatePasswordDto,@Req() req){
    return this.usersService.updatePassword(
      +id,
      dto.oldPassword,
      dto.newPassword,
      req.user.id,
    );
  }

  /**
   * PATCH /users/:id/status
   * @param id
   * @param dto
   * @param req
   */
  @Patch(':id/status')
  updateStatus(@Param('id') id: string,@Body() dto: UpdateStatusDto,@Req() req,) {
    return this.usersService.updateStatus(+id, dto.isActive, req.user.id);
  }



}
