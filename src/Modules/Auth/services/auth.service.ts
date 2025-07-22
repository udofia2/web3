import {CustomError} from "@core/global/errors";
import {IAuthRepository, IAuthService, loginDto, resgisterDto} from "../entity/auth.entity";
import {AuthRPC} from "@core/brokers/RPC/rpc.interface";
import {ApiResponse} from "@core/handler/response.handler";
import AuthRepository from "@/Modules/Auth/repository/auth.repository";


class AuthService implements IAuthService {
    private readonly repository: IAuthRepository = AuthRepository;
    private static instance: IAuthService;

    constructor() {}

    static getInstance(): IAuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    // Implementing the methods from IAuthService interface

    public async login(payload: loginDto): Promise<ApiResponse> {
        throw new Error("Method not implemented.");
    }

    public async register(payload: resgisterDto): Promise<ApiResponse> {
        throw new Error("Method not implemented.");
    }

    //eg of RPC Handler
    async ServeRPCRequests(payload: any): Promise<any> {
        try {
            const {type, data} = payload;
            switch (type) {
                case AuthRPC.UPGRADE_ACCOUNT:
                    return await this.repository.findById(data.id);
                default:
                    return null;
            }
        } catch (e: any) {
            return null
        }
    }
}

export default AuthService.getInstance();
