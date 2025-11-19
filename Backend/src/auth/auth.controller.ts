import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, UserRole } from '../users/entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthRegisterDto } from './dto/CreateAuthRegister.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  register(@Body() dto: CreateAuthRegisterDto){
    const role =
      dto.role === 'admin'
        ? UserRole.ADMIN
        : dto.role === 'user'
        ? UserRole.USER
        : UserRole.PARENT;

    return  this.authService.register(
      dto.name,
      dto.email,
      dto.password,
      role
    )
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
