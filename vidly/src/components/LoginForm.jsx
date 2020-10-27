import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";

import Form from "./common/Form";
import AuthService from "../services/AuthService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).label("Password"),
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;
    try {
      await AuthService.login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    if (AuthService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <ToastContainer />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
