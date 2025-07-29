import {IUserRepository, updateProfileDto} from "../entity/user.entity";
import {User, prisma} from "@core/db";

class UserRepository implements IUserRepository{
    private static instance: IUserRepository;

    static getInstance(): IUserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    public async findById(id: string): Promise<User> {
        return await prisma.user.findUnique({
            where: {
                id
            }
        }) as User;
    }

    public async findByIdWithAuth(id: string): Promise<any> {
        return await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                auth: {
                    select: {
                        email: true,
                        emailVerified: true,
                        status: true,
                        authLevel: true,
                        createdAt: true
                    }
                }
            }
        });
    }

    public async updateProfile(userId: string, data: updateProfileDto): Promise<User> {
        return await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...data,
                updatedAt: new Date()
            }
        }) as User;
    }

    public async updatePassword(userId: string, hashedPassword: string): Promise<User> {
        return await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                auth: {
                    update: {
                        password: hashedPassword
                    }
                },
                updatedAt: new Date()
            },
            include: {
                auth: true
            }
        }) as User;
    }

    public async updateTransactionPin(authId: string, hashedPin: string): Promise<any> {
        return await prisma.auth.update({
            where: {
                id: authId
            },
            data: {
                pin: hashedPin,
                updatedAt: new Date()
            }
        });
    }
}

export default UserRepository.getInstance()