import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Register from "./pages/Register";
import "./app.css";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";
import Messenger from "./pages/Messenger";
import Stories from "./components/Stories";
import StroriesMain from "./components/StroriesMain";
import axios from "axios";
function App() {
  const { userInfo } = useSelector((state) => state.userLogin);
  setInterval(myFunction, 1000 * 60 * 60 * 48);
  const myFunction = async () => {
    try {
      await axios.delete("/story/" + userInfo._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            {userInfo !== null ? <Home /> : <Login />}
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/messenger/:convoId">
            <Messenger />
          </Route>
          <Route path="/" exact>
            {userInfo !== null ? <Home /> : <Login />}
          </Route>
          <Route path="">
            <StroriesMain />
          </Route>
          <Route path="/register">{userInfo ? <Home /> : <Register />}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
