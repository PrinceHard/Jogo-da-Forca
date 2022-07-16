// importação de módulo express
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

mongoose.connect("mongodb://localhost:27017/forca", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection erro: "));
db.once("open", () => {
    console.log("Connected successfully");
});

// criação de aplicação express
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(Router);

app.listen(3000, () => {
    console.log("Servidor iniciado...");
});
