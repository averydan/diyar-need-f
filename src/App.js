import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/home/Navbar";
import Auth from "./components/auth/Auth";
import Sidebar from "./components/home/Sidebar";
//import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: ""
    }
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token })
    }
  }

  setSessionState = (token) => {
    localStorage.setItem("token", token);
    this.setState({ sessionToken: token });
  }

  logout = () => {
    this.setState({
      sessionToken: "",
    })
    localStorage.clear();
  }

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem("token")) {
      return (
        <Router>
              <Sidebar sessionToken={this.state.sessionToken} />
        </Router>
      )
    } else {
      return (
        <Route path="/auth">
          <Auth setToken={this.setSessionState} />
        </Route>
      )
    }
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar token={this.state.sessionToken} clickLogout={this.logout} />
          {this.protectedViews()}
        </div>
      </Router>
    );
  }
}
