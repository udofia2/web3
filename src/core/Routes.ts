import { Application } from "express";
import {use} from "./global/middleware/use.middleware";
import {Auth} from "./global/middleware/auth.guard";
import AuthRoutes from "../Modules/Auth/routes/auth.routes"

export class SetupRoutes {
    private static apiVersion: string = "v1";
    private static apiPrefix: string = `/${SetupRoutes.apiVersion}`;

    constructor() {}

    public static init(app: Application): void {
        try {
            app.use(`${SetupRoutes.apiPrefix}/auth`, AuthRoutes)
            // app.use(`${SetupRoutes.apiPrefix}/explorer`, ExplorerRoutes)
            // app.use(`${SetupRoutes.apiPrefix}/webhook`, WebhookRoutes)

            app.use(use(Auth.guard))
            // app.use(`${SetupRoutes.apiPrefix}/security`, SecurityRoutes)
            // app.use(`${SetupRoutes.apiPrefix}/organization`, OrgRoutes)
        }catch (error) {
            console.error("Error setting up routes:", error);
        }

    }
    
}