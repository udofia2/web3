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
}

export default UserRepository.getInstance()