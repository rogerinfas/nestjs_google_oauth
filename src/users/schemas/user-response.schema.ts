import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../tasks/entities/task.entity';

export class UserResponseSchema {
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
    description: 'Lista de tareas del usuario',
    type: [Task],
    required: false,
  })
  tasks?: Task[];

  @ApiProperty({
    example: '2024-01-15T12:00:00Z',
    description: 'Fecha de creación del usuario',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T12:30:00Z',
    description: 'Fecha de última actualización del usuario',
  })
  updatedAt: Date;
} 