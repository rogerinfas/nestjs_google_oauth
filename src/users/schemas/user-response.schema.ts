import { Task } from '../../tasks/entities/task.entity';

export class UserResponseSchema {

  id: number;


  name: string;


  email: string;


  avatar?: string;


  provider: 'local' | 'google';


  isActive: boolean;


  tasks?: Task[];


  createdAt: Date;


  updatedAt: Date;
}