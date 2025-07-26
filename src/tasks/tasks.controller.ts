import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AdminCreateTaskDto } from './dto/admin-create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth, AdminRoute } from '../common/decorators/auth.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { TaskResponseSchema } from './schemas/task-response.schema';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Crear una nueva tarea (usuario crea para sí mismo)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tarea creada exitosamente',
    type: TaskResponseSchema,
  })
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Post('admin')
  @AdminRoute()
  @ApiOperation({ summary: 'Crear una tarea para cualquier usuario (solo admin)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tarea creada exitosamente',
    type: TaskResponseSchema,
  })
  createAsAdmin(@Body() createTaskDto: AdminCreateTaskDto) {
    return this.tasksService.create(createTaskDto, createTaskDto.userId);
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Obtener tareas (admin: todas, usuario: solo las propias)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tareas obtenida exitosamente',
    type: [TaskResponseSchema],
  })
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @Get('user/:userId')
  @AdminRoute()
  @ApiOperation({ summary: 'Obtener tareas de un usuario específico (solo admin)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tareas del usuario obtenida exitosamente',
    type: [TaskResponseSchema],
  })
  findByUser(@Param('userId') userId: string) {
    return this.tasksService.findByUser(+userId);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea encontrada',
    type: TaskResponseSchema,
  })
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    const task = await this.tasksService.findOne(+id);
    if (user.role === 'admin' || task.userId === user.id) {
      return task;
    }
    throw new ForbiddenException('No tienes permiso para ver esta tarea');
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({ summary: 'Actualizar una tarea' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea actualizada exitosamente',
    type: TaskResponseSchema,
  })
  async update(
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    const task = await this.tasksService.findOne(+id);
    if (user.role === 'admin' || task.userId === user.id) {
      return this.tasksService.update(+id, updateTaskDto);
    }
    throw new ForbiddenException('No tienes permiso para actualizar esta tarea');
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tarea eliminada exitosamente',
  })
  async remove(@Param('id') id: string, @GetUser() user: User) {
    const task = await this.tasksService.findOne(+id);
    if (user.role === 'admin' || task.userId === user.id) {
      return this.tasksService.remove(+id);
    }
    throw new ForbiddenException('No tienes permiso para eliminar esta tarea');
  }
}
