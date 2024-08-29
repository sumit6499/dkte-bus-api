const mongoose = require("mongoose");

const bus = new mongoose.Schema({
    _id: {
        type: String
    },
    source: {
        type: String
    },
    destination: {
        type: String
    },
    stops: {
        type: Array
    },
    ticketPrices: {
        type: Array
    }
});

module.exports = mongoose.model("Bus", bus);