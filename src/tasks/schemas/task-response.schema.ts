import { User } from '../../users/entities/user.entity';

export class TaskResponseSchema {

  id: number;


  title: string;


  description: string;


  completed: boolean;


  priority: 'low' | 'medium' | 'high';


  dueDate: Date;


  userId: number;


  user: User;


  createdAt: Date;


  updatedAt: Date;
}