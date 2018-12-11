import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class ProjectEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aid: "",
            index: "",
            title: "",
            budget: ""
        };
    }

    componentWillMount() {
        console.log(this.props.project.aid);
        this.setState({
            id: this.props.project.id,
            aid: this.props.project.aid,
            index: this.props.project.index,
            title: this.props.project.title,
            budget: this.props.project.budget
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.update(event, this.state)
    }

    render() {
        return (
            <div>
                <Modal isOpen={true} >
                    <ModalHeader toggle={this.props.toggle} charCode="X">Edit Project</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Input type="text" name="title" value={this.state.title} placeholder="project Title" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="budget" value={this.state.budget}  placeholder="Project Budget" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="index" value={this.state.index}  placeholder="Project Priority" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary">Update Project</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default ProjectEdit;