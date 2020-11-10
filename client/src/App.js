import React from "react";
import { Switch, Route } from 'react-router-dom';
import Welcome from "./components/Welcome";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";
import "./styles/App.scss";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
