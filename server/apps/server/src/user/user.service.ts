import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../../libs/shared/src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
    create(_createUserDto: CreateUserDto) {
        return 'This action adds a new user'
    }

    async findAll() {
        const users = await this.prismaService.user.findMany()
        console.log(users)
        return users
    }

    findOne(_id: number) {
        return 'find one'
    }

    update(id: number, _updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
