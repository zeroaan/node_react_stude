const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const { Post } = require("./models/Post");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post("/api/users/login", (req, res) => {
  // 요청한 데이터가 DB에 있는지 확인
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    // 해당 email에 맞는 user가 없는 경우
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "해당 이메일은 등록되지 않았습니다.",
      });
    }

    // 해당 email이 DB에 있다면 비밀번호 확인
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      // 비밀번호까지 맞다면 토큰을 생성
      userInfo.generateToken((err, userInfo) => {
        if (err) {
          return res.status(400).send(err);
        }

        // 토큰을 저장한다.
        res
          .cookie("userInfo", userInfo.token)
          .status(200)
          .json({ loginSuccess: true, userID: userInfo._id, userInfo });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // 여기 까지 미들웨어를 해왔다는 얘기는 Authentication 이 True라는 말
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAuth: true,
    isAdmin: req.user.role === 0 ? false : true,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    (err, userInfo) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.status(200).send({
        success: true,
      });
    }
  );
});

app.post("/api/posts/post", (req, res) => {
  const post = new Post(req.body);
  post.save((err, postInfo) => {
    if (err) {
      return res.json({ postSuccess: false, err });
    }
    return res.status(200).json({
      postSuccess: true,
    });
  });
});
app.get("/api/posts", (req, res) => {
  Post.find(function (err, posts) {
    if (err) {
      return res.json({ postReadSuccess: false, err });
    }
    return res.status(200).json({
      postReadSuccess: true,
      posts,
    });
  });
});

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
