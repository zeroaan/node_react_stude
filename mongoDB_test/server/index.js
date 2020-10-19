const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/key");

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connecting..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello world!"));

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    console.log(userInfo); // userInfo : 입력한 객체
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
    });
  });
});

const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
