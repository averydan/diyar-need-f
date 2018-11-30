import React, { Component } from "react";
import { Button } from "reactstrap";
import Signup from "./Signup";
import Login from "./Login"
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignup: true
        }
    }
    handleClick = (event) => {
        if (this.state.showSignup === true) {
            this.setState({ showSignup: false })
        } else {
            this.setState({ showSignup: true })
        }
    }
    render() {
        return (
            <div id="auth-background">
                <div id="auth-form">
                    {this.state.showSignup === true ? <Signup setToken={this.props.setToken} /> : <Login setToken={this.props.setToken} />}
                    <Button type="button" onClick={this.handleClick}>{this.state.showSignup === true ? <h6>Sign In Here</h6> : <h6>Sign Up Here</h6>}</Button>
                </div>
            </div>
        )
    }
}
export default Auth