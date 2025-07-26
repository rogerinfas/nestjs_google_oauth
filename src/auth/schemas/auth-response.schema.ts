import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    example: 1,
    description: 'ID único del usuario',
  })
  id: number;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  name: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Email del usuario',
  })
  email: string;

  @ApiProperty({
    example: 'https://lh3.googleusercontent.com/a/photo.jpg',
    description: 'URL del avatar del usuario (solo para usuarios de Google)',
    required: false,
  })
  avatar?: string;

  @ApiProperty({
    example: 'google',
    description: 'Proveedor de autenticación',
    enum: ['local', 'google'],
  })
  provider: 'local' | 'google';

  @ApiProperty({
    example: true,
    description: 'Estado del usuario',
  })
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-15T12:00:00Z',
    description: 'Fecha de creación',
  })
  createdAt: Date;
}

export class AuthResponse {
  @ApiProperty({
    description: 'Información del usuario autenticado',
    type: UserResponse,
  })
  user: UserResponse;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT para autenticación',
  })
  access_token: string;
} 