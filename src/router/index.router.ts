import express from "express";
import controller from "../controller/index.controller";
import upload from "../config/multer.config";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.delete("/delete/:id", authMiddleware.checkAuthentication, controller.deleteExistingPost);
router.patch("/update/:id", authMiddleware.checkAuthentication, upload.single("file"), controller.updateExistingPost);
router.post("/register", authMiddleware.checkAuthentication, upload.single("file"), controller.registerNewPost);
router.get("/:id", authMiddleware.checkAuthentication, controller.findPostBtId);
router.get("/", controller.findAllPosts);

export default router;
