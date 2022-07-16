const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true,
    },
    palavra: {
        type: String,
        required: true,
    },
    resultado: {
        type: String,
        required: true,
    },
    sugestoes: {
        type: Number,
        required: true,
    },
    tempoConclusao: {
        type: String,
    },
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
