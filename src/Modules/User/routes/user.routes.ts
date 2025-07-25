import {Router, Router as ExpressRouter} from "express";
import {RPCObserver} from "@core/brokers/RPC/rpc.observers";
import UserService from "@/Modules/User/services/user.service";
import {use} from "@core/global/middleware/use.middleware";
import {UserValidator} from "@/Modules/User/validator/user.validator";
import {validateSchema} from "@core/global/config/validation.config";
import {UserController} from "@/Modules/User/controller/user.controller"
import {Auth} from "@core/global/middleware/auth.guard";

//Setting up the RPC observer for the UserService
RPCObserver("user", UserService);

const router: Router = ExpressRouter();

// Protected routes (authentication required)
router.route("/profile")
    .put([
        use(Auth.guard), // Require authentication
        validateSchema(UserValidator.updateProfileSchema)
    ], use(UserController.updateProfile))
    .patch([
        use(Auth.guard), // Require authentication  
        validateSchema(UserValidator.updateProfileSchema)
    ], use(UserController.updateProfile));

export default router;