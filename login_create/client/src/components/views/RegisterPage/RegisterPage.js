import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [myName, setMyName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "myName") {
      setMyName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "rePassword") {
      setRePassword(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email,
      myName,
      password,
    };

    // Axios.post("/api/users/register", body);

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmit}
        >
          <label>Email</label>
          <input name="email" type="email" value={email} onChange={onChange} />

          <label>Name</label>
          <input name="myName" type="text" value={myName} onChange={onChange} />

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />

          <label>Confirm Password</label>
          <input
            name="rePassword"
            type="password"
            value={rePassword}
            onChange={onChange}
          />

          <br />
          <button>회원가입</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
