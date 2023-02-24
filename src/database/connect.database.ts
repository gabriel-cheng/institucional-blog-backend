/* eslint-disable indent */
import mongoose from "mongoose";
import express from "express";
const app = express();
const port = process.env.PORT || 27017;

mongoose.set("strictQuery", true);

function MongoConnect() {
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n087j7g.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`Database is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log({database_connect_error: err});
    });
}

export default MongoConnect;
