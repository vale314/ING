import React, {Component, Fragment} from 'react';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';


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
import PrivateRoute from './routing/privateRouteUser';
import Alert from './layout/alert.jsx';
import AdminLogin from './pages/admin/LoginAdmin.jsx';
import AdminPrivateRoute from './routing/privateRouteAdmin';
import loginVendedor from './pages/vendedor/loginVendedor';
import VendedorPrivateRoute from './routing/privateRouteVendedor';
import CRUDVendedor from './pages/admin/CRUDVendedor';
import CRUDUser from './pages/admin/CRUDUsuarios';
import CRUDDulces from './pages/admin/CRUDDulces';
import CRUDAdmin from './pages/admin/CRUDAdmin';
import CRUDMovies from './pages/admin/CRUDMovies';

const hist = createBrowserHistory();

class App extends Component {
  render(){
    return (
      <Provider store={store}>
          <Router history={hist}>  
              <Fragment>
                <Alert />
                <Switch>
                  <Route path="/" exact render={props => <Index {...props} />}/>    
                  <Route path="/login" exact render={props => <Login />}/>
                  <Route path="/signup" exact render={props => <SignUp/>} />
                  <PrivateRoute path="/user" exact component={User} />

                  <Route path="/admin/login" exact component={AdminLogin} />
                  <AdminPrivateRoute path="/admin" exact component={Admin} />
                  <AdminPrivateRoute path="/admin/vendedor" exact component={CRUDVendedor} />
                  <AdminPrivateRoute path="/admin/user" exact component={CRUDUser} />
                  <AdminPrivateRoute path="/admin/dulces" exact component={CRUDDulces} />
                  <AdminPrivateRoute path="/admin/admin" exact component={CRUDAdmin} />
                  <AdminPrivateRoute path="/admin/peliculas" exact component={CRUDMovies} />


                  <Route path="/vendedor/login" exact component={ loginVendedor} />
                  <VendedorPrivateRoute path="/vendedor" exact component={ Vendedor} /> 
                  
                  <Route path="*" render={props =><h1>No Encontrado</h1>}/>
                </Switch>
              </Fragment>
          </Router>
      </Provider>
    );
  }
}

export default App;
