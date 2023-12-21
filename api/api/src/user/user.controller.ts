import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import NewUserDTO from './dto/new.user.dto';
import { MongoExceptionFilter } from 'src/errors/mongo.exception';

@Controller('user')
@UseFilters(MongoExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<Array<User>> {
    return this.userService.getAll();
  }

  @Post()
  add(@Body() newUser: NewUserDTO): Promise<User> {
    return this.userService.add(newUser.email, newUser.password);
  }
}
