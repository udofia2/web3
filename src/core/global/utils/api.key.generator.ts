// import crypto from 'crypto';
// import {PrismaClient} from "@prisma/client";

// export class APIKeyGenerator {

//     private static readonly DEFAULT_LENGTH = 46;
//     private static readonly ALLOWED_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     static async generateUniqueAPIKey(prefix: string, length: number, prisma: PrismaClient, isTestKey: boolean = false): Promise<string> {

//         if (length < APIKeyGenerator.DEFAULT_LENGTH) {
//             throw new Error('API key length must be at least 16 characters');
//         }

//         const generateRandomPart = (remainingLength: number): string => {
//             const randomBytes = crypto.randomBytes(remainingLength);
//             let result = '';

//             for (let i = 0; i < remainingLength; i++) {
//                 result += APIKeyGenerator.ALLOWED_CHARACTERS[randomBytes[i] % APIKeyGenerator.ALLOWED_CHARACTERS.length];
//             }

//             const totalLength = prefix.length + 1 + result.length;
//             if (totalLength < length) {
//                 return result + generateRandomPart(length - totalLength);
//             }

//             return result;
//         };

//         const generateAndCheckKey = async (): Promise<string> => {
//             const randomPart = generateRandomPart(length - prefix.length - 1);
//             const apiKey = `${prefix}_${randomPart}`;

//             let existingKey: unknown;
//             if (isTestKey) {
//                 existingKey = await prisma.aPIKey.findFirst({
//                     where: { testApiKey: apiKey },
//                     select: { testApiKey: true }
//                 });
//             }
//             else {
//                 existingKey = await prisma.aPIKey.findFirst({
//                     where: { liveApiKey: apiKey },
//                     select: { liveApiKey: true }
//                 });
//             }

//             if (existingKey) {
//                 return generateAndCheckKey();
//             }

//             return apiKey;
//         };

//         return generateAndCheckKey();
//     }
// }
