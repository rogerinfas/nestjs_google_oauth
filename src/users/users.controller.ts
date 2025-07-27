import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, AdminRoute } from '../common/decorators/auth.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @AdminRoute()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @AdminRoute()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    // Si es admin o es el propio usuario
    if (user.role === 'admin' || user.id === +id) {
      return this.usersService.findOne(+id);
    }
    throw new ForbiddenException('No tienes permiso para ver este usuario');
  }

  @Patch(':id')
  @Auth()
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    // Si es admin o es el propio usuario
    if (user.role === 'admin' || user.id === +id) {
      return this.usersService.update(+id, updateUserDto);
    }
    throw new ForbiddenException('No tienes permiso para actualizar este usuario');
  }

  @Delete(':id')
  @AdminRoute()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
