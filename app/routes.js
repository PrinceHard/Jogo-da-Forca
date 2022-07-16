const { response } = require("express");
const express = require("express");
const gameModel = require("./model");
const app = express();

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/views/index.html");
});

app.post("/add_game", async (req, res) => {
    console.log(req.body);
    const game = new gameModel(req.body);

    try {
        await game.save();
        res.send(game);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/games", async (req, res) => {
    const games = await gameModel.find({});

    try {
        res.send(games);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;
