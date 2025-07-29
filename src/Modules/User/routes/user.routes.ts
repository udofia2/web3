import {Router, Router as ExpressRouter} from "express";
import {RPCObserver} from "@core/brokers/RPC/rpc.observers";
import UserService from "@/Modules/User/services/user.service";
import {use} from "@core/global/middleware/use.middleware";
import {UserValidator} from "@/Modules/User/validator/user.validator";
import {validateSchema} from "@core/global/config/validation.config";
import {UserController} from "@/Modules/User/controller/user.controller"
import {Auth} from "@core/global/middleware/auth.guard";
import { throttle } from "@/core/global/middleware/throttle.middleware";


RPCObserver("user", UserService);

const router: Router = ExpressRouter();


router.route("/profile")
    .get([
        use(Auth.guard)
    ], use(UserController.getUserProfile))
    .put([
        use(Auth.guard), 
        validateSchema(UserValidator.updateProfileSchema)
    ], use(UserController.updateProfile))
    .patch([
        use(Auth.guard), 
        validateSchema(UserValidator.updateProfileSchema)
    ], use(UserController.updateProfile));

    
router.route("/change-password")
    .put([
        throttle(5, 15),
        use(Auth.guard),
        validateSchema(UserValidator.changePasswordSchema)
    ], use(UserController.changePassword));


router.route("/set-transaction-pin")
    .put([
        throttle(3, 15), 
        use(Auth.guard),
        validateSchema(UserValidator.setTransactionPinSchema)
    ], use(UserController.setTransactionPin));

    router.route("/request-pin-reset")
    .post([
        throttle(3, 15),
        use(Auth.guard),
        validateSchema(UserValidator.requestPinResetSchema)
    ], use(UserController.requestPinReset));

router.route("/verify-pin-reset-otp")
    .post([
        throttle(5, 15), 
        validateSchema(UserValidator.verifyPinResetOtpSchema)
    ], use(UserController.verifyPinResetOtp));

router.route("/reset-transaction-pin")
    .put([
        throttle(3, 15), 
        validateSchema(UserValidator.resetTransactionPinSchema)
    ], use(UserController.resetTransactionPin));

export default router;