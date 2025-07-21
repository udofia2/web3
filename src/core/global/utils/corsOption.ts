import cors from "cors";
import { Request, Response, NextFunction } from "express";



/**
 * Add cors middle ware before supertokens middleware
 */

// Specify whitelisted domains
const whiteListForStaging = new Set([
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost:3001",
    "https://localhost:3001",
    "http://localhost:3009",
    "https://localhost:3009",
    "https://localhost:3004",
    "http://localhost:3004",
    "http://localhost:3003",
    "https://localhost:3003",
    "http://localhost:8080",
    "https://staging.merchant.wrapcbdc.com",
    "https://merchant.wrapcbdc.com",
    "https://staging.merchant.wrapcbdc.com",
    "https://admin.wrapcbdc.com",
    "https://staging.admin.wrapcbdc.com",
    "https://staging.api.wrapcbdc.com",
]);

const whiteListForProduction = new Set([
    "https://cngn.co",
    "https://app.cngn.co",
    "https://admin.cngn.co"
]);

const corsOptions = {
    origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (!origin) {
            return callback(null, true);
        }
        const normalizedOrigin = origin.replace(/\/$/, '');
        let domains: Set<string>
        if (process.env.NODE_ENV === "production") {
            domains = whiteListForProduction;
        }
        else domains = whiteListForStaging;
        if (domains.has(normalizedOrigin)) {
            callback(null, true);
        }
        else {
            console.info(`Rejected Origin: ${origin}`); // This helps with debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

export const trpcCors = (req: Request, res: Response, next: NextFunction) => {
    cors(corsOptions)(req, res, next);
};
