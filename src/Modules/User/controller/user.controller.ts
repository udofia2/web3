import {changePasswordDto, requestPinResetDto, resetTransactionPinDto, setTransactionPinDto, updateProfileDto, verifyPinResetOtpDto} from "@/Modules/User/entity/user.entity";
import {StatusCodes} from "http-status-codes";
import UserService from "@/Modules/User/services/user.service";
import {Response} from "express";
import { Request } from "@core/global/entities/constants"

export class UserController {
    public static async updateProfile(req: Request, res: Response) {
        const payload: updateProfileDto = req.body;
        const userId = req.user.userid; 
        const response = await UserService.updateProfile(payload, userId);
        res.status(StatusCodes.OK).json(response);
    }

    public static async getUserProfile(req: Request, res: Response) {
        const userId = req.user.userid;
        const response = await UserService.getUserProfile(userId);
        res.status(StatusCodes.OK).json(response);
    }

    public static async changePassword(req: Request, res: Response) {
        const payload: changePasswordDto = req.body;
        const authId = req.user.authid;
        const response = await UserService.changePassword(payload, authId);
        res.status(StatusCodes.OK).json(response);
    }

        public static async setTransactionPin(req: Request, res: Response) {
        const payload: setTransactionPinDto = req.body;
        const authId = req.user.authid;
        const response = await UserService.setTransactionPin(payload, authId);
        res.status(StatusCodes.OK).json(response);
    }


        public static async requestPinReset(req: Request, res: Response) {
        const payload: requestPinResetDto = req.body;
        const userId = req.user.userid;
        const response = await UserService.requestPinReset(payload, userId);
        res.status(StatusCodes.OK).json(response);
    }

    public static async verifyPinResetOtp(req: Request, res: Response) {
        const payload: verifyPinResetOtpDto = req.body;
        const response = await UserService.verifyPinResetOtp(payload);
        res.status(StatusCodes.OK).json(response);
    }

    public static async resetTransactionPin(req: Request, res: Response) {
        const payload: resetTransactionPinDto = req.body;
        const response = await UserService.resetTransactionPin(payload);
        res.status(StatusCodes.OK).json(response);
    }
}