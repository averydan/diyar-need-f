import React, { Component } from 'react';
import { Container, Table, Button, Row, Col, Collapse, Card, CardBody } from 'reactstrap';
import ProjectCreate from './ProjectCreate';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './ProjectTable.css';

class ProjectTable extends Component {
    constructor(props) {
        super(props);
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
                        <div id="header"><h2>My Projects</h2></div>
                        {this.state.modalOpen ? <ProjectCreate updateTable={this.props.updateTable} toggle={this.toggle} token={this.props.token} /> : <div></div>}
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Priority</th>
                                    <th>Title</th>
                                    <th>Budget</th>
                                    <th><Button id="create-project" onClick={this.toggle}>Add Project</Button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.projects.map((project, id) => {
                                        return (
                                            <tr key={id}>
                                                <th scope="row">{project.index}</th>
                                                <td><Link to={{ pathname: "/supplies", query: { title: project.title, id: project.id } }} onClick={sessionStorage.setItem('title', project.title)}>{project.title}</Link></td>
                                                <td>{project.budget}</td>                                   
                                                <td>
                                                    <Button id={project.id} className="delete-button" onClick={this.props.delete} outline color="secondary">Delete</Button>
                                                    <Button id={project.id} onClick={e => this.props.update(e, project)} outline color="secondary">Update</Button>
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

export default withRouter(ProjectTable);