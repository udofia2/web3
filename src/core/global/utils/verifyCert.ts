import crypto from 'crypto';
const encryptKey = process.env.ENCRYPTION_KEY as string
console.log("ENCRYPTION_KEY", encryptKey)

export const  generateKey = (): string => {
    return crypto.randomBytes(32).toString('hex');
}

// Encryption function
export function encrypt(data: string) {
    const iv = crypto.randomBytes(16); // Generate a random initialization vector
    const cipher = crypto.createCipheriv('aes-256-ocb', Buffer.from(encryptKey, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Return IV and encrypted text
}

// Decryption function
export function decrypt(encryptedData: string) {
    const textParts = encryptedData.split(':');
    const iv = Buffer.from(textParts[0], 'hex'); // Extract IV
    const encryptedText = textParts[1]
    const decipher = crypto.createDecipheriv('aes-256-ocb', Buffer.from(encryptKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

/**
 * Generate a HMAC hash for the given payload using the webhook hashing key.
 * @param payload The data to be hashed.
 * @param webhookHashingKey The key used for hashing.
 * @returns {string} The HMAC hash of the payload.
*/

// export const generateWebhookHash = (payload: string, webhookHashingKey: string): string => {
//         const hmac = createHmac('sha256', Buffer.from(webhookHashingKey, 'hex'));
//         hmac.update(payload);
//         return hmac.digest('hex');
// }import crypto from 'crypto';


/**
 * Verifies if a given public key is valid and in the correct PEM format.
 * @param publicKeyPem The public key in PEM format.
 * @returns {boolean} True if the public key is valid, false otherwise.
 */
export const verifyCertificate = (publicKeyPem?: string): boolean => {
    if (!publicKeyPem) return false;

    const PEM_START = '-----BEGIN PUBLIC KEY-----';
    const PEM_END = '-----END PUBLIC KEY-----';

    try {
        if (!publicKeyPem.startsWith(PEM_START) || !publicKeyPem.endsWith(PEM_END)) {
            return false;
        }

        const publicKey = crypto.createPublicKey({
            key: publicKeyPem,
            format: 'pem',
            type: 'spki'
        });

        return publicKey.type === 'public';
    } catch (error) {
        console.error('Invalid public key:', (error as Error).message);
        return false;
    }
};
