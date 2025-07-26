import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Implementar autenticación',
    maxLength: 200,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada de la tarea',
    example: 'Implementar sistema de autenticación usando JWT y Google OAuth2',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Estado de completado de la tarea',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Prioridad de la tarea',
    example: 'medium',
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  @ApiPropertyOptional({
    description: 'Fecha de vencimiento de la tarea',
    example: '2024-02-01',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({
    description: 'ID del usuario propietario de la tarea',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
