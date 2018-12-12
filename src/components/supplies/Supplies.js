import React, { Component } from "react";
import SupplyTable from "./SupplyTable";
import SupplyEdit from "./SupplyEdit";
import APIURL from "../../helpers/enviorment";
import { withRouter } from "react-router"

class Supplies extends Component {
    constructor(props) {
        super(props);
        console.log("Hello", this.props.location)
        this.state = {
            supplies: [],
            updatePressed: false,
            supplyToUpdate: {},
            project: this.props.location.query
        }
    }
    componentDidMount = () => {
        this.fetchSupplies();
    }
    fetchSupplies = () => {
        console.log(this.state.project)
        fetch(`${APIURL}/supplies/get/4`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                return this.setState({ supplies: data })
            })
    }

    supplyDelete = (event) => {
        fetch(`${APIURL}/supplies/delete/${event.target.id}`, {
            method: "DELETE",
            //body: JSON.stringify({ supply: { id: event.target.id } }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then((res) => this.fetchSupplies())
    }

    suppliesUpdate = (event, supply) => {
        console.log(supply);
        fetch(`${APIURL}/supplies/update/${supply.id}`, {
            method: 'PUT',
            body: JSON.stringify({ supply: supply }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => {
                this.fetchSupplies();
                this.setState({ updatePressed: false })
            })
    }

    setUpdatedSupplies = (event, supply) => {
        this.setState({
            supplyToUpdate: supply,
            updatePressed: true
        })
    }

    toggle = () => {
        this.setState({ updatePressed: false })
    }

    render() {
        return (
            <div>
                <SupplyTable supplies={this.state.supplies} updateTable={this.fetchSupplies} token={this.props.token} delete={this.supplyDelete} update={this.setUpdatedSupplies} />
                {this.state.updatePressed ? <SupplyEdit toggle={this.toggle} update={this.suppliesUpdate} token={this.props.token}
                supply={this.state.supplyToUpdate} /> : <div></div>}
            </div>
        )
    }

}

export default withRouter(Supplies)