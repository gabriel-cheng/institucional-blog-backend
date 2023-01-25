import { Router } from "express";
import controller from "../controller/index.controller";

const router = Router();

router.delete("/delete/:id", controller.deleteExistingPost);
router.patch("/update/:id", controller.updateExistingPost);
router.post("/register", controller.registerNewPost);
router.get("/:id", controller.findPostBtId);
router.get("/", controller.findAllPosts);

export default router;
