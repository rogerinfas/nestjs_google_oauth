import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ length: 100 })
  name: string;


  @Column({ unique: true })
  email: string;


  @Column({ nullable: true })
  password: string;


  @Column({ default: true })
  isActive: boolean;


  @Column({ nullable: true })
  googleId: string;


  @Column({ nullable: true })
  avatar: string;


  @Column({ default: 'local' })
  provider: 'local' | 'google';


  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;


  @OneToMany(() => Task, task => task.user)
  tasks: Task[];


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
