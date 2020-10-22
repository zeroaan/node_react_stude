import axios from "axios";
import * as types from "./types";

export function addPost(body) {
  const request = axios
    .post("/api/posts/post", body)
    .then((response) => response.data);
  return {
    type: types.ADD_POST,
    payload: request,
  };
}
