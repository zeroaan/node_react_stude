import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/user_action";
import "./Register.css";

const Register = (props) => {
  const dispatch = useDispatch();

  const [myName, setMyName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [myRePassword, setMyRePassword] = useState("");

  const onChangeInput = (e) => {
    const { value, name } = e.target;
    if (name === "myName") {
      setMyName(value);
    } else if (name === "myEmail") {
      setMyEmail(value);
    } else if (name === "myPassword") {
      setMyPassword(value);
    } else if (name === "myRePassword") {
      setMyRePassword(value);
    }
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (myPassword !== myRePassword) {
      setMyPassword("");
      setMyRePassword("");
      return alert("비밀번호를 다시 확인해주세요.");
    }
    const body = {
      name: myName,
      email: myEmail,
      password: myPassword,
    };
    dispatch(actions.registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("회원가입 실패");
      }
    });
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="myName">이름</label>
        <input
          type="text"
          name="myName"
          value={myName}
          onChange={onChangeInput}
          required
        />

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

        <label htmlFor="rePassword">비밀번호 확인</label>
        <input
          type="password"
          name="myRePassword"
          value={myRePassword}
          onChange={onChangeInput}
          required
        />

        <input type="submit" value="회원가입" />
      </form>
    </>
  );
};

export default Register;
