import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import ReactTable from "react-table";

import { loadUser } from '../../actions/admin/authActionsAdmin';
import { setAlert } from '../../actions/alertActions';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class CRUDFunciones extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      disabled:true,
      newFunction:{        
        sala_num: '',
        name: '',
        horario: '',
        id:'',
        precio:''
      },
      moviesArray:[],
      functionArray:[]

    }
    
    this.onChangeNewMovie = this.onChangeNewMovie.bind(this);
    this.onSubmitSearchMovie = this.onSubmitSearchMovie.bind(this);
    
    this.getAllMovies = this.getAllMovies.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.getAllFunctions = this.getAllFunctions.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit2 = this.handleEdit2.bind(this);
  }
  
  componentWillMount(){
    this.props.loadUser();
    // eslint-disable-next-line
  }

  componentDidMount(){
    this.getAllMovies();
    this.getAllFunctions();
  } 

  handleEdit(e,a){
    e.persist();
    this.setState({
      nameFunction:a.name
    },()=>{
      this.onSubmitSearchMovie(e);
    })
    window.scroll(0,0);
  }

  handleEdit2(e,a){
    e.persist();
    this.setState({
      nameFunction:a.pelicula_name
    },()=>{
      this.onSubmitSearchMovie(e);
    })
    window.scroll(0,0);
  }

  onChangeNewMovie(e){
    const newFunction = this.state.newFunction;
    const name = e.target.name;
    newFunction[name] = e.target.value;

    this.setState({
      newFunction
    })
  }

  onSubmitSearchMovie = e => {
    const { name } = this.state.nameFunction;

    e.preventDefault();
    if (name === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } else {
      axios.post('/api/admin/searchm', {name: this.state.nameFunction }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
          this.setState({
            ...this.state.movie,
            newFunction:{
              name: res.data.name,
              sala_num: '',
              horario: '',
              precio: '',
              id: res.data._id
            },
            nameFunction:'',
            disabled: false
          })
      })
      .catch(err => {
        if(!Array.isArray(err.response.data.errors))
          this.props.setAlert(err.response.data.msg, 'danger');
        else
          this.props.setAlert(err.response.data.errors[0].msg, 'danger');
      })
    }
  };

  onSubmitNewMovie = e => {
    const { name, id, horario, sala_num, precio } = this.state.newFunction;

    e.preventDefault();
    if (name === '' || id === '' || horario === '' || sala_num === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } 
    else{
      axios.post('/api/admin/signupf', {
        pelicula_name: name,
        precio: precio,
        pelicula_id: id,
        sala_num: sala_num,
        horario: horario
      } , {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Sala Creada', 'danger');

        this.getAllMovies();

        this.setState({
          newFunction:{        
            sala_num: '',
            name: '',
            horario: '',
            id:'',
            precio:''
          }
        })
        this.getAllFunctions();
      })
      .catch(err => {
        if(!Array.isArray(err.response.data.errors))
          this.props.setAlert(err.response.data.msg, 'danger');
        else
          this.props.setAlert(err.response.data.errors[0].msg, 'danger');
      })
    }
  };

  getAllMovies(){
    axios.get('/api/admin/allm', null , {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    .then(res => {
      this.setState({
        moviesArray:res.data,
      })
      var result = [];
      for(var i in res.data)
          result.push(Object.values(res.data[i]));
    })
    .catch(err => {
      if(!Array.isArray(err.response.data.errors))
        this.props.setAlert(err.response.data.msg, 'danger');
      else
        this.props.setAlert(err.response.data.errors[0].msg, 'danger');
    })
  }

  getAllFunctions(){
    axios.get('/api/admin/allf', null , {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    .then(res => {
      this.setState({
        functionArray:res.data,
      })
      var result1 = [];
      for(var i in res.data)
          result1.push(Object.values(res.data[i]));
    })
    .catch(err => {
      if(!Array.isArray(err.response.data.errors))
        this.props.setAlert(err.response.data.msg, 'danger');
      else
        this.props.setAlert(err.response.data.errors[0].msg, 'danger');
    })
  }

  handleDelete(e,a){

    e.preventDefault();

    const id = a._id;
    if (id === '') {
      this.props.setAlert('Error Para Realizar Operacion', 'danger');
    } else {
      axios.post('/api/admin/deletef', {id: id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Funcion Eliminada', 'danger');
        this.getAllFunctions();
        })
      .catch(err => {
        if(!Array.isArray(err.response.data.errors))
          this.props.setAlert(err.response.data.msg, 'danger');
        else
          this.props.setAlert(err.response.data.errors[0].msg, 'danger');
      })
    }
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Crear Sala</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" onSubmit={this.onSubmit}>
                    <Row>
                      <Label md="3">Nombre</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="name" type="text" value={this.state.newFunction.name} onChange={this.onChangeNewMovie} required disabled/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Horario</Label>
                      <Col md="9">
                        <FormGroup>
                          <select  name="horario" value={this.state.newFunction.horario} onChange={this.onChangeNewMovie} disabled = {(this.state.disabled)? "disabled" : ""}>
                            <option name="" value=""></option>
                            <option name="9-11" value="9-11">9-11</option>
                            <option name="11-1" value="11-1">11-1</option>
                            <option name="1-3" value="1-3">1-3</option>
                            <option name="3-5" value="3-5">3-5</option>
                            <option name="5-7" value="5-7">5-7</option>
                            <option name="7-9" value="7-9">7-9</option>
                            <option name="9-11" value="9-11">9-11</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Sala</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="sala_num" type="number" value={this.state.newFunction.sala_num} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Precio</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="precio" type="number" value={this.state.newFunction.precio} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""}/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Form className="form-horizontal">
                    <Row>
                      <Label md="3" />
                      <Col md="9">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={this.onSubmitNewMovie}
                          disabled={this.state.disabled}
                        >
                          Crear
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">React Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.moviesArray}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Name",
                        accessor: "name"
                      },
                      {
                        Header: "Duracion",
                        accessor: "duracion"
                      },
                      {
                        Header: "Categoria",
                        accessor: "categoria"
                      },
                      {
                        Header: "Director",
                        accessor: "director"
                      },
                      {
                        Header: "Actions",
                        Cell: row => (
                          <div>
                              <button onClick={(e) => this.handleEdit(e,row.original)}>Crear Funcion</button>
                          </div>
                      )
                      }
                    ]}
                    defaultPageSize={5}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">React Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.functionArray}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Name",
                        accessor: "pelicula_name"
                      },
                      {
                        Header: "Boletos",
                        accessor: "boletos"
                      },
                      {
                        Header: "Sala Num",
                        accessor: "sala_num"
                      },
                      {
                        Header: "Precio",
                        accessor: "precio"
                      },
                      {
                        Header: "Horario",
                        accessor: "horario"
                      },
                      {
                        Header: "Actions",
                        Cell: row => (
                          <div>
                              <button onClick={(e) => {

                                this.handleDelete(e,row.original);
                                const id = row.original;
                                this.handleEdit2(e,id)

                                }}>Modificar</button>
                              <button onClick={(e) => this.handleDelete(e,row.original)}>Borrar</button>
                          </div>
                      )
                      }
                    ]}
                    defaultPageSize={5}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default connect(null, {loadUser, setAlert}) (CRUDFunciones);
