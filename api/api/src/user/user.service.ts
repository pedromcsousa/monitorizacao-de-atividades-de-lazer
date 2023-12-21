import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return this.userModel.find();
  }

  async add(email: string, password?: string) {
    const newUser = new this.userModel();
    newUser.email = email;
    newUser.password = password;
    return newUser.save();
  }
}
