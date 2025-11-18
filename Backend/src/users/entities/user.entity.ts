export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PARENT = 'parent',
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date = new Date();
}
