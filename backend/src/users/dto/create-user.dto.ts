import { IsString, IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role, { message: 'Valid role required' })
  @IsNotEmpty()
  role: Role;
}
