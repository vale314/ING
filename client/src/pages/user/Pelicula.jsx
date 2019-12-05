import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';

class Pelicula extends Component{
    constructor(props){
        super(props);
        this.state={
            horizontalTabs: "profile",
            verticalTabs: "profile",
            verticalTabsIcons: "home",
            pageTabs: "home",
            openedCollapses: ["collapseOne"],

            movie:{
                name: '',
                foto: '',
                trailer:'',
                duracion: '',
                sinapsis:'',
                director: '',
                categoria: '',
                ano: '',
                _id: ''
            },

            functions:[]
        }
        this.getAllFunctions = this.getAllFunctions.bind(this);
    }

    componentDidMount(){
        const movie = this.props.location.state;

        this.setState({
            movie
        },()=>{
            this.getAllFunctions();
        })
    }

    componentWillMount(){
        this.props.loadUser();
        // eslint-disable-next-line
      }

      getAllFunctions(){
        const { name } = this.state.movie;

        axios.post('/api/user/searchf', { name: name }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
      
          .then(res => {
            this.setState({
              functions:res.data,
            })
          })
          .catch(err => {
            if(!Array.isArray(err.response.data.errors))
              this.props.setAlert(err.response.data.msg, 'danger');
            else
              this.props.setAlert(err.response.data.errors[0].msg, 'danger');
          })
      }

     // with this function we change the active tab for all the tabs in this page
    changeActiveTab = (e, tabState, tadName) => {
        e.preventDefault();
        this.setState({
        [tabState]: tadName
        });
    };

    render(){

        const {name, foto, trailer, duracion, sinapsis, director, categoria, ano} = this.state.movie;

        const {functions} = this.state;

        console.log(functions);

        return(
            <div className="content">
                <Row>
                    <Col md="6">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" src={trailer} allowFullScreen></iframe>
                    </div>
                    </Col>
                    <Col md="6">
                    <Card>
                        <CardHeader>
                        <h5 className="card-category">Movie Cineco</h5>
                        <CardTitle tag="h3">Movie: {name}</CardTitle>
                        </CardHeader>
                        <CardBody>
                        <Row>
                            <Col lg="3" md="6">
                            {/* color-classNamees: "nav-pills-primary", "nav-pills-info", "nav-pills-success", "nav-pills-warning","nav-pills-danger" */}
                            <Nav
                                className="nav-pills-info nav-pills-icons flex-column"
                                pills
                            >
                                <NavItem>
                                <NavLink
                                    data-toggle="tab"
                                    href="#pablo"
                                    className={
                                    this.state.verticalTabsIcons === "home"
                                        ? "active"
                                        : ""
                                    }
                                    onClick={e =>
                                    this.changeActiveTab(
                                        e,
                                        "verticalTabsIcons",
                                        "home"
                                    )
                                    }
                                >
                                    <i className="tim-icons icon-attach-87" />
                                    Sinapsis
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    data-toggle="tab"
                                    href="#pablo"
                                    className={
                                    this.state.verticalTabsIcons === "settings"
                                        ? "active"
                                        : ""
                                    }
                                    onClick={e =>
                                    this.changeActiveTab(
                                        e,
                                        "verticalTabsIcons",
                                        "settings"
                                    )
                                    }
                                >
                                    <i className="tim-icons icon-settings" />
                                    Horarios
                                </NavLink>
                                </NavItem>
                            </Nav>
                            </Col>
                            <Col md="8">
                            <TabContent activeTab={this.state.verticalTabsIcons}>
                                <TabPane tabId="home">
                                <h4 className="description"> {sinapsis} </h4>
                                <br />
                                Categoria : {categoria}
                                <br />
                                Duracion: {duracion}
                                <br />
                                director: {director}
                                <br />
                                Año: {ano}
                                </TabPane>
                                <TabPane tabId="settings">
                                    {
                                        (functions == 0)?
                                            <h5>No Hay Funciones</h5>
                                        :
                                            <h5>Funciones: </h5>
                                    }
                                    {   
                                        functions.map((f)=>{
                                            return(  
                                            <div>
                                                <span>Horario: </span> <h5>{f.horario}</h5><span>Precio: </span><h5>{f.precio}</h5>
                                                <span>Boletos: </span> <h5>{f.boletos}</h5>
                                                <br/>
                                            </div>
                                            )
                                        })
                                    }
                                </TabPane>
                            </TabContent>
                            </Col>
                        </Row>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(null,{loadUser, setAlert})(Pelicula);