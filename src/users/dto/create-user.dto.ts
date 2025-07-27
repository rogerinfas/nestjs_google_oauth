import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;


  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;


  @IsOptional()
  @IsBoolean()
  isActive?: boolean;


  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
