import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async getUserHistory(userId: number) {
    return this.prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async addSearchHistory(userId: number, countrySearched: string) {
    return this.prisma.searchHistory.create({
      data: { userId, countrySearched },
    });
  }
}
