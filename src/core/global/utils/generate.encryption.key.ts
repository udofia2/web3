// import { PrismaClient } from '@prisma/client';
// import crypto from 'crypto';
import bcrypt from 'bcrypt';

// const _generateKey = (length: number): string => {
//     const key = crypto.randomBytes(length);
//     return key.toString('base64');
// }

// export const generateEncryptionKey = async (length: number, prisma: PrismaClient): Promise<string> => {
//     const key = _generateKey(length);
//     const keyAlreadyExist = await prisma.aPIKey.findFirst({
//         where: { encryptionKey: key },
//         select: { encryptionKey: true }
//     });
//     if (keyAlreadyExist) {
//         return generateEncryptionKey(length, prisma)
//     }
//     console.log("Generated key: ", key)

//     return key;
// }

export const encryptPassword = async (password: string) => {
    const encrypted = await bcrypt.hash(password, 10);
    return encrypted;
}

export const comparePassword = async (password: string, hash: string) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}