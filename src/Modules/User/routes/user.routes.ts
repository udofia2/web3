import {Router, Router as ExpressRouter} from "express";
import {RPCObserver} from "@core/brokers/RPC/rpc.observers";
import UserService from "@/Modules/User/services/user.service";
import {use} from "@core/global/middleware/use.middleware";
import {UserValidator} from "@/Modules/User/validator/user.validator";
import {validateSchema} from "@core/global/config/validation.config";
import {UserController} from "@/Modules/User/controller/user.controller"
import {Auth} from "@core/global/middleware/auth.guard";


RPCObserver("user", UserService);

const router: Router = ExpressRouter();


router.route("/profile")
    .put([
        use(Auth.guard), 
        validateSchema(UserValidator.updateProfileSchema)
    ], use(UserController.updateProfile))
    .patch([
        use(Auth.guard), 
        validateSchema(UserValidator.updateProfileSchema)
    ], use(UserController.updateProfile));

export default router;