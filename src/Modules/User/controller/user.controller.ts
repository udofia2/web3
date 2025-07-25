import {updateProfileDto} from "@/Modules/User/entity/user.entity";
import {StatusCodes} from "http-status-codes";
import UserService from "@/Modules/User/services/user.service";
import {Request, Response} from "express";

export class UserController {
    public static async updateProfile(req: Request, res: Response) {
        const payload: updateProfileDto = req.body;
        const userId = "req.user.userid"; 
        // const userId = req.user.userid; 
        const response = await UserService.updateProfile(payload, userId);
        res.status(StatusCodes.OK).json(response);
    }
}