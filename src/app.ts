import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./router/index.router";
import MongoConnect from "./database/connect.database";

MongoConnect();
const app = express();

app.use(express.json());

app.use("/posts", router);

export default app;
