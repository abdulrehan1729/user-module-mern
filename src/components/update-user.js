import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class UpdateUser extends Component {
  constructor() {
    super();
    this.state = {
      firsName: "",
      lastName: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick() {
    this.setState({ redirectTo: "/" });
  }
  handleSubmit(event) {
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .put("/user/update", {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
      .then(response => {
        if (!response.data.error) {
          this.setState({
            //redirect to login page
            redirectTo: "/"
          });
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        let errors = error.response.data.errors;
        alert(errors);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      if (this.props.loggedIn)
        return (
          <div className="SignupForm">
            <h4>update</h4>
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
              <div className="form-group ">
                <div className="col-7"></div>
                <button
                  className="btn btn-primary col-1 col-mr-auto"
                  onClick={this.handleClick}
                >
                  Cancle
                </button>
              </div>

              <div className="form-group ">
                <div className="col-7"></div>
                <button
                  className="btn btn-primary col-1 col-mr-auto"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        );
    }
  }
}

export default UpdateUser;
