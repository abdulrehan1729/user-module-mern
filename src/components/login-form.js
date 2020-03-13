import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: "",
      password: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");

    axios
      .post("/user/login", {
        phoneNumber: this.state.phoneNumber,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            user: response.data
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: "/"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <h4>Please Login</h4>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label" htmlFor="phoneNumber">
                  Phone Number
                </label>
              </div>
              <div className="col-3 col-mr-auto">
                <PhoneInput
                  inputClass="form-input"
                  placeholder="Phone Number"
                  country={"in"}
                  inputProps={{
                    type: "tel",
                    id: "phoneNumber",
                    name: "phoneNumber",
                    renderStringAsFlag: "india",
                    required: "required"
                  }}
                  value={this.state.phoneNumber}
                  onChange={phoneNumber => this.setState({ phoneNumber })}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label" htmlFor="password">
                  Password:{" "}
                </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input
                  className="form-input"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-7"></div>
              <button
                className="btn btn-primary col-1 col-mr-auto"
                onClick={this.handleSubmit}
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default LoginForm;
