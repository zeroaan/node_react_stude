import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/post_action";

const Home = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const user = useSelector((state) => state.user.userData);

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
    e.preventDefault();
    const body = {
      title: title,
      desc: desc,
      name: user.name,
      id: user._id,
    };
    dispatch(actions.addPost(body)).then((response) => {
      if (response.payload.postSuccess) {
        alert("글쓰기 성공");
        props.history.push("/");
      } else {
        alert("글쓰기 실패");
      }
    });
  };
  const onchangeInput = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "desc") {
      setDesc(value);
    }
  };

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
        />

        <label htmlFor="desc">내용</label>
        <input type="text" name="desc" value={desc} onChange={onchangeInput} />
        <input type="submit" value="쓰기" />
      </form>
    </>
  );
};

export default Home;
