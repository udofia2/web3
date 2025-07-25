import {IAuthRepository} from "../entity/auth.entity";
import {Auth, prisma} from "@core/db";

class AuthRepository implements IAuthRepository{
    private static instance: IAuthRepository;

    static getInstance(): IAuthRepository {
        if (!AuthRepository.instance) {
            AuthRepository.instance = new AuthRepository();
        }
        return AuthRepository.instance;
    }

    public async  findByEmail(email: string): Promise<Auth> {
        return await prisma.auth.findUnique({
            where: {
                email
            }
        }) as Auth;
    }

    public async findById(id: string): Promise<Auth> {
        return await prisma.auth.findUnique({
            where: {
                id
            }
        }) as Auth;
    }


    public async updatePassword(authId: string, hashedPassword: string): Promise<Auth> {
        return await prisma.auth.update({
            where: {
                id: authId
            },
            data: {
                password: hashedPassword,
                updatedAt: new Date()
            }
        }) as Auth;
    }
}

export default AuthRepository.getInstance()