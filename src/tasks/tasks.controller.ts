import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ForbiddenException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AdminCreateTaskDto } from './dto/admin-create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth, AdminRoute } from '../common/decorators/auth.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Auth()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Post('admin')
  @AdminRoute()
  createAsAdmin(@Body() createTaskDto: AdminCreateTaskDto) {
    return this.tasksService.create(createTaskDto, createTaskDto.userId);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @Get('user/:userId')
  @AdminRoute()
  findByUser(@Param('userId') userId: string) {
    return this.tasksService.findByUser(+userId);
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    const task = await this.tasksService.findOne(+id);
    if (user.role === 'admin' || task.userId === user.id) {
      return task;
    }
    throw new ForbiddenException('No tienes permiso para ver esta tarea');
  }

  @Patch(':id')
  @Auth()
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
  async remove(@Param('id') id: string, @GetUser() user: User) {
    const task = await this.tasksService.findOne(+id);
    if (user.role === 'admin' || task.userId === user.id) {
      return this.tasksService.remove(+id);
    }
    throw new ForbiddenException('No tienes permiso para eliminar esta tarea');
  }
}
