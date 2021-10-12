import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./app.css";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";
import Messenger from "./pages/Messenger";
function App() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">{userInfo ? <Home /> : <Login />}</Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/messenger/:convoId">
            <Messenger />
          </Route>
          <Route path="/" exact>
            {userInfo !== null ? <Home /> : <Login />}
          </Route>
          <Route path="/register">{userInfo ? <Home /> : <Register />}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
