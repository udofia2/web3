import * as crypto from 'crypto';

export type AESEncryptionResponse = {
    iv: string,
    content: string
}

const key = process.env.ENCRYPTION_KEY as string;

export class AESCrypto {
    private static readonly ALGORITHM = 'aes-256-cbc';
    private static readonly IV_LENGTH = 16;

    private static prepareKey(key: string): Buffer {
        // Hash the key to ensure it's always the correct length
        const hash = crypto.createHash('sha256');
        hash.update(key);
        return hash.digest();
    }

    public static encrypt(data: string): string {
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const keyBuffer = this.prepareKey(key);
        const cipher = crypto.createCipheriv(this.ALGORITHM, keyBuffer, iv);

        let encrypted = cipher.update(data, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        // Encode IV in Base64 and concatenate with encrypted content
        return `${iv.toString('base64')}:${encrypted}`;
    }

    public static decrypt(encryptedData: string): string {
        const textParts = encryptedData.split(':');
        if (textParts.length !== 2) {
            throw new Error('Invalid encrypted data format');
        }

        const iv = Buffer.from(textParts[0], 'base64'); // Decode IV from Base64
        const encryptedText = textParts[1];
        const keyBuffer = this.prepareKey(key);
        const decipher = crypto.createDecipheriv(this.ALGORITHM, keyBuffer, iv);

        let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
}
