import {ZodSchema} from "zod";
import {Request, Response, NextFunction} from "express";
import {ZodError} from "@/core/global/errors";

export const validateSchema = (schema: ZodSchema, overrideRequestBody: boolean = true) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body);
        if(!parsed.success){
            return next(new ZodError(parsed.error));
        }

        if(overrideRequestBody) {
            req.body = parsed.data;
        }

        next();
    }
}