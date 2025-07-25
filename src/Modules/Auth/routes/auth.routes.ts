import {Router, Router as ExpressRouter} from "express";
import {RPCObserver} from "@core/brokers/RPC/rpc.observers";
import AuthService from "@/Modules/Auth/services/auth.service";
import {use} from "@core/global/middleware/use.middleware";
import {AuthValidator} from "@/Modules/Auth/validator/auth.validator";
import {validateSchema} from "@core/global/config/validation.config";
import {AuthController} from "@/Modules/Auth/controller/auth.controller";
import { throttle } from "@/core/global/middleware/throttle.middleware";
import { Auth } from "@/core/global/middleware/auth.guard";

//Setting up the RPC observer for the AuthService
RPCObserver("auth", AuthService);

const router: Router = ExpressRouter();

// Define your routes here
router.route("/login")
    .post([validateSchema(AuthValidator.loginSchema)], use(AuthController.login));


router.route("/change-password")
    .put([
        throttle(5, 15),
        use(Auth.guard),
        validateSchema(AuthValidator.changePasswordSchema)
    ], use(AuthController.changePassword));


export default router;