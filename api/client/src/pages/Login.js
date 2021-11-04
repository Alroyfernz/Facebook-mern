import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  const login = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      window.alert("input fields cannot be empty");
      return;
    }
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
        sessionStorage.setItem("userInfo", JSON.stringify(res.data));
        history.push("/");
      } else {
        window.alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      window.alert("login error");
      history.push("/login");
      dispatch({
        type: USER_LOGIN_FAIL,
      });
    }
  };

  return (
    <div className="login">
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
        className="login__logo"
        alt="login"
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
            <button type="submit" className="login__login">
              Log In
            </button>
          </center>
          <center>
            <div className="sideinfo">
              <h5>Forgotten Password?</h5>
              <h5 className="dot">·</h5>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <h5 className="rtd">Sign up for Facebook</h5>
              </Link>
            </div>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Login;
