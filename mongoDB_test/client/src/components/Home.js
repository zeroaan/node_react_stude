import React from "react";
import axios from "axios";

const Home = (props) => {
  const onClickLogout = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <>
      <button onClick={onClickLogout}>로그아웃</button>
    </>
  );
};

export default Home;
