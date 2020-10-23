import * as types from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case types.ADD_POST:
      return { ...state, postSuccess: action.payload };
    case types.READ_POST:
      return { ...state, posts: action.payload };

    default:
      return state;
  }
}
