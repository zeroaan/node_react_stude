import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    };

    // Axios.post("/api/users/login", body);

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Failed login");
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

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />

          <br />
          <button>로그인</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
