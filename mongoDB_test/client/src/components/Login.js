import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/user_action";

const Login = (props) => {
  const dispatch = useDispatch();

  const [myEmail, setMyEmail] = useState("");
  const [myPassword, setMyPassword] = useState("");

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    if (name === "myEmail") {
      setMyEmail(value);
    } else if (name === "myPassword") {
      setMyPassword(value);
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const body = {
      email: myEmail,
      password: myPassword,
    };
    dispatch(actions.loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("로그인 실패");
      }
    });
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="myEmail"
          value={myEmail}
          onChange={onChangeInput}
          required
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="myPassword"
          value={myPassword}
          onChange={onChangeInput}
          required
        />

        <input type="submit" value="로그인" />
      </form>
    </>
  );
};

export default Login;
