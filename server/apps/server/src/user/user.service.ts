import { PrismaService } from './../../../../libs/shard/src/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
    create(_createUserDto: CreateUserDto) {
        return 'This action adds a new user'
    }

    findAll() {
        return 11122233344455566
    }

    findOne(_id: number) {
        return this.prismaService.print()
    }

    update(id: number, _updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
