import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class navbar extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            site: ''
        }

        this.onClick = this.onClick.bind(this);
        this.onClickRoute = this.onClickRoute.bind(this);
    }

    componentDidMount(){
      const pathname = this.props.history.location.pathname;

      var n = pathname.indexOf('admin');
      
      if(n > 0){
        return this.setState({
          site:'admin'
        })
      }

      n = pathname.indexOf('vendedor');
      console.log(n)
      if(n > 0){
        return this.setState({
          site:'vendedor'
        })
      }

      n = pathname.indexOf('user');
      if(n > 0){
        return this.setState({
          site:'user'
        })
      }
      return this.setState({
        site:''
      })
    }

  onClick(){
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  onClickRoute(e, link){
    e.preventDefault();
    switch (link) {
        case "/":
            this.props.history.push({
                pathname:'/'
              });
        break;
        case "/login":
            this.props.history.push({
                pathname:'/login'
            })
        break;
        case "/signup":
            this.props.history.push({
                pathname:'/signup'
            })
        break;
        case "/admin/admin":
            this.props.history.push({
                pathname:'/admin/admin'
            })
        break;
        case "/admin/user":
            this.props.history.push({
                pathname:'/admin/user'
            })
        break;
        case "/admin/funciones":
            this.props.history.push({
                pathname:'/admin/funciones'
            })
        break;
        case "/admin/vendedor":
            this.props.history.push({
                pathname:'/admin/vendedor'
            })
        break;
        case "/admin/peliculas":
            this.props.history.push({
                pathname:'/admin/peliculas'
            })
        break;
        case "/admin/dulces":
            this.props.history.push({
                pathname:'/admin/dulces'
            })
        break;
        case "/admin":
            this.props.history.push({
                pathname:'/admin'
            })
        break;
        case "/admin/logout":
            this.props.history.push({
                pathname:'/'
            })
            localStorage.removeItem('tokenAdmin');
        break;
        case "/vendedor/logout":
            this.props.history.push({
                pathname:'/'
            })
            localStorage.removeItem('tokenVendedor');
        break;
        case "/user/logout":
            this.props.history.push({
                pathname:'/'
            })
            localStorage.removeItem('tokenUser');
        break;
        case "/user":
            this.props.history.push({
              pathname:'/user'
            })
            localStorage.removeItem('/user');
        break;
        default:
            break;
    }
  }

  render(){
    const {isOpen, site} = this.state;
    if(site === ''|| site == null){
      return (
          <div>
            <Navbar style={{position: "sticky"}} color="light" light expand="md">
              <NavbarBrand onClick={e => this.onClickRoute(e, "/")}>Home</NavbarBrand>
              <NavbarToggler onClick={this.onClick} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar style={{cursor: "default"}}>
                  <NavItem>
                    <NavLink onClick={e => this.onClickRoute(e, "/login")}>Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={e => this.onClickRoute(e, "/signup")}>Signup</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/vale314/ING" target="_blank">GitHub</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
    if(site === 'admin'){
      return (
          <div>
            <Navbar color="light" light expand="md" style={{cursor: "default"}}>
              <NavbarBrand onClick={e => this.onClickRoute(e, "/admin")}>Admin</NavbarBrand>
              <NavbarToggler onClick={this.onClick} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink onClick={e => this.onClickRoute(e, "/admin/peliculas")}>Peliculas</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={e => this.onClickRoute(e, "/admin/dulces")}>Dulceria</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={e => this.onClickRoute(e, "/admin/funciones")}>Funciones</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={e => this.onClickRoute(e, "/admin/vendedor")}>Vendedor</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={e => this.onClickRoute(e, "/admin/user")}>User</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={e => this.onClickRoute(e, "/admin/admin")}>Admin</NavLink>
                  </NavItem>
                </Nav>
                    <NavLink onClick={e => this.onClickRoute(e, "/admin/logout")}>Logout</NavLink>
              </Collapse>
            </Navbar>
          </div>
        );
    }
    if(site === 'vendedor'){
      return (
          <div>
            <Navbar color="light" light expand="md" style={{cursor: "default"}}>
              <NavbarBrand onClick={e => this.onClickRoute(e, "/")}>Vendedor</NavbarBrand>
              <NavbarToggler onClick={this.onClick} />
              <Collapse isOpen={isOpen} navbar>
                <NavLink onClick={e => this.onClickRoute(e, "/vendedor/logout")}>Logout</NavLink>
              </Collapse>
            </Navbar>
          </div>
        );
    }
    if(site === 'user'){
      return (
          <div>
            <Navbar color="light" light expand="md" style={{cursor: "default"}}>
              <NavbarBrand onClick={e => this.onClickRoute(e, "/user")}>Home</NavbarBrand>

              <NavLink style={{marginLeft: "auto"}} onClick={e => this.onClickRoute(e, "/user/logout")}>Logout</NavLink>
            </Navbar>
          </div>
        );
    }
    
  }
  
}

export default withRouter(navbar);