import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, AdminRoute } from '../common/decorators/auth.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @AdminRoute()
  @ApiOperation({ summary: 'Crear un nuevo usuario (solo admin)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario creado exitosamente',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @AdminRoute()
  @ApiOperation({ summary: 'Obtener todos los usuarios (solo admin)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de usuarios obtenida exitosamente',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario encontrado',
    type: User,
  })
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    // Si es admin o es el propio usuario
    if (user.role === 'admin' || user.id === +id) {
      return this.usersService.findOne(+id);
    }
    throw new ForbiddenException('No tienes permiso para ver este usuario');
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario actualizado exitosamente',
    type: User,
  })
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
  @ApiOperation({ summary: 'Eliminar un usuario (solo admin)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario eliminado exitosamente',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
