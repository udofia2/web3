const fs = require('fs');
const path = require('path');

// List of boilerplate files and their respective content
const _files = {
    "entity": "// Entity class boilerplate\nexport class Entity {}",
    "service": "// Service class boilerplate\nexport class Service {}",
    "repository": "// Repository class boilerplate\nexport class Repository {}",
    "facade": "// Facade class boilerplate\nexport class Facade {}",
    "validation": "// Validation boilerplate\nexport const validate = () => {};",
    "routes": "// Routes boilerplate\nexport const routes= [];",
    "resource": "// Resource boilerplate\nexport const resource = {};",
    "middlewares": "// Middleware boilerplate\nexport const middleware = (req, res, next) => { next(); };",
    "controller": "// Controller boilerplate\nexport class Controller {}",
};

class ModuleGenerator {

    constructor(basePath = './src/Modules') {
        this.basePath = basePath;
    }

    generate(moduleName) {
        if (!moduleName) {
            console.error('Error: Module name is required.');
            console.log('Usage: node src/Core/cli/invokable.cjs make:module <module-name>');
            return;
        }

        const capitalizedModuleName = this._capitalize(moduleName);
        const modulePath = path.join(this.basePath, capitalizedModuleName);

        try {
            this._createDirectory(modulePath);
            Object.entries(_files).forEach(([fileType, content]) => {
                this._createFile(modulePath, `${moduleName}.${fileType}.ts`, content);
            });
            console.log(`Module '${capitalizedModuleName}' has been created successfully.`);
        } catch (err) {
            console.error(`Error: Failed to generate module '${moduleName}'.`, err.message);
        }
    }

    _createDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    _createFile(dirPath, fileName, content) {
        const filePath = path.join(dirPath, fileName);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        } else {
            console.warn(`Warning: File '${fileName}' already exists. Skipping.`);
        }
    }

    _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// CLI Command Handler
const generator = new ModuleGenerator();
const args = process.argv.slice(2);

if (args.length === 2 && args[0] === 'make:module') {
    generator.generate(args[1]);
} else {
    console.log('Usage: node src/Core/cli/invokable.cjs make:module <module-name>');
}