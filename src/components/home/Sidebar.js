import React from "react";
import { Route, Switch, } from "react-router-dom"
import Projects from "../projects/Projects";
import Supplies from "../supplies/Supplies"

const Sidebar = (props) => (

    <div className="sidebar">
        <Switch>
        <Route exact path="/"><Projects token={props.sessionToken} /></Route>
        <Route exact path="/supplies"><Supplies token={props.sessionToken} /></Route>
        </Switch>
    </div>
)

export default Sidebar