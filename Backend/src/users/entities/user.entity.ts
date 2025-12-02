import { ApiProperty } from '@nestjs/swagger';

export enum ApiUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PARENT = 'PARENT',
}

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['ADMIN', 'USER', 'PARENT'] })
  role: string; // o directamente 'ADMIN' | 'USER' | 'PARENT'
}