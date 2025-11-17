import { Injectable } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private users: User[] =  [];

  async createUser(name: string,
                   email: string,
                   password: string,
                   role: UserRole = UserRole.USER){

    const hash = await bcrypt.hash(password, 10);

    const newUser: User =  {
      id: crypto.randomUUID(),
      name,
      email,
      password: hash,
      role,
      createdAt: new Date()
    };

    this.users.push(newUser);

    const { password: _, ...rest } = newUser;
    return rest;

  }

  findByEmail(email: string){
    return this.users.find(user => user.email === email);
  }

  findById(id: string){
    return this.users.find(user => user.id === id);
  }


}
