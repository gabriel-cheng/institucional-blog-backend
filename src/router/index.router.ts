import express from "express";
import cors from "cors";
import controller from "../controller/index.controller";
import upload from "../config/multer.config";
import path from "path";
const router = express.Router();

router.use(cors());

router.use("/files", express.static(path.resolve(__dirname, "../../" + "public/uploads")));
router.delete("/delete/:id", controller.deleteExistingPost);
router.patch("/update/:id", controller.updateExistingPost);
router.post("/register", upload.single("file"), controller.registerNewPost);
router.get("/:id", controller.findPostBtId);
router.get("/", controller.findAllPosts);

export default router;
