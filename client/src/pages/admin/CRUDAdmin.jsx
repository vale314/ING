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

class CRUDUsuarios extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{        
        name: '',
        email: '',
        password: '',
        password2: ''
      },
      emailUsuario:'',
      disabled:true,
      userNew:{        
        name: '',
        email: '',
        id:''
      },
      dataU:[]
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeNewUser = this.onChangeNewUser.bind(this);
    this.onSubmitSearchUsuario = this.onSubmitSearchUsuario.bind(this);
    
    this.getAllUsuarios = this.getAllUsuarios.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  componentWillMount(){
    this.props.loadUser();
    // eslint-disable-next-line
  }

  componentDidMount(){
    this.getAllUsuarios();
  } 

  onSubmit = e => {
    const { name, email, password, password2 } = this.state.user;

    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } else if (password !== password2) {
      this.props.setAlert('Las Contraseñas No Coinciden', 'danger');
    } else {
      axios.post('/api/admin/signupa', this.state.user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Admin Creado', 'danger');
        this.setState({
          user:{        
            name: '',
            email: '',
            password: '',
            password2: ''
          },

        })
        this.getAllUsuarios();
      })
      .catch(err => {
        if(!Array.isArray(err.response.data.errors))
          this.props.setAlert(err.response.data.msg, 'danger');
        else
          this.props.setAlert(err.response.data.errors[0].msg, 'danger');
      })
    }
  };

  handleDelete(e,a){

    e.preventDefault();

    const id = a._id;
    if (id === '') {
      this.props.setAlert('Error Para Realizar Operacion', 'danger');
    } else {
      axios.post('/api/admin/deletea', {id: id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Admin Eliminado', 'danger');
        this.getAllUsuarios();
        })
      .catch(err => {
        if(!Array.isArray(err.response.data.errors))
          this.props.setAlert(err.response.data.msg, 'danger');
        else
          this.props.setAlert(err.response.data.errors[0].msg, 'danger');
      })
    }
  }

  handleEdit(e,a){
    this.setState({
      emailUsuario:a.email
    },()=>{
      this.onSubmitSearchUsuario(e);
    })
    window.scroll(0,0);
  }

  onChange(e){
    const user = this.state.user;
    const name = e.target.name;
    user[name] = e.target.value;

    this.setState({
      user
    })
  }

  onChangeEmail(e){
    const value = e.target.value;
    this.setState({
      emailUsuario: value
    })
  }

  onChangeNewUser(e){
    const userNew = this.state.userNew;
    const name = e.target.name;
    userNew[name] = e.target.value;

    this.setState({
      userNew
    })
  }

  onSubmitSearchUsuario = e => {
    const { email } = this.state.emailUsuario;

    e.preventDefault();
    if (email === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } else {
      axios.post('/api/admin/searcha', {email: this.state.emailUsuario }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
          this.setState({
            ...this.state.user,
            userNew:{
              email:res.data.email,
              name: res.data.name,
              id: res.data._id
            },
            emailUsuario:'',
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

  onSubmitNewUser = e => {
    const { name, email } = this.state.userNew;

    e.preventDefault();
    if (name === '' || email === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } 
    else{
      axios.post('/api/admin/updatea', this.state.userNew, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Admin Actualizado', 'danger');
        this.setState({
          userNew:{        
            name: '',
            email: '',
            id:''
          },

        })

        this.getAllUsuarios();
        
      })
      .catch(err => {
        if(!Array.isArray(err.response.data.errors))
          this.props.setAlert(err.response.data.msg, 'danger');
        else
          this.props.setAlert(err.response.data.errors[0].msg, 'danger');
      })
    }
  };

  getAllUsuarios(){
    axios.get('/api/admin/alla', null , {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    .then(res => {
      this.setState({
        dataU:res.data,
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

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Crear Admin</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" onSubmit={this.onSubmit}>
                    <Row>
                      <Label md="3">Nombre</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="name" type="text" value={this.state.user.name} onChange={this.onChange} required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Email</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="email" type="email" value={this.state.user.email} onChange={this.onChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Label md="3">Contraseña</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="password" minLength="6" type="password" autoComplete="off" value={this.state.user.password} onChange={this.onChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3"> Repite La Contraseña</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="password2" type="password" minLength="6" autoComplete="off" value={this.state.user.password2} onChange={this.onChange} required/>
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
                          onClick={this.onSubmit}
                        >
                          Crear
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Actualizar Admin</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" onSubmit={this.onSubmit}>
                  <Row>
                      <Label md="2">Buscar Por Email: </Label>
                      <Col md="8">
                        <FormGroup>
                          <Input name="email" type="email" value={this.state.emailAdmin} onChange={this.onChangeEmail} required />
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={this.onSubmitSearchUsuario}
                        >
                          Buscar
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Nombre</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="name" type="text" value={this.state.userNew.name} onChange={this.onChangeNewUser} required  disabled={this.state.disabled}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Email</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="email" type="email" value={this.state.userNew.email} onChange={this.onChangeNewUser} required  disabled = {(this.state.disabled)? "disabled" : ""}/>
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
                          onClick={this.onSubmitNewUser}
                          disabled={this.state.disabled}
                        >
                          Actualizar
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">React Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.dataU}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Name",
                        accessor: "name"
                      },
                      {
                        Header: "Email",
                        accessor: "email"
                      },
                      {
                        Header: "Actions",
                        Cell: row => (
                          <div>
                              <button onClick={(e) => this.handleEdit(e,row.original)}>Edit</button>
                              <button onClick={(e) => this.handleDelete(e,row.original)}>Delete</button>
                          </div>
                      )
                      }
                    ]}
                    defaultPageSize={10}
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

export default connect(null, {loadUser, setAlert}) (CRUDUsuarios);
