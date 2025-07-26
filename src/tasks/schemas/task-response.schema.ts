import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class TaskResponseSchema {
  @ApiProperty({
    example: 1,
    description: 'ID único de la tarea',
  })
  id: number;

  @ApiProperty({
    example: 'Implementar autenticación',
    description: 'Título de la tarea',
    maxLength: 200,
  })
  title: string;

  @ApiProperty({
    example: 'Implementar autenticación usando JWT y Google OAuth2',
    description: 'Descripción detallada de la tarea',
    required: false,
  })
  description: string;

  @ApiProperty({
    example: false,
    description: 'Estado de completado de la tarea',
    default: false,
  })
  completed: boolean;

  @ApiProperty({
    example: 'high',
    description: 'Prioridad de la tarea',
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  })
  priority: 'low' | 'medium' | 'high';

  @ApiProperty({
    example: '2024-02-01',
    description: 'Fecha de vencimiento de la tarea',
    required: false,
  })
  dueDate: Date;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario propietario de la tarea',
  })
  userId: number;

  @ApiProperty({
    description: 'Información del usuario propietario',
    type: () => User,
  })
  user: User;

  @ApiProperty({
    example: '2024-01-15T12:00:00Z',
    description: 'Fecha de creación de la tarea',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T12:30:00Z',
    description: 'Fecha de última actualización de la tarea',
  })
  updatedAt: Date;
} 