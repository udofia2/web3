import {CustomError, NotFoundError} from "@core/global/errors";
import {IUserRepository, IUserService, updateProfileDto, UserProfileDto} from "../entity/user.entity";
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

    public async getUserProfile(userId: string): Promise<ApiResponse> {
        try {
            const userWithAuth = await this.repository.findByIdWithAuth(userId);
            
            if (!userWithAuth) {
                throw new NotFoundError("User profile not found");
            }

            // Map the data to the expected profile format
            const profileData: UserProfileDto = {
                id: userWithAuth.id,
                firstName: userWithAuth.firstName,
                lastName: userWithAuth.lastName,
                otherNames: userWithAuth.otherNames,
                phoneNumber: userWithAuth.phoneNumber,
                title: userWithAuth.title,
                email: userWithAuth.auth.email,
                emailVerified: userWithAuth.auth.emailVerified,
                status: userWithAuth.auth.status,
                authLevel: userWithAuth.auth.authLevel,
                createdAt: userWithAuth.createdAt,
                updatedAt: userWithAuth.updatedAt
            };

            return ResponseHandler.success(
                profileData,
                "00",
                "User profile retrieved successfully"
            );

        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new CustomError("Failed to retrieve user profile");
        }
    }

    public async updateProfile(payload: updateProfileDto, userId: string): Promise<ApiResponse> {
        try {

            const existingUser = await this.repository.findById(userId);
            if (!existingUser) {
                throw new NotFoundError("User not found");
            }

   
            const updatedUser = await this.repository.updateProfile(userId, payload);


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