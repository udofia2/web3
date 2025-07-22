import { Request, Response, NextFunction } from 'express';
import errorHandlerMiddleware from './errorHandler';
import logger from '../utils/logger';

export const use = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        errorHandlerMiddleware(err, req, res)
    })
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
}

export const responseLogger = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        logger.info(` ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${res.statusMessage} | ${req.ip} | ${req.headers['user-agent']}`);
    });
    next();
}
