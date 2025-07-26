import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class AdminCreateTaskDto extends CreateTaskDto {
  @ApiProperty({
    description: 'ID del usuario propietario de la tarea',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
} 