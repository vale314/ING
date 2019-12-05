import React, {Fragment} from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import { withRouter } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardImg,
  CardText,
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

var items = [
  {
    foto: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    sinapsis: '',
    name: ''
  },
  {
    foto: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    sinapsis: '',
    name: 'Freedom Isn\'t Free'
  },
  {
    foto: 'https://images.pexels.com/photos/2098707/pexels-photo-2098707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    sinapsis: '',
    name: ''
  }
];

class UserPeliculas extends React.Component {
  constructor(props){
    super(props);
    this.state={
      activeIndex: 0,
      animating: false,
      
      moviesArray: []
    }

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.getAllMovies = this.getAllMovies.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e, p){
    e.preventDefault();

    this.props.history.push({
      pathname:'/movie',
      state: p
    });
  }

  getAllMovies(){
    axios.get('/api/user/allm', null , {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    .then(res => {
      this.setState({
        moviesArray:res.data,
      })
      items = res.data;
    })
    .catch(err => {
      if(!Array.isArray(err.response.data.errors))
        this.props.setAlert(err.response.data.msg, 'danger');
      else
        this.props.setAlert(err.response.data.errors[0].msg, 'danger');
    })
  }

  componentWillMount(){
    this.props.loadUser();
    // eslint-disable-next-line
   

  }

  componentDidMount(){
    this.getAllMovies();
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }


  render() {
    const { activeIndex, moviesArray } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="carouselImg"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.foto}
          style={{position: 'relative'}}
        >

          <img className="d-block w-100" src={item.foto} alt={item.sinapsis} />
          <CarouselCaption captionText={item.name} captionHeader={item.name} />
        </CarouselItem>
      );
    });
    return (
      <>
        <div className="content">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        <div className="typography-line"><h1>Las Mejores Peliculas</h1></div>
          <Row>
            {
              moviesArray.map((p, i)=>{
                if(i%3 === 0 && i !== 0)
                return(
                  <Fragment key={i}>
                    <br/>
                    <Col xs="4">
                    <Card style={{width: '20rem'}}>
                    <CardImg top src={p.foto} alt="..."/>
                    <CardTitle style={{fontSize: "1.1rem ", textAlign: "center"}}>{p.name}</CardTitle>
                    <CardText>{p.sinapsis}</CardText>
                      <Button color="primary" onClick={ e => this.onClickHandler(e, p)}>
                        Comprar Boletos
                        </Button>
                    </Card>
                    </Col>
                  </Fragment>
                )
                return(
                  <Col xs="4" key={i}>
                  <Card style={{width: '20rem'}}>
                  <CardImg top src={p.foto} alt="..."/>
                  <CardTitle style={{fontSize: "1.1rem ", textAlign: "center"}}>{p.name}</CardTitle>
                  <CardText>{p.sinapsis}</CardText>
                    <Button color="primary" onClick={e => this.onClickHandler(e, p)}>
                      Comprar Boletos
                    </Button>
                  </Card>
                  </Col>
                )
              })
            }
          </Row>
      </div>
      </>
    );
  }
}


export default connect(null, {loadUser, setAlert} ) (withRouter(UserPeliculas));
