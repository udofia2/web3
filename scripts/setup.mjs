/* eslint-disable no-undef */
/* eslint-env node */

import { join } from 'path';
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

class Setup {
    constructor(options = {}) {
        const {
            basePath = './src/core/.certs',
            privateKeyName = 'private-key.pem',
            publicKeyName = 'public-key.pem',
            keySize = 1024,
        } = options;

        this.basePath = basePath;
        this.privateKeyPath = join(this.basePath, privateKeyName);
        this.publicKeyPath = join(this.basePath, publicKeyName);
        this.keySize = keySize;

        this._createDirectory(this.basePath);
    }

    generateKeys() {
        try {
            console.log(`[Setup] Starting key generation in "${this.basePath}"...`);

            // Generate private key
            if (!existsSync(this.privateKeyPath)) {
                console.log(`[Setup] Generating private key (${this.keySize}-bit)...`);
                execSync(`openssl genrsa -out ${this.privateKeyPath} ${this.keySize}`, { stdio: 'inherit' });
                console.log(`[Setup] Private key created at: ${this.privateKeyPath}`);
            } else {
                console.log(`[Setup] Private key already exists at: ${this.privateKeyPath} (skipping)`);
            }

            // Generate public key
            if (!existsSync(this.publicKeyPath)) {
                console.log(`[Setup] Generating public key...`);
                execSync(`openssl rsa -in ${this.privateKeyPath} -out ${this.publicKeyPath} -outform PEM -pubout`, { stdio: 'inherit' });
                console.log(`[Setup] Public key created at: ${this.publicKeyPath}`);
            } else {
                console.log(`[Setup] Public key already exists at: ${this.publicKeyPath} (skipping)`);
            }

            console.log('[Setup] Key generation complete.');
        } catch (error) {
            console.error(`[Setup] Error during key generation: ${error.message}`);
            if (process.env.DEBUG === 'true') {
                console.error(error.stack);
            }
            process.exit(1);
        }
    }

    _createDirectory(dirPath) {
        if (!existsSync(dirPath)) {
            mkdirSync(dirPath, { recursive: true });
            console.log(`[Setup] Created directory: ${dirPath}`);
        }
    }
}



const args = process.argv.slice(2);

if (args.length === 2 && args[0] === 'make:certs') {
    const generator = new Setup({
        basePath: args[1],
        keySize: 2048, 
    });
    generator.generateKeys(args[1]);
} else {
    console.log('Usage: node src/Core/cli/setup.mjs make:certs path/to/cert');
}