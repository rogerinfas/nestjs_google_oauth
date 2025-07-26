import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskResponseSchema } from './schemas/task-response.schema';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tarea creada exitosamente',
    type: TaskResponseSchema,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tareas obtenida exitosamente',
    type: [TaskResponseSchema],
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener todas las tareas de un usuario específico' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tareas del usuario obtenida exitosamente',
    type: [TaskResponseSchema],
  })
  findByUser(@Param('userId') userId: string) {
    return this.tasksService.findByUser(+userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea encontrada',
    type: TaskResponseSchema,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarea no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea actualizada exitosamente',
    type: TaskResponseSchema,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarea no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de actualización inválidos',
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tarea no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
