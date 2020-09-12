import React, { Component } from "react";
import "./App.css";
import { Login } from "../Components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard } from "../Components";
import { AddMoney } from "../Components";
import { ThirdParty } from "../Components";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
          <Route path="/addMoney" render={(props) => <AddMoney {...props} />} />
          <Route path="/amazon" render={(props) => <ThirdParty {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
