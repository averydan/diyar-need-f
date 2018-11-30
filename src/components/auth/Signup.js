import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import APIURL from "../../helpers/enviorment";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            showError: false
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
        fetch(`${APIURL}/user/add`, {
            method: 'POST',
            body: JSON.stringify({ user: { username: this.state.username, password: this.state.password } }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then((response) => {
                if (response.status !== 200) {
                    this.setState({ showError: true })
                    this.setState({ showEntry: false })
                } else {
                    response.json().then((data) => {
                        this.setState({ showEntry: true })
                        this.setState({ showError: false })
                        console.log(data);
                    })
                }
            })
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Signup</h1>
                <h6>Please fill out the form to create an account</h6>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="username" type="text" name="username" placeholder="enter username" onChange={this.handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="su_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} required />
                    </FormGroup>
                    {this.state.showError === true ? <div className="login-error">Initiate Identity Crisis. Either you are not who you think you are, someone made an account pretending to be you, or you already have an account. <img src="https://i.imgur.com/x8HP4lf.gif"></img></div> : ""}
                    {this.state.showEntry === true ? <div className="login-error">Identity Crisis Averted. <img src="https://media1.tenor.com/images/9e28a030febc76f88aa0be0a3759ef83/tenor.gif?itemid=10660848"></img></div> : ""}
                    <Button type="submit" id="submit-button"><h6>Submit</h6></Button>
                </Form>
            </div>
        )
    }
}