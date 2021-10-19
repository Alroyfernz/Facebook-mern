import React, { useEffect, useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";

import { loginAction } from "../Redux/Actions/userActions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../Redux/Constaints/userCons";

function Login() {
  const history = useHistory("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { isFetching, error, userInfo } = userLogin;

  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // });

  const login = async (event) => {
    event.preventDefault();
    // dispatch(loginAction(email, password));
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      console.log(data);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/");
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_LOGIN_FAIL,
      });
    }
  };

  return (
    <div className="login">
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
        class="login__logo"
      />
      <div className="login__container">
        <h3>Log in to Facebook</h3>
        <form onSubmit={login}>
          <center>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address"
            />
          </center>
          <center>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </center>
          <center>
            <button type="submit" class="login__login">
              Log In
            </button>
          </center>
          <center>
            <div class="sideinfo">
              <h5>Forgotten Password?</h5>
              <h5 class="dot">·</h5>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <h5 class="rtd">Sign up for Facebook</h5>
              </Link>
            </div>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Login;
