import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class AdminCreateTaskDto extends CreateTaskDto {

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}