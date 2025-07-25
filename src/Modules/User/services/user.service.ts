import {CustomError, NotFoundError} from "@core/global/errors";
import {IUserRepository, IUserService, updateProfileDto} from "../entity/user.entity";
import {UserRPC} from "@core/brokers/RPC/rpc.interface";
import {ApiResponse, ResponseHandler} from "@core/handler/response.handler";
import UserRepository from "@/Modules/User/repository/user.repository";

class UserService implements IUserService {
    private readonly repository: IUserRepository = UserRepository;
    private static instance: IUserService;

    constructor() {}

    static getInstance(): IUserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async updateProfile(payload: updateProfileDto, userId: string): Promise<ApiResponse> {
        try {
            // Check if user exists
            const existingUser = await this.repository.findById(userId);
            if (!existingUser) {
                throw new NotFoundError("User not found");
            }

            // Update user profile
            const updatedUser = await this.repository.updateProfile(userId, payload);

            // Return updated profile (excluding sensitive data)
            const { authId, ...userProfile } = updatedUser;

            return ResponseHandler.success(
                userProfile,
                "00",
                "Profile updated successfully"
            );

        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new CustomError("Failed to update profile");
        }
    }

    // RPC Handler
    async ServeRPCRequests(payload: any): Promise<any> {
        try {
            const {type, data} = payload;
            switch (type) {
                case UserRPC.GET_USER_BY_ID:
                    return await this.repository.findById(data.id);
                case UserRPC.UPDATE_USER_BY_ID:
                    return await this.repository.updateProfile(data.id, data.updateData);
                default:
                    return null;
            }
        } catch (e: any) {
            return null
        }
    }
}

export default UserService.getInstance();