import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Auth from "./hoc/auth";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(Home, true)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route path="/">
            <div>Not found...</div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
