import React, { useState } from "react";
import "./Register.css";

const Register = () => {
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
      return alert("비밀번호를 다시 확인해주세요.");
    }
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
