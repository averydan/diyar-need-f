import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/enviorment";

export default class SuppliesCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: 18,
            brand: "",
            item: "",
            amount: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        fetch(`${APIURL}/supplies/new`, {
            method: "POST",
            body: JSON.stringify({ supplies: this.state }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.updateTable();
                this.setState({
                    pid: "",
                    brand: "",
                    item: "",
                    amount: ""
                })
            })
        event.preventDefault()
        this.props.toggle()
    }

    render() {
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader toggle={this.props.toggle} charCode="X">Add Supplies</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Input type="text" name="brand" value={this.state.brand} placeholder="Brand" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="item" value={this.state.item} placeholder="Item" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="amount" value={this.state.amount} placeholder="Amount" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary">Add Supplies</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}