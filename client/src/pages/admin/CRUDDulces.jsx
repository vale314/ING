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

class CRUDDulces extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dulce:{        
        name: '',
        cantidad: '',
        precio:'',
        categoria: '',
        idD:''
      },
      idDulce:'',
      disabled:true,
      dulceNew:{        
        name: '',
        cantidad: '',
        precio:'',
        categoria: '',
        idD:'',
        id:''
      },
      dataD:[]
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.onChangeDulce = this.onChangeDulce.bind(this);
    this.onChangeNewDulce = this.onChangeNewDulce.bind(this);
    this.onSumbitSearchDulce = this.onSumbitSearchDulce.bind(this);
    this.onSubmitNewDulce = this.onSubmitNewDulce.bind(this);
    
    this.getAllDulces = this.getAllDulces.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  componentWillMount(){
    this.props.loadUser();
    // eslint-disable-next-line
  }

  componentDidMount(){
    this.getAllDulces();
  } 

  onSubmit = e => {
    const { name, cantidad,  precio, categoria, idD} = this.state.dulce;

    e.preventDefault();
    if (name === '' || cantidad === '' || precio === '' || categoria === '' || idD === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } else {
      
      axios.post('/api/admin/signupd', this.state.dulce, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Dulce Creado', 'danger');
        this.setState({
          dulce:{        
            name: '',
            cantidad: '',
            precio:'',
            categoria: '',
            idD:''
          },

        })
        this.getAllDulces();
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
      axios.post('/api/admin/deleted', {id: id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Dulce Eliminado', 'danger');
        this.getAllDulces();
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
      idDulce:a.idD
    },()=>{
      this.onSumbitSearchDulce(e);
    })
    window.scroll(0,0);
  }

  onChange(e){
    const dulce = this.state.dulce;
    const name = e.target.name;
    dulce[name] = e.target.value;

    this.setState({
      dulce
    })
  }

  onChangeDulce(e){
    const value = e.target.value;
    this.setState({
      idDulce: value
    })
  }

  onChangeNewDulce(e){
    const dulceNew = this.state.dulceNew;
    const name = e.target.name;
    dulceNew[name] = e.target.value;

    this.setState({
      dulceNew
    })
  }

  onSumbitSearchDulce = e => {
    const id  = this.state.idDulce;

    e.preventDefault();
    if (id === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } else {
      axios.post('/api/admin/searchd', {idD: this.state.idDulce }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
          this.setState({
            ...this.state.dulce,
            dulceNew:{
              name: res.data.name,
              cantidad: res.data.cantidad,
              precio: res.data.precio,
              categoria: res.data.categoria,
              idD: res.data.idD,
              id: res.data._id
            },
            idDulce:'',
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

  onSubmitNewDulce = e => {
    const { name, cantidad, precio, categoria, idD } = this.state.dulceNew;

    e.preventDefault();
    if (name === '' || cantidad === '' || precio === '' || categoria === '' || idD === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } 
    else{
      axios.post('/api/admin/updated', this.state.dulceNew, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Dulce Actualizado', 'danger');
        this.setState({
          dulceNew:{        
            name: '',
            cantidad: '',
            precio:'',
            categoria: '',
            idD:'',
            id:''
          },

        })

        this.getAllDulces();
        
      })
      .catch(err => {
        if(!Array.isArray(err.response.data.errors))
          this.props.setAlert(err.response.data.msg, 'danger');
        else
          this.props.setAlert(err.response.data.errors[0].msg, 'danger');
      })
    }
  };

  getAllDulces(){
    axios.get('/api/admin/alld', null , {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    .then(res => {
      this.setState({
        dataD:res.data,
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
                  <CardTitle tag="h4">Crear Dulce</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" onSubmit={this.onSubmit}>
                    <Row>
                      <Label md="3">Nombre</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="name" type="text" value={this.state.dulce.name} onChange={this.onChange} required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Cantidad</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="cantidad" type="number" value={this.state.dulce.cantidad} onChange={this.onChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Precio</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="precio" type="precio" value={this.state.dulce.precio} onChange={this.onChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Categoria</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="categoria" type="text" value={this.state.dulce.categoria} onChange={this.onChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3"> Id </Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="idD" type="number" autoComplete="off" value={this.state.dulce.idD} onChange={this.onChange} required/>
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
                  <CardTitle tag="h4">Actualizar Dulce</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" onSubmit={this.onSubmit}>
                  <Row>
                      <Label md="2">Buscar Por Id: </Label>
                      <Col md="8">
                        <FormGroup>
                          <Input name="idDulce" type="text" value={this.state.idDulce} onChange={this.onChangeDulce} required />
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={this.onSumbitSearchDulce}
                        >
                          Buscar
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Nombre</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="name" type="text" value={this.state.dulceNew.name} onChange={this.onChangeNewDulce} required  disabled={this.state.disabled}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Cantidad</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="cantidad" type="number" value={this.state.dulceNew.cantidad} onChange={this.onChangeNewDulce} required  disabled = {(this.state.disabled)? "disabled" : ""}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Precio</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="precio" value={this.state.dulceNew.precio} onChange={this.onChangeNewDulce} required  disabled = {(this.state.disabled)? "disabled" : ""}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Categoria</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="categoria" value={this.state.dulceNew.categoria} onChange={this.onChangeNewDulce} required  disabled = {(this.state.disabled)? "disabled" : ""}/>
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
                          onClick={this.onSubmitNewDulce}
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
                  <CardTitle tag="h4">Dulces</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.dataD}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Id",
                        accessor: "idD"
                      },
                      {
                        Header: "Name",
                        accessor: "name"
                      },
                      {
                        Header: "Cantidad",
                        accessor: "cantidad"
                      },
                      {
                        Header: "Categoria",
                        accessor: "categoria"
                      },
                      {
                        Header: "Precio",
                        accessor: "precio"
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

export default connect(null, {loadUser, setAlert}) (CRUDDulces);
