import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../common/enums/user-role.enum';

interface GoogleUser {
  email: string;
  name: string;
  avatar: string;
  googleId: string;
  provider: 'google';
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      provider: 'local',
      role: UserRole.USER, // Asignar rol por defecto
    });

    const savedUser = await this.userRepository.save(user);

    // Generar token JWT
    const payload = { 
      sub: savedUser.id, 
      email: savedUser.email,
      role: savedUser.role,
    };
    const token = this.jwtService.sign(payload);

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = savedUser;

    return {
      user: userWithoutPassword,
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Buscar usuario por email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.provider !== 'local') {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token JWT
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      access_token: token,
    };
  }

  async validateUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user;
  }

  async validateOrCreateGoogleUser(googleUser: GoogleUser) {
    let user = await this.userRepository.findOne({
      where: [
        { email: googleUser.email },
        { googleId: googleUser.googleId },
      ],
    });

    if (user) {
      // Actualizar información de Google si es necesario
      if (user.provider === 'google' && user.googleId !== googleUser.googleId) {
        user.googleId = googleUser.googleId;
        user.avatar = googleUser.avatar;
        user = await this.userRepository.save(user);
      }
    } else {
      // Crear nuevo usuario de Google
      user = this.userRepository.create({
        ...googleUser,
        isActive: true,
        role: UserRole.USER, // Asignar rol por defecto
      });
      user = await this.userRepository.save(user);
    }

    // Generar token JWT
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      user,
      access_token: token,
    };
  }
} 