import { NextFunction, Response, Request, RequestHandler } from "express";

interface CacheEntry {
    timestamp: number;
    count: number;
}

class Idempotency {
    private cache: Map<string, CacheEntry>;
    private readonly timeWindow: number;
    private readonly maxRequests: number;

    constructor(timeWindow: number = 1000, maxRequests: number = 1) {
        this.cache = new Map();
        this.timeWindow = timeWindow;
        this.maxRequests = maxRequests;
        setInterval(() => this.cleanupCache(), timeWindow * 2);
    }

    private cleanupCache() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now - entry.timestamp > this.timeWindow) {
                this.cache.delete(key);
            }
        }
    }

    private generateKey(req: Request): string {
        return `${req.method}-${req.url}-${req.ip}`;
    }

    public middleware = (req: Request, res: Response, next: NextFunction) => {
        const key = this.generateKey(req);
        const now = Date.now();

        if (this.cache.has(key)) {
            const entry = this.cache.get(key)!;

            if (now - entry.timestamp < this.timeWindow) {
                if (entry.count >= this.maxRequests) {
                    return res.status(429).json({
                        error: 'Too Many Requests',
                        retryAfter: Math.ceil((entry.timestamp + this.timeWindow - now) / 1000)
                    });
                }
                entry.count++;
            }
            else {
                entry.timestamp = now;
                entry.count = 1;
            }
        }
        else {
            this.cache.set(key, { timestamp: now, count: 1 });
        }

        next();
    };
}

export const preventDuplicateRequests = (new Idempotency()).middleware as unknown as RequestHandler;
