import React, { useState } from "react";
import "./Login.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function Login() {
  const history = useHistory("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
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
