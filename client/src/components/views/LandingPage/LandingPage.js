import React, { useEffect } from "react";
import axios from "axios";

const LandingPage = (props) => {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
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
        <button onClick={onClick}>로그아웃</button>
      </div>
    </>
  );
};

export default LandingPage;
