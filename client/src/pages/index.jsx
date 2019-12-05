
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";

class Index extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }

  render() {
    return (
      <>
        
        <div className="content">
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'}}
          >
            <h1  style={{
              textAlign: 'center',
              fontSize: '6rem',
              fontFamily: "Cookie",
              padding: '20px',
              margin: '15px',
              zIndex: '1',
              opacity: '0.7',
              color: 'whitesmoke'
              }}>Welcome To CINECO</h1>

            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',}}>
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  backgroundColor: 'lightdark',
                  width: '100%',
                  height: '100vh',
                  opacity: '0.5',
                }}></div>
                <video autoPlay loop muted style={{width: "inherit"}}>
                  <source type="video/mp4" src="https://srv-file2.gofile.io/download/YSSvZs/compress.mp4" />
                </video>
            </div>

            </div>
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <br />

                <h1 className="title" style={{color: "red"}}>
                <div className="icon icon-info" style={{display: 'inline'}}>
                    <i className="tim-icons icon-trophy" />
                  </div>
                  Saludos Y Feliz Navidad! <br/> Att: Valentin Alejandro Ruiz Ortiz.</h1>
                <h4 className="description">
                  Disfruta de las Mejores Peliculas Solo Por Hoy Solo En CINECO tu Cine.
                  Donde Encontraras Los Mejores Precios.
                </h4>
                <br />
                <h1>Precios Y Promociones Exclusivas Para Clientes:</h1>
              </Col>
            </Row>
            <Row>
              <Col lg="3" md="6">
                <Card className="card-pricing card-primary">
                  <CardBody>
                    <CardTitle tag="h1">VIP</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-primary.png")}
                    />
                    <ListGroup>
                      <ListGroupItem>300 Peliculas</ListGroupItem>
                      <ListGroupItem>150 Palomitas</ListGroupItem>
                      <ListGroupItem>24/7 Soporte</ListGroupItem>
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        <span>$</span>
                        95
                      </h3>
                      <h5 className="text-on-back">95</h5>
                      <p className="plan">Servicio VIP</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button className="btn-round btn-just-icon" color="primary">
                      Comprar
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6">
                <Card className="card-pricing card-success card-white">
                  <CardBody>
                    <CardTitle tag="h1">PRO</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-success.png")}
                    />
                    <ListGroup>
                      <ListGroupItem>50 Peliculas</ListGroupItem>
                      <ListGroupItem>100 Palomitas</ListGroupItem>
                      <ListGroupItem>24/7 Soporte</ListGroupItem>
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        <span>$</span>
                        57
                      </h3>
                      <h5 className="text-on-back">57</h5>
                      <p className="plan">Servicio Y Plan Pro</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button className="btn-round btn-just-icon" color="success">
                      Comprar
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6">
                <Card className="card-pricing card-warning card-raised card-white">
                  <CardBody>
                    <CardTitle tag="h1">CIN</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-warning.png")}
                    />
                    <ListGroup>
                      <ListGroupItem>200 Peliculas</ListGroupItem>
                      <ListGroupItem>130 Palomitas</ListGroupItem>
                      <ListGroupItem>24/7 Soporte</ListGroupItem>
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        <span>$</span>
                        72
                      </h3>
                      <h5 className="text-on-back">72</h5>
                      <p className="plan">Servicio Y Plan Medio</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button className="btn-round btn-just-icon" color="warning">
                      Comprar
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6">
                <Card className="card-pricing card-danger card-white">
                  <CardBody>
                    <CardTitle tag="h1">Free</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-danger.png")}
                    />
                    <ListGroup>
                      <ListGroupItem>50 Peliculas</ListGroupItem>
                      <ListGroupItem>50 Palomitas</ListGroupItem>
                      <ListGroupItem>No Soporte</ListGroupItem>
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        <span>$</span>0.
                      </h3>
                      <h5 className="text-on-back">0.</h5>
                      <p className="plan">100% Sin Costo</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button className="btn-round btn-just-icon" color="danger">
                      Comprar
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Col className="mt-5" md="12">
              <h3 className="title">Servicio Y Planes</h3>
            </Col>
            <Row>
              <Col md="4">
                <p>
                  Nuestros servicios son de la mas alta calidad en los cines que
                  se encuntran en la ciudad como podras observar en la mayoria de
                  los cines que se encunetran en la competencia no tienen lo que 
                  nosotros ofrecemos por el mejor precio.
                </p>
              </Col>
              <Col className="ml-auto" md="6">
                <div className="progress-container progress-warning">
                  <span className="progress-badge">1000 Peliculas</span>
                  <Progress max="100" value="75" />
                </div>
                <div className="progress-container progress-primary">
                  <span className="progress-badge">150 ALIMENTOS</span>
                  <Progress max="100" value="50" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Index;
