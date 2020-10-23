const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
  },
  auth: {
    type: String,
  },
  authId: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
