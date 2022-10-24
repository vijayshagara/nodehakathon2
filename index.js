const express = require("express");
const productRouter = require("./Router/productsRouters");
const mongo = require("./connect");
const dotenv = require("dotenv");
const registerRouter = require("./Router/registerRouter");
const cors = require("cors");
//const authMiddleWar = require("./Modules/authModules");

//Dotenv Connection
dotenv.config();

//MongoDB connection
mongo.connect();
const app = express();
app.use(cors());
//Inbuild middleWare
app.use(express.json());

//URL/Register----
app.use("/register", registerRouter);

//Authorisation MiddleWar
//app.use("/", authMiddleWar.authenticaterUser);

//URL/products----
app.use("/products", productRouter);

//port Connection
app.listen(process.env.PORT);
