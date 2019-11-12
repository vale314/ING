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

class CRU extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movie:{        
        name: '',
        foto: '',
        trailer:'',
        duracion: '',
        sinapsis:'',
        director: '',
        categoria:'',
        ano:''
      },
      nameMovie:'',
      disabled:true,
      movieNew:{        
        name: '',
        foto: '',
        trailer:'',
        duracion: '',
        sinapsis:'',
        director: '',
        categoria:'',
        ano:'',
        id:''
      },
      dataMo:[]
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNewMovie = this.onChangeNewMovie.bind(this);
    this.onSubmitSearchMovie = this.onSubmitSearchMovie.bind(this);
    
    this.getAllMovies = this.getAllMovies.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  componentWillMount(){
    this.props.loadUser();
    // eslint-disable-next-line
  }

  componentDidMount(){
    this.getAllMovies();
  } 

  onSubmit = e => {
    const { name, foto, trailer, duracion, sinapsis, director, categoria, ano } = this.state.movie;

    e.preventDefault();
    if (name === '' || foto === '' || trailer === '' || duracion === '' || sinapsis === '' ||
        categoria === '' || director === '' || ano === '' ) {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } else {
        axios.post('/api/admin/signupm', this.state.movie, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Pelicula Creada', 'danger');
        this.setState({
          movie:{        
            name: '',
            foto: '',
            trailer:'',
            duracion: '',
            sinapsis:'',
            director: '',
            categoria:'',
            ano:''
          },

        })
        this.getAllMovies();
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
      axios.post('/api/admin/deletem', {id: id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Pelicula Eliminado', 'danger');
        this.getAllMovies();
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
    e.persist();
    this.setState({
      nameMovie:a.name
    },()=>{
      this.onSubmitSearchMovie(e);
    })
    window.scroll(0,0);
  }

  onChange(e){
    const movie = this.state.movie;
    const name = e.target.name;
    movie[name] = e.target.value;

    this.setState({
      movie
    })
  }

  onChangeName(e){
    const value = e.target.value;
    this.setState({
      nameMovie: value
    })
  }

  onChangeNewMovie(e){
    const movieNew = this.state.movieNew;
    const name = e.target.name;
    movieNew[name] = e.target.value;

    this.setState({
      movieNew
    })
  }

  onSubmitSearchMovie = e => {
    const { name } = this.state.nameMovie;

    e.preventDefault();
    if (name === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } else {
      axios.post('/api/admin/searchm', {name: this.state.nameMovie }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
          this.setState({
            ...this.state.movie,
            movieNew:{
              name: res.data.name,
              foto: res.data.foto,
              trailer: res.data.trailer,
              duracion: res.data.duracion,
              sinapsis:res.data.sinapsis,
              director: res.data.director,
              categoria: res.data.categoria,
              ano: res.data.ano,
              id: res.data._id

            },
            nameMovie:'',
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
    const { name, foto, trailer, duracion, sinapsis, director, categoria, ano } = this.state.movieNew;

    e.preventDefault();
    if (name === '' || foto === '' || trailer === '' || duracion === '' || sinapsis === '' ||
        categoria === '' || director === '' || ano === '') {
      this.props.setAlert('Porfavor Ingree sus campos', 'danger');
    } 
    else{
      axios.post('/api/admin/updatem', this.state.movieNew, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then(res => {
        this.props.setAlert('Movie Actualizado', 'danger');
        this.setState({
          userNew:{        
            name: res.data.name ,
            foto: res.data.foto,
            trailer: res.data.trailer,
            duracion: res.data.duracion,
            sinapsis: res.data.sinapsis,
            director: res.data.director,
            categoria: res.data.categoria,
            ano: res.data.ano
          },

        })

        this.getAllMovies();
        
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
        dataMo:res.data,
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
                  <CardTitle tag="h4">Crear Pelicula</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" onSubmit={this.onSubmit}>
                    <Row>
                      <Label md="3">Nombre</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="name" type="text" value={this.state.movie.name} onChange={this.onChange} required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Foto</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="foto" type="text" value={this.state.movie.foto} onChange={this.onChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Trailer</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="trailer" type="text" value={this.state.movie.trailer} onChange={this.onChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Duracion</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="duracion" type="number" value={this.state.movie.duracion} onChange={this.onChange} required/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Sinapsis</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="sinapsis" type="text" value={this.state.movie.sinapsis} onChange={this.onChange} required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Director</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="director" type="text" value={this.state.movie.director} onChange={this.onChange} required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Categoria</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="categoria" type="text" value={this.state.movie.categoria} onChange={this.onChange} required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Año</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="ano" type="date" value={this.state.movie.ano} onChange={this.onChange} required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row></Row>
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
                  <CardTitle tag="h4">Actualizar Movie</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" onSubmit={this.onSubmit}>
                  <Row>
                      <Label md="2">Buscar Por Nombre: </Label>
                      <Col md="8">
                        <FormGroup>
                          <Input name="name" type="text" value={this.state.nameMovie} onChange={this.onChangeName} required />
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={this.onSubmitSearchMovie}
                        >
                          Buscar
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Nombre</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="name" type="text" value={this.state.movieNew.name} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Foto</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="foto" type="text" value={this.state.movieNew.foto} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Trailer</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="trailer" type="text" value={this.state.movieNew.trailer} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Duracion</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="duracion" type="number" value={this.state.movieNew.duracion} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Sinapsis</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="sinapsis" type="text" value={this.state.movieNew.sinapsis} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Director</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="director" type="text" value={this.state.movieNew.director} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Categoria</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="categoria" type="text" value={this.state.movieNew.categoria} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Año</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input name="ano" type="date" value={this.state.movieNew.ano.split('T')[0]} onChange={this.onChangeNewMovie} required disabled = {(this.state.disabled)? "disabled" : ""} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row></Row>
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
                    data={this.state.dataMo}
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

export default connect(null, {loadUser, setAlert}) (CRU);
