import { prisma } from "../lib/prisma";
import { CreateUserDTO, UpdateUserDTO } from "../types/user";
import bcrypt from "bcrypt";
import { AppError } from "../erros/AppError";

export class UserService {
    async create(dto: CreateUserDTO) {
        const hash = await bcrypt.hash(dto.password, 10)

        return prisma.users.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hash,
                active: true
            } as any
        });

    }

    async list() {
        return prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                active: true,
                createdAt: true,

            }
        })
    }
    async findById(id: string) {
        const user = await prisma.users.findUnique({
            where: { id }
        })
        if (!user) {
            throw new AppError('user nao encontrado', 404)
        }
        return user
    }

    async findByEmail(email: string) {
        return prisma.users.findUnique({
            where: { email }
        })
    }

    async update(id: string, data: UpdateUserDTO) {
        return prisma.users.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                active: true
            }
        })
    }

    async delete(id: string) {
        return prisma.users.delete({
            where: { id }
        })
    }
}