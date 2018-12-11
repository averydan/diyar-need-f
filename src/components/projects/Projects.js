import React, { Component } from "react";
import ProjectTable from "./ProjectTable";
import ProjectEdit from "./ProjectEdit";
import APIURL from "../../helpers/enviorment";
export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            updatePressed: false,
            projectToUpdate: {}
        }
    }
    componentDidMount = () => {
        this.fetchProjects();
    }
    fetchProjects = () => {
        fetch(`${APIURL}/projects/get`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                return this.setState({ projects: data })
            })
    }

    projectDelete = (event) => {
        fetch(`${APIURL}/projects/delete/${event.target.id}`, {
            method: "DELETE",
            body: JSON.stringify({ project: { id: event.target.id } }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then((res) => this.fetchProjects())
    }

    projectsUpdate = (event, project) => {
        console.log(project);
        fetch(`${APIURL}/projects/update/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify({ project: project }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => {
                this.fetchProjects();
                this.setState({ updatePressed: false })
            })
    }

    setUpdatedProjects = (event, project) => {
        this.setState({
            projectToUpdate: project,
            updatePressed: true
        })
    }

    toggle = () => {
        this.setState({ updatePressed: false })
    }

    render() {
        return (
            <div>
                <ProjectTable projects={this.state.projects} updateTable={this.fetchProjects} token={this.props.token} delete={this.projectDelete} update={this.setUpdatedProjects} />
                {this.state.updatePressed ? <ProjectEdit toggle={this.toggle} update={this.projectsUpdate} token={this.props.token}
                project={this.state.projectToUpdate} /> : <div></div>}
            </div>
        )
    }

}

