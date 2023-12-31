const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  //full url
  fullUrl: {
    type: String,
    required: true,
  },
  //short url
  shortUrl: {
    type: String,
    required: true,
    default: shortId.generate(),
  },
  clicks: {
    type: Number,
    required:true,
    default:0
  },
});
module.exports=mongoose.model("shortUrl",shortUrlSchema )