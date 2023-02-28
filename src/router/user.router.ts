import express from "express";
const router = express.Router();
import userController from "../controller/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

router.delete("/delete/:id", authMiddleware.checkAuthentication, userController.deleteUser);
router.post("/register", authMiddleware.checkAuthentication, userController.registerNewUser);
router.post("/login", userController.login);
router.get("/find/:id", authMiddleware.checkAuthentication, userController.findUserById);
router.get("/", authMiddleware.checkAuthentication, userController.getAllUsers);

export default router;
