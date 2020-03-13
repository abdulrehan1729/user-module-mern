import React, { Component } from "react";
import { Route } from "react-router-dom";
// components
import LoginForm from "./components/login-form";
import Navbar from "./components/navbar";
import Home from "./components/home";
import UpdateForm from "./components/update-user";

import Routes from "./Routes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    };

    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn && (
          <div>
            <h2>Welcome {this.state.user.first_name}</h2>
            <div>
              <strong>First Name: </strong> {this.state.user.first_name}
            </div>
            <div>
              <strong>Last Name: </strong> {this.state.user.last_name}
            </div>
            <div>
              <strong>Email: </strong> {this.state.user.email}
            </div>
            <div>
              <strong>Phone: </strong> {this.state.user.phone_number}
            </div>
          </div>
        )}
        {/* Routes to different components */}
        <Route
          exact
          path="/"
          render={() => <Home loggedIn={this.state.loggedIn} />}
        />
        <Route
          path="/login"
          render={() => <LoginForm updateUser={this.updateUser} />}
        />
        <Route
          path="/update-user"
          render={() => (
            <UpdateForm
              updateUser={this.updateUser}
              loggedIn={this.state.loggedIn}
            />
          )}
        />
        <Routes />
      </div>
    );
  }
}

export default App;
