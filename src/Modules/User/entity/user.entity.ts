import {ApiResponse} from "@core/handler/response.handler";

export interface IUserService {
    updateProfile(payload: updateProfileDto, userId: string): Promise<ApiResponse>;
    getUserProfile(userId: string): Promise<ApiResponse>;
    changePassword(payload: changePasswordDto, userId: string): Promise<ApiResponse>;

}

export interface updateProfileDto {
    firstName?: string;
    lastName?: string;
    otherNames?: string;
    phoneNumber?: string;
    title?: string;
}


export interface changePasswordDto {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UserProfileDto {
    id: string;
    firstName: string;
    lastName: string;
    otherNames?: string;
    phoneNumber?: string;
    title: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    // Account metadata
    emailVerified: boolean;
    status: string;
    authLevel: string;
}

export interface IUserRepository {
    findById(id: string): Promise<any>;
    findByIdWithAuth(id: string): Promise<any>;
    updateProfile(userId: string, data: updateProfileDto): Promise<any>;
    updatePassword(userId: string, hashedNewPassword: string): Promise<any>;

}