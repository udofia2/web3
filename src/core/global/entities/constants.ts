/* eslint-disable @typescript-eslint/no-explicit-any */

import {Request as ExpressRequest, Response} from "express";

export interface Request extends ExpressRequest {
    user?: any;
    business?: any;
}

export interface IattachTokenToResponse {
    res: Response
    token: string
    refresh_token: string
    session?: string
}

/**
 * Scope of the JWT token e.g. "read:write:pay"
 */

export interface IJWTPayload {
    authid: string
    email: string
    role: string
    clientid?: string
}

export interface IRefreshToken {
    userid: string
}

