import React from "react";
import { Switch, Route } from 'react-router-dom';
import Welcome from "./components/Welcome/Welcome";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
