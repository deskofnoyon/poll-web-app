require("dotenv").config();
const express = require("express");
const { notFoundHandler, errorHandler } = require("./error");
const app = express();

app.set('view engine', 'ejs');

app.use(require("./middlewares")); // middlewares
app.use(require("./routes")); // routes

app.use("/polls", require("../routes/routes"))

app.use(notFoundHandler) // not found handler
app.use(errorHandler) // global error handler

module.exports = app;
