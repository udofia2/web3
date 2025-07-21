/* eslint-disable @typescript-eslint/no-explicit-any */

import * as errorHandler from "../errors";
import {isTokenValid} from "../utils/jwtHandler";
import { Response, NextFunction} from "express";
import { IJWTPayload, Request } from "../entities/constants"
import { Auth as AuthShema, prisma } from "../../db";
import crypto from 'crypto';
import logger from "../utils/logger";
import { comparePassword } from "../utils/generate.encryption.key";
import { Role } from "@prisma/client";

export class Auth {

    public static async getUserData(id: string): Promise<any> {
        const auth = await prisma.auth.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                session: true
            }
        })

        if(!auth) throw new errorHandler.NotFoundError("User not found");
        if(auth.is_blocked) throw new errorHandler.UnauthorizedError("Account suspended please contact support");
        if(auth.is_deleted) throw new errorHandler.UnauthorizedError("Account deleted please contact support ");
        return auth as unknown as AuthShema;
    };

    public static async guard(req: Request, res: Response, next: NextFunction ){
            let token: string|null = null;
            let clientid: string|null = null;

            const authHeader = req.headers?.authorization;
            if (authHeader && authHeader.startsWith('Bearer')) {
                token = authHeader.split(' ')[1];
            } else if (req.signedCookies?.token) {
                token = req.signedCookies.token;
            }

            if (!token) throw new errorHandler.UnauthenticatedError("Token not found in request");
            const payload: IJWTPayload | void = isTokenValid(token)

            if(payload){
                const userdata = await Auth.getUserData(payload.authid);
                payload.userid = userdata?.user?.id
                req.user = payload;
            }
            next();

    }

    public static async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const auth = await Auth.getUserData(req.user.authid)
            if (auth?.user?.role === Role.ADMIN || auth?.user?.role === Role.SUPER_ADMIN) {
                return next();
            }

            throw new errorHandler.UnauthorizedError("You are not authorized to perform this action");
        }
        catch (err) {
            next(err); // Use next to pass error to error middleware
        }
    }

    public static async validateRefreshToken(req: Request, res: Response, next: NextFunction){
        if(!req.signedCookies?.refresh_token)
            throw new errorHandler.UnauthenticatedError("Invalid or expired session");
        const refreshToken = req.signedCookies.refresh_token
        const payload = isTokenValid(refreshToken)
        if(payload){
            const userdata = await Auth.getUserData(payload.authid);
            payload.userid = userdata?.user?.id
            req.user = payload;
        }
        next();
    }

    public static async validateSignature(req: Request, res: Response, next: NextFunction){

            const rawBody = JSON.stringify(req.body);
            logger.info(`Raw body: ${rawBody}`)

                    if(!rawBody){
                        next()
                    }
                
                    const {authid} = req.user;
                    const authdata = await Auth.getUserData(authid);
            
                    if(!authdata.session) throw new errorHandler.NotFoundError("Invalid request");
                    const deviceid = authdata.session.deviceid;
                    const encryptionKey = process.env.ENCRYPTION_KEY as string;
                    const signature = req.headers['x-request-signature'];

                    if (!encryptionKey || !signature ) {
                        throw new errorHandler.BadRequestError("Missing required headers");
                    }
            
                    const hashKey = crypto.createHash('md5').update(`${deviceid}:${encryptionKey}`).digest('hex');

            
                    const calculatedDigest = crypto
                        .createHmac('sha256', hashKey as string)
                        .update(rawBody)
                        .digest('hex')

                    const result = calculatedDigest === req.headers['x-request-signature'];
                    if(!result) throw new errorHandler.BadRequestError("Invalid request signature");
                    next();

    }

    public static async requirePin(req: Request, res: Response, next: NextFunction) {
        const {authid} = req.user;
        const pin = req.headers['x-pin'] || req.body.pin;
        const authdata = await Auth.getUserData(authid);

        if(!pin) throw new errorHandler.BadRequestError("Pin is required");

        if(authdata.pin === "0000") throw new errorHandler.UnauthorizedError("Please set a transaction pin");

        const confirmPin = comparePassword(pin, authdata.pin);
        if(!confirmPin) throw new errorHandler.UnauthorizedError("Incorrect pin");
        delete req.body.pin; // remove pin from request body for security
        next();
    }

}