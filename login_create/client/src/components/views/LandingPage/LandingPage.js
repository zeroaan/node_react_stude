import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    axios.get("/api/users/auth").then((response) => {
      setLoginState(response.data.isAuth);
    });
  }, []);

  const onClick = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃을 하지 못했습니다.");
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
        <h2>시작 페이지</h2>

        {loginState ? (
          <>
            <button onClick={onClick}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>로그인</button>
            </Link>
            <Link to="/register">
              <button>회원가입</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default LandingPage;
