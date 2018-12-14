import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class SupplyEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            brand: "",
            item: "",
            amount: ""
        };
    }

    componentWillMount() {
        console.log(this.props.supply);
        this.setState({
            id: this.props.supply.id,
            brand: this.props.supply.brand,
            item: this.props.supply.item,
            amount: this.props.supply.amount
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
                    <ModalHeader toggle={this.props.toggle} charCode="X">Edit Supply</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Input type="text" name="brand" value={this.state.brand} placeholder="Brand" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="item" value={this.state.item}  placeholder="Item" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="amount" value={this.state.amount}  placeholder="Amount" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary">Update Supply</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default SupplyEdit;