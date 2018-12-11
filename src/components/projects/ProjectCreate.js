import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/enviorment";

export default class ProjectCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aid: "",
            index: "",
            title: "",
            budget: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        fetch(`${APIURL}/projects/add`, {
            method: "POST",
            body: JSON.stringify({ project: this.state }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.updateTable();
                this.setState({
                    aid: "",
                    index: "",
                    title: "",
                    budget: ""
                })
            })
        event.preventDefault()
        this.props.toggle()
    }

    render() {
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader toggle={this.props.toggle} charCode="X">Add New Project</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Input type="text" name="title" value={this.state.title} placeholder="Project Title" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="budget" value={this.state.budget} placeholder="Project Budget" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="index" value={this.state.index} placeholder="Project Priority" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary">Create Project</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}