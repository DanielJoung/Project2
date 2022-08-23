const mongoose = require("mongoose")
const wineSchema = new mongoose.Schema({
    wineName: {type: String, required: true},
    color:{type:String, required:true},
    years: Number,
    img: {type:String, required: true},
    price: {type: Number, required:true},
    desc: {type:String, required: true}
})

const Wine = mongoose.model("Wine", wineSchema)

module.exports = Wine