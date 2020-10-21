import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  /* option
  null => 아무나 출입가능
  true => 로그인한 유저만 출입 가능
  false => 로그인한 유저는 출입 불가능 */

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(actions.auth()).then((response) => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SpecificComponent {...props} />;
  }
  return AuthenticationCheck;
}
