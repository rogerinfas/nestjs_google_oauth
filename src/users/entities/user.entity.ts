import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../tasks/entities/task.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'ID único del usuario',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
    maxLength: 100,
  })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Email único del usuario',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '$2a$10$...',
    description: 'Contraseña encriptada del usuario',
    nullable: true,
  })
  @Column({ nullable: true })
  password: string;

  @ApiProperty({
    example: true,
    description: 'Estado activo/inactivo del usuario',
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    example: '123456789',
    description: 'ID de Google del usuario (solo para usuarios de Google)',
    nullable: true,
  })
  @Column({ nullable: true })
  googleId: string;

  @ApiProperty({
    example: 'https://lh3.googleusercontent.com/a/photo.jpg',
    description: 'URL del avatar del usuario (solo para usuarios de Google)',
    nullable: true,
  })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({
    example: 'local',
    description: 'Proveedor de autenticación',
    enum: ['local', 'google'],
    default: 'local',
  })
  @Column({ default: 'local' })
  provider: 'local' | 'google';

  @ApiProperty({
    description: 'Lista de tareas del usuario',
    type: () => [Task],
  })
  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @ApiProperty({
    example: '2024-01-15T12:00:00Z',
    description: 'Fecha de creación del usuario',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T12:30:00Z',
    description: 'Fecha de última actualización del usuario',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
