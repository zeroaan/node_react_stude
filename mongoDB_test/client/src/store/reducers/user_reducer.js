import * as types from "../actions/types";

const initialState = {
  userData: {
    _id: null,
    name: null,
    email: null,
    isAuth: null,
    isAdmin: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_USER:
      return { ...state, register: action.payload };
    case types.LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case types.AUTH_USER:
      return { ...state, userData: action.payload };

    default:
      return state;
  }
}
