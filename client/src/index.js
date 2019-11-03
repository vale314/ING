import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import './index.css';

import "./assets/css/nucleo-icons.css";
import "./assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "./assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";

import Index from "./pages/index";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Vendedor from "./pages/vendedor/Vendedor";
import User from "./pages/user/User";
import Admin from "./pages/admin/Admin";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
      <Switch>
        <Route path="/" exact render={props => <Index {...props} />}/>    
        <Route path="/login" exact render={props => <Login />}/>
        <Route path="/signup" exact render={props => <SignUp/>} />
        <Route path="/user" exact  render={props => <User />} />
        <Route path="/inter" exact render={props => <Vendedor />} /> 
        <Route path="/admin" exact render={props => <Admin />} />
        <Route path="*" render={props =><h1>No Encontrado</h1>}/>
      </Switch>
    </Router>,
    document.getElementById("root")
  );
  
