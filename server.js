const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener");

PORT = 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({
    fullUrl: req.body.fullUrl,
  });
  //redirect user to home page
  res.redirect("/");
});
//when shorturl is clicked
app.get("/:shortUrl", async (req, res) => {
const shortUrl=await ShortUrl.findOne({
    shortUrl:req.params.shortUrl
})
//if short url not found
if(shortUrl==null){
    return res.sendStatus(404);
}
//if short url is found then update clicks
shortUrl.clicks++
shortUrl.save();
res.redirect(shortUrl.fullUrl)
})


app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
