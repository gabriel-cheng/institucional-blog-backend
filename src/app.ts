import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./router/index.router";
import MongoConnect from "./database/connect.database";
import fs from "fs";
const directoryExists = fs.existsSync("./public/uploads");

MongoConnect();
const app = express();

if(!directoryExists) {
    fs.mkdirSync("./public/uploads");
}

app.use(express.json());

app.use("/posts", router);

export default app;
