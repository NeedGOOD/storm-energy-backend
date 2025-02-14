export enum Role {
  Admin = 'admin',
  User = 'user'
}

export class CreateUserDto {
  first_name: string
  last_name: string
  email: string
  password: string
  role: Role
}
