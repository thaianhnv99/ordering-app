import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UsersDocument } from '@app/common';
import { Error } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUsers(): Promise<UsersDocument[]> {
    return this.userRepository.find({});
  }

  async getUserById(user: Partial<UsersDocument>): Promise<UsersDocument> {
    try {
      return this.userRepository.findOne(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async createUser(newUser: CreateUserDto) {
    const hashedPassword = await this.hashPassword(newUser.password);
    try {
      const userCreated = await this.userRepository.create({
        ...newUser,
        password: hashedPassword,
      });
      return userCreated;
    } catch (error) {
      throw new HttpException('Create user fails', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyUser(email: string, password: string): Promise<UsersDocument> {
    const exitstingUser = await this.userRepository.findOne({ email });

    if (!exitstingUser) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // Compare password
    const passwordMath = this.dosePasswordMath(
      password,
      exitstingUser.password,
    );

    if (!passwordMath) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return exitstingUser;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async dosePasswordMath(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
