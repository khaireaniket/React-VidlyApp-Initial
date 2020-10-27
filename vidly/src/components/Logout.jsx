import { Component } from "react";
import AuthService from "../services/AuthService";

class Logout extends Component {
  componentDidMount() {
    AuthService.logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
