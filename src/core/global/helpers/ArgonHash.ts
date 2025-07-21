import * as argon2 from "argon2";

const HASH_OPTIONS: argon2.Options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 2,
};

export class Argon2Hash {

    public static async hashPassword(password: string): Promise<string> {
        return argon2.hash(password, HASH_OPTIONS);
    }

    public static async verifyPassword(hash: string, password: string): Promise<boolean> {
        return argon2.verify(hash, password);
    }


}