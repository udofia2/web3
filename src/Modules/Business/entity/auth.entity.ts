import {ApiResponse} from "@core/handler/response.handler";

export interface IAuthService {
    login(payload: loginDto): Promise<ApiResponse>;
    register(payload: resgisterDto): Promise<ApiResponse>;

}

export interface loginDto {
    email: string;
    password: string;
}

export interface resgisterDto {
    email: string;
    password: string;
}

export interface IAuthRepository {
    findById(id: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
}