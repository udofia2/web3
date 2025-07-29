/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from 'crypto';
import RedisManager from '@/core/db/redis';
import {AESCrypto} from './eas.standard'


class TokenHelper {
    
    public async generateToken(data: {type: string, email?: string, phone?: string, userid?: string, metadata?: any } = {type: "authorization_code"}){
        // generate a 6 digit otp token 
        const otp = Math.floor(100000 + Math.random() * 900000);
        const session = randomUUID().toString();
        
        const enccryptedToken = AESCrypto.encrypt(otp.toString());

                // Set TTL based on token type
        const ttl = data.type === 'pin_reset' ? 600 : undefined; // 10 minutes for PIN reset

        await RedisManager.set(session, JSON.stringify({
            token: enccryptedToken,
            ...data
        }), ttl)

        return {
            token: otp,
            sessionid: session
        }
    }

    public async verifyToken(session: string, token: string){
        const data = await RedisManager.get(session);
        if(!data) return false;
        const payload = JSON.parse(data);
        const decryptedToken = AESCrypto.decrypt(payload.token);
        if(decryptedToken !== token) return false;

        if(payload.isValidated) return false;

        await RedisManager.set(session, JSON.stringify({
            ...payload,
            isValidated: true,
        }))

        return payload;
    }

    public async getTokenData(session: string){
        const data = await RedisManager.get(session);
        if(!data) return false;
        const payload = JSON.parse(data);
        // await RedisManager.del(session);
        return payload;
    }

}

export default new TokenHelper