import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsEnum, IsDateString } from 'class-validator';

export class CreateTaskDto {

  @IsNotEmpty()
  @IsString()
  title: string;


  @IsOptional()
  @IsString()
  description?: string;


  @IsOptional()
  @IsBoolean()
  completed?: boolean;


  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';


  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
