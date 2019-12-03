import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import ReactTable from "react-table";

import { loadUser } from '../../actions/vendedor/authActionsVendedor';
import { setAlert } from '../../actions/alertActions';

import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';



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
  Col,
  Collapse
} from "reactstrap";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

class Vendedor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      disabled:true,
      newFunction:{        
        sala_num: '',
        pelicula_name: '',
        horario: '',
        pelicula_id:'',
        precio:'',
        cantidad:'',
        precioT:'',
        _id: ''
      },
      moviesArray:[],
      functionArray:[]

    }
    
    this.onChangeNewMovie = this.onChangeNewMovie.bind(this);
    
    this.handleEdit = this.handleEdit.bind(this);

    this.getAllFunctions = this.getAllFunctions.bind(this);
    this.handleEdit2 = this.handleEdit2.bind(this);

    this.onSubmitNewMovie = this.onSubmitNewMovie.bind(this);

    this.resetState = this.resetState.bind(this);

  }

  resetState = () => {
    this.setState({
      newFunction:{        
        sala_num: '',
        pelicula_name: '',
        horario: '',
        pelicula_id:'',
        precio:'',
        precioT: '',
        cantidad: ''
      },
      disabled: true
    })
  };
  
  componentWillMount(){
    this.props.loadUser();
    // eslint-disable-next-line
  }

  componentDidMount(){
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
    e.preventDefault();
    this.setState({
      newFunction:a,
      disabled: false
    })
  }

  onChangeNewMovie(e){
    const newFunction = this.state.newFunction;
    const name = e.target.name;
    newFunction[name] = e.target.value;

    this.setState({
      newFunction
    })

    const { precio, cantidad } = this.state.newFunction;

    this.setState({
      newFunction:{
        ...this.state.newFunction,
        precioT: ((precio * cantidad)/ 100) * 16 + (precio * cantidad)
      }
    })
  }

  getAllFunctions(){
    axios.get('/api/vendedor/allf', null , {
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

  onSubmitNewMovie = e => {
    const { pelicula_name, pelicula_id, horario, sala_num, precio, cantidad, precioT, _id } = this.state.newFunction;

    e.preventDefault();
    if (pelicula_name === '' || pelicula_id === '' || horario === '' || sala_num === '' || cantidad === '' 
    || precioT === '' ) {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } 
    else{
      axios.post('/api/vendedor/addb', {
        pelicula_name: pelicula_name,
        precio: precio,
        precioT: precioT,
        pelicula_id: pelicula_id,
        cantidad: cantidad,
        sala_num: sala_num,
        horario: horario,
        _id: _id
      } , {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Boletos Creados', 'danger');

        this.getAllFunctions();
      })
      .catch(err => {
        console.log(err);
        if(err.response.data && !Array.isArray(err.response.data.errors))
          this.props.setAlert(err.response.data.msg, 'danger');
        else
          this.props.setAlert(err.response.data.errors[0].msg, 'danger');
      })
    }
  };


  render() {
    const {pelicula_name, precio, horario, sala_num, cantidad, precioT} = this.state.newFunction; 
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6" xs="6">
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
                          <Input name="name" type="text" value={this.state.newFunction.pelicula_name} onChange={this.onChangeNewMovie} required disabled/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Horario</Label>
                      <Col md="9">
                        <FormGroup>
                          <select  name="horario" value={this.state.newFunction.horario} onChange={this.onChangeNewMovie} disabled  >
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
                          <Input name="sala_num" type="number" value={this.state.newFunction.sala_num} onChange={this.onChangeNewMovie} required disabled  />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Precio</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="precio" type="number" value={this.state.newFunction.precio} onChange={this.onChangeNewMovie} required disabled  />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Cantidad</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="cantidad" type="number" value={this.state.newFunction.cantidad} onChange={this.onChangeNewMovie} required  disabled = {(this.state.disabled)? "disabled" : ""}  />
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
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={this.resetState}
                          disabled={this.state.disabled}
                        >
                          Reset
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
                  <h5 className="card-category">Ticket</h5>
                  <CardTitle tag="h3">Cineco</CardTitle>
                </CardHeader>
                <div
                  aria-multiselectable={true}
                  className="card-collapse"
                  id="accordion"
                  role="tablist"
                >
                </div>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <span>Pelicula: </span>

                      <br/>
                      <span>Horario: </span>

                      <br/>
                      <span>Sala: </span>

                      <br/>
                      <span>Precio: </span>

                      <br/>

                      <span>Cantidad:</span>

                      <br />
                      <br/>

                      <h5>Sin Iva:</h5>
                      <h5>IVA:</h5>
                      <h3>Total:</h3>

                    </Col>
                    <Col md="6">
                      <span>{ pelicula_name }</span>
                      <br/>
                      <span> { horario } </span>
                      <br/>
                      <span>  {sala_num } </span>
                      <br/>
                      <span> { precio } </span>
                      <br/>
                      <span> { cantidad } </span>
                      <br/>
                      <br/>
                      <h5> {precio * cantidad} </h5>
                      <h5> {((precio * cantidad)/ 100) * 16} </h5>
                      <h3> {((precio * cantidad)/ 100) * 16 + (precio * cantidad)} </h3>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              </Col>
          </Row>
          <Row className="mt-5">
            <Col xs={6}>
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

                                const id = row.original;
                                this.handleEdit2(e, id)

                                }}>Agregar</button>
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
            <Col xs="6">
            <PDFViewer style={{ width: '100%', height: '100%' }}>
        <Document>
          <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Cine    -     CineCo -  Boletos</Text>
              </View>
              <View style={styles.section}>
                <Text>Pelicula: </Text><Text>{pelicula_name}</Text>
              </View>
              <View style={styles.section}>
                <Text>Horario: </Text><Text>{horario}</Text>
              </View>
              <View style={styles.section}>
                <Text>Sala: </Text><Text>{sala_num}</Text>
              </View>
              <View style={styles.section}>
                <Text>Precio Por Boleto: </Text><Text>{precio}</Text>
              </View>
              <View style={styles.section}>
                <Text>Cantidad: </Text><Text>{cantidad}</Text>
              </View>
              <View style={styles.section}>
                <Text>Precio Total: </Text><Text>{precioT}</Text>
              </View>
                </Page>
              </Document>
            </PDFViewer> 
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default connect(null, {loadUser, setAlert}) (Vendedor);
