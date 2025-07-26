import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      userId,
    });
    return await this.taskRepository.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    if (user.role === UserRole.ADMIN) {
      return await this.taskRepository.find({
        relations: ['user'],
      });
    }
    
    return await this.taskRepository.find({
      where: { userId: user.id },
      relations: ['user'],
    });
  }

  async findByUser(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
