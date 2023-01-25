/* eslint-disable indent */
import { connect } from "mongoose";
import express from "express";
const app = express();
const port = process.env.PORT || 27017;

function MongoConnect() {
    connect(
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
