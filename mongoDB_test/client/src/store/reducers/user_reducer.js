import * as types from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case types.REGISTER_USER:
      return { ...state, register: action.payload };
    case types.LOGIN_USER:
      return { ...state, register: action.payload };

    default:
      return state;
  }
}
