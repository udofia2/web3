/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@prisma/client";
import {Request as ExpressRequest, Response} from "express";

export interface Request extends ExpressRequest {
    user?: any;
}

export interface IattachTokenToResponse {
    res: Response
    token: string
    refresh_token: string
    session?: string
}

export interface IJWTPayload {
    userid: string
    email: string
    phone?: string
}

export interface IRefreshToken {
    userid: string
}

export enum access_type {
    READ,
    WRITE,
    PAY
}