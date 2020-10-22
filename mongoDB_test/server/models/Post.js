const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
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
