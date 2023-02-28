import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import router from "./router/index.router";
import MongoConnect from "./database/connect.database";
import path from "path";

MongoConnect();

app.use("/posts/files", express.static(path.resolve(__dirname, "../" + "public/uploads")));

app.use(express.json());

app.use("/posts", router);

export default app;
