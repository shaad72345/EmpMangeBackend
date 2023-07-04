const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://shaad72345:shaad123@cluster0.rts1zvp.mongodb.net/?retryWrites=true&w=majority");

module.exports ={connection};