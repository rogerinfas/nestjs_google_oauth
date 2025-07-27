export class UserResponse {

  id: number;


  name: string;


  email: string;


  avatar?: string;


  provider: 'local' | 'google';


  isActive: boolean;


  createdAt: Date;
}

export class AuthResponse {

  user: UserResponse;


  access_token: string;
}