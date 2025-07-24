import {loginDto} from "@/Modules/Auth/entity/auth.entity";
import {StatusCodes} from "http-status-codes";
import AuthService from "@/Modules/Auth/services/auth.service";
import {Request, Response} from "express";

export class AuthController {
    public static async login(req: Request, res: Response) {
        const payload: loginDto = req.body;
        const response = await AuthService.login(payload);
        res.status(StatusCodes.OK).json(response);
    }

    public static async register(req: Request, res: Response) {
        const payload = req.body;
        const response = await AuthService.register(payload);
        res.status(StatusCodes.CREATED).json(response);
    }
}