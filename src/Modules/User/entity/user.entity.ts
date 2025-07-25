import {ApiResponse} from "@core/handler/response.handler";

export interface IUserService {
    updateProfile(payload: updateProfileDto, userId: string): Promise<ApiResponse>;
}

export interface updateProfileDto {
    firstName?: string;
    lastName?: string;
    otherNames?: string;
    phoneNumber?: string;
    title?: string;
}

export interface IUserRepository {
    findById(id: string): Promise<any>;
    updateProfile(userId: string, data: updateProfileDto): Promise<any>;
}