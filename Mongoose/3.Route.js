import express from "express";
import Cors from "cors";
import apirouter from "./3.1.extendedRoute.js";

var app = express();
app.use(Cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
    res.send("Welcome to the home page");
});

//you can also extend the functionality of the router by adding middleware functions to it
app.use('/api', apirouter);


export default app;