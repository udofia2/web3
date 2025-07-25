import {CustomError, NotFoundError, UnauthorizedError} from "@core/global/errors";
import {changePasswordDto, IAuthRepository, IAuthService, loginDto, resgisterDto} from "../entity/auth.entity";
import {AuthRPC} from "@core/brokers/RPC/rpc.interface";
import {ApiResponse, ResponseHandler} from "@core/handler/response.handler";
import AuthRepository from "@/Modules/Auth/repository/auth.repository";
import { comparePassword, encryptPassword } from "@/core/global/utils/generate.encryption.key";


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


    public async changePassword(payload: changePasswordDto, authId: string): Promise<ApiResponse> {
        try {
            
            const authRecord = await this.repository.findById(authId);
            if (!authRecord) {
                throw new NotFoundError("User not found");
            }

            
            const isOldPasswordValid = await comparePassword(payload.oldPassword, authRecord.password);
            if (!isOldPasswordValid) {
                throw new UnauthorizedError("Old password is incorrect");
            }

            
            const hashedNewPassword = await encryptPassword(payload.newPassword);

            
            await this.repository.updatePassword(authId, hashedNewPassword);

            return ResponseHandler.success(
                null,
                "00",
                "Password updated successfully"
            );

        } catch (error: any) {
            if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
                throw error;
            }
            throw new CustomError("Failed to update password");
        }
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
