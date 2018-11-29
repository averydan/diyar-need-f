import React, { Component } from 'react';
import APIURL from '../helpers/enviorment';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
    }

    getHello = () => {
        console.log('hello world');
        fetch(`${APIURL}/hello`, {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                return this.setState({ text: data })
            })
            console.log(this.state);
    }

    componentDidMount = () => {
        this.getHello();
    }

    render() {
        console.log(this.state);
        return (
            <div className="main">
                <div className="mainDiv">
                    <h4>
                        {this.state.text.message}
                    </h4>
                </div>
            </div>
        );
    }
}