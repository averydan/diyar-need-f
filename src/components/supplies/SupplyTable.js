import React, { Component } from 'react';
import { Container, Table, Button, Row, Col, Collapse, Card, CardBody } from 'reactstrap';
import CreateSupplies from './CreateSupplies';
import './SupplyTable.css'
import { Link } from "react-router-dom"


class SupplyTable extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            modalOpen: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }
    render() {
        return (
            <Container className="display">
                <Row>
                    <Col md="12">
                        <div id="header"><h2>{this.props.project.title}</h2></div>
                        {this.state.modalOpen ? <CreateSupplies pid={this.props.project.id} updateTable={this.props.updateTable} toggle={this.toggle} token={this.props.token} /> : <div></div>}
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Brand</th>
                                    <th>Item</th>
                                    <th>Amount Needed</th>
                                    <th><Button id="create-supply" onClick={this.toggle}>Add Supplies</Button><Link to="/"><Button>Back to Projects</Button></Link></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.supplies.map((supply, id) => {
                                        return (
                                            <tr key={id}>
                                                <td scope="row">{supply.brand}</td>
                                                <td>{supply.item}</td>
                                                <td>{supply.amount}</td>                                                <td>
                                                    <Button id={supply.id} className="delete-button" onClick={this.props.delete} outline color="secondary">Delete</Button>
                                                    <Button id={supply.id} onClick={e => this.props.update(e, supply)} outline color="secondary">Update</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default SupplyTable;