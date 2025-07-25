import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export class SwaggerDocs {
    private static apiVersion: string = "v1";
    private static apiPrefix: string = `/${SwaggerDocs.apiVersion}`;
    private static apiUrl: string = `http://localhost:3000/`;
    public static init(app: Application): void {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Qullect API Documentation",
                    version: "v1",
                },
                servers: [
                    {
                        url: `${SwaggerDocs.apiUrl}${SwaggerDocs.apiPrefix}`,
                    },
                ],
            },
            apis: ["./src/Modules/**/*.routes.ts"], // Path to the API docs
        };

        const swaggerSpec = swaggerJSDoc(options);
        console.info(swaggerSpec);
        app.use(`${SwaggerDocs.apiPrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}