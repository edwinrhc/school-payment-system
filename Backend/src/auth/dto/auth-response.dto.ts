import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    example: 'registro exitoso',
  })
  message: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR....',
  })
  access_token: string;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Edwin',
      email: 'correo@correo.com',
      role: 'parent',
    },
  })
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  };
}
