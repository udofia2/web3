import {updateProfileDto} from "@/Modules/User/entity/user.entity";
import {StatusCodes} from "http-status-codes";
import UserService from "@/Modules/User/services/user.service";
import {Request, Response} from "express";

// Extend Express Request interface to include 'user' for temporary use
declare module "express-serve-static-core" {
    interface Request {
        user?: { userid: string; [key: string]: any };
    }
}

export class UserController {
    public static async updateProfile(req: Request, res: Response) {
        const payload: updateProfileDto = req.body;
        const userId = req.user?.userid as string; 
        const response = await UserService.updateProfile(payload, userId);
        res.status(StatusCodes.OK).json(response);
    }
}