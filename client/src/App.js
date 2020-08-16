import React, { Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Auth/SignIn";
import Register from "./components/Auth/Register";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
