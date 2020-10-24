import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/post_action";

const Home = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState([]);
  const [readLoad, setReadLoad] = useState(false);

  const user = useSelector((state) => state.user.userData);
  const post = useSelector((state) => state.post);

  const onClickLogout = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };
  const onSubmitForm = (e) => {
    setReadLoad(!readLoad);
    e.preventDefault();
    if (title === "" || desc === "") {
      return alert("제목, 내용을 입력하세요.");
    }
    const body = {
      title: title,
      desc: desc,
      auth: user.name,
      authId: user._id,
      date: new Date(),
    };
    dispatch(actions.addPost(body)).then((response) => {
      if (response.payload.postSuccess) {
        alert("글쓰기 성공");
        props.history.push("/");
      } else {
        alert("글쓰기 실패");
      }
    });
    setTitle("");
    setDesc("");
  };
  const onchangeInput = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "desc") {
      setDesc(value);
    }
  };

  useEffect(() => {
    dispatch(actions.readPost()).then((response) => {
      if (user === undefined) {
        setReadLoad(!readLoad);
        return null;
      }
      let board = [];
      let i = 0;
      while (i < response.payload.posts.length) {
        if (user._id === response.payload.posts[i].authId) {
          board = [response.payload.posts[i], ...board];
        }
        i = i + 1;
      }
      setPosts(board);
    });
    return () => setReadLoad(!readLoad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readLoad]);

  return (
    <>
      <button onClick={onClickLogout}>로그아웃</button>
      <br />
      <form onSubmit={onSubmitForm}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onchangeInput}
          autoFocus
        />

        <label htmlFor="desc">내용</label>
        <input type="text" name="desc" value={desc} onChange={onchangeInput} />
        <input type="submit" value="쓰기" />
      </form>

      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <h4>{post.desc}</h4>
          <h5>{post.auth}</h5>
          <p>{post.date}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Home;
