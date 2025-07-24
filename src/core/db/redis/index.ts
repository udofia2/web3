/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient, RedisClientType } from "redis";
import logger from "@/core/global/utils/logger";

class RedisManager {
    private static _instance: RedisManager;
    private _redisClient: RedisClientType | null = null;
    private redisConnectionString: string;

    private constructor() {
        this.redisConnectionString = process.env.REDIS_CONNECTION_STRING as string;

        if (!this.redisConnectionString) {
            throw new Error("REDIS_CONNECTION_STRING is not defined in environment variables.");
        }

        this._connect();
    }

    // Singleton instance getter
    public static get Instance(): RedisManager {
        if (!this._instance) {
            this._instance = new RedisManager();
        }
        return this._instance;
    }

    // Connect to Redis
    private async _connect() {
        if (!this._redisClient) {
            this._redisClient = createClient({
                url: this.redisConnectionString,
                socket: {
                    tls: true,
                }
            });

            this._redisClient.on("error", (err) => {
                logger.error("Redis Connection Error:", err.message);
            });

            try {
                await this._redisClient.connect();
                logger.info("Connected to Redis successfully!");
            } catch (err: any) {
                logger.error("Failed to connect to Redis:", err.message);
            }
        }
    }

    // Get Redis Client
    public async getClient(): Promise<RedisClientType> {
        if (!this._redisClient) {
            await this._connect();
        }
        return this._redisClient!;
    }

    // Example: Redis set operation
    public async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
        const client = await this.getClient();

        try {
            if (ttlInSeconds) {
                await client.set(key, value, { EX: ttlInSeconds });
            } else {
                await client.set(key, value);
            }
            logger.info(`Key "${key}" set successfully in Redis.`);
        } catch (err: any) {
            logger.error(`Failed to set key "${key}" in Redis:`, err.message);
            throw err;
        }
    }

    // Example: Redis get operation
    public async get(key: string): Promise<string | null> {
        const client = await this.getClient();

        try {
            const value = await client.get(key);
            logger.info(`Key "${key}" retrieved successfully from Redis.`);
            return value;
        } catch (err: any) {
            logger.error(`Failed to get key "${key}" from Redis:`, err.message);
            throw err;
        }
    }

    public async del(key: string): Promise<void> {
        const client = await this.getClient();

        try {
            await client.del(key);
            logger.info(`Key "${key}" deleted successfully from Redis.`);
        } catch (err: any) {
            logger.error(`Failed to delete key "${key}" from Redis:`, err.message);
            throw err;
        }
    }
}

export default RedisManager.Instance;
