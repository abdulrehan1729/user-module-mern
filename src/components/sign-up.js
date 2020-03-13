import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import PropTypes from "prop-types";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirmPassword: "",
      firsName: "",
      lastName: "",
      token: null,
      email: "",
      phoneNumber: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { token }
      }
    } = this.props;
    this.setState({ token: token });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.firsName);
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords did not match");
    } else {
      //request to server to add a new username/password
      axios
        .post("/user/register", {
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          token: this.state.token
        })
        .then(response => {
          if (!response.data.error) {
            console.log("successful signup");
            this.setState({
              //redirect to login page
              redirectTo: "/login",
              token: null
            });
          } else {
            console.log(response);
            alert("phone number already taken");
          }
        })
        .catch(error => {
          let errors = error.response.data.errors;
          alert(errors);
        });
    }
  }
  handleEmailSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    try {
      axios
        .post("user/verify-email", {
          email: this.state.email
        })
        .then(resp => {
          if (resp.data.msg) {
            console.log(resp.data.msg);
            alert(resp.data.msg);
          } else {
            alert(resp.data.error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else if (this.state.token) {
      return (
        <div className="SignupForm">
          <h4>Sign up</h4>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input
                  className="form-input"
                  type="text"
                  id="firstName"
                  name="firstName"
                  required="required"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input
                  className="form-input"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
            </div>

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
                  required="required"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input
                  className="form-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  required="required"
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-7"></div>
              <button
                className="btn btn-primary col-1 col-mr-auto"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="SignupForm">
          <form className="form-horizontal" onSubmit={this.handleEmailSubmit}>
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input
                  className="form-input"
                  type="email"
                  id="email"
                  name="email"
                  required="required"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-7"></div>
              <button
                className="btn btn-primary col-1 col-mr-auto"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

Signup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  })
};
export default Signup;
