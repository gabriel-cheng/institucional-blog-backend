import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
const app = express();
import router from "./router/index.router";
import user from "./router/user.router";
import MongoConnect from "./database/connect.database";
import path from "path";

app.use(cors());

MongoConnect();

app.use("/posts/files", express.static(path.resolve(__dirname, "../" + "public/uploads")));

app.use(express.json());

app.use("/posts", router);
app.use("/auth/user", user);

export default app;
