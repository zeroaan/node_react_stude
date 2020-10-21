import axios from "axios";
import * as types from "./types";

export function registerUser(body) {
  const request = axios
    .post("/api/users/register", body)
    .then((response) => response.data);

  return {
    type: types.REGISTER_USER,
    payload: request,
  };
}
export function loginUser(body) {
  const request = axios
    .post("/api/users/login", body)
    .then((response) => response.data);

  return {
    type: types.LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: types.AUTH_USER,
    payload: request,
  };
}
