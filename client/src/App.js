import React from "react";
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome/Welcome";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

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

        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
