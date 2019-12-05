
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
                  <source type="video/mp4" src="https://cineco.herokuapp.com/video" />
                </video>
            </div>

            </div>
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <h1 className="title">Picke the best plan for you</h1>
                <h4 className="description">
                  You have Free Unlimited Updates and Premium Support on each
                  package.
                </h4>
              </Col>
            </Row>
            <Row>
              <Col lg="3" md="6">
                <Card className="card-pricing card-primary">
                  <CardBody>
                    <CardTitle tag="h1">pro</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-primary.png")}
                    />
                    <ListGroup>
                      <ListGroupItem>300 messages</ListGroupItem>
                      <ListGroupItem>150 emails</ListGroupItem>
                      <ListGroupItem>24/7 Support</ListGroupItem>
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        <span>$</span>
                        95
                      </h3>
                      <h5 className="text-on-back">95</h5>
                      <p className="plan">Professional plan</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button className="btn-round btn-just-icon" color="primary">
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6">
                <Card className="card-pricing card-success card-white">
                  <CardBody>
                    <CardTitle tag="h1">basic</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-success.png")}
                    />
                    <ListGroup>
                      <ListGroupItem>50 messages</ListGroupItem>
                      <ListGroupItem>100 emails</ListGroupItem>
                      <ListGroupItem>24/7 Support</ListGroupItem>
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        <span>$</span>
                        57
                      </h3>
                      <h5 className="text-on-back">57</h5>
                      <p className="plan">Basic plan</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button className="btn-round btn-just-icon" color="success">
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6">
                <Card className="card-pricing card-warning card-raised card-white">
                  <CardBody>
                    <CardTitle tag="h1">mid</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-warning.png")}
                    />
                    <ListGroup>
                      <ListGroupItem>200 messages</ListGroupItem>
                      <ListGroupItem>130 emails</ListGroupItem>
                      <ListGroupItem>24/7 Support</ListGroupItem>
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        <span>$</span>
                        72
                      </h3>
                      <h5 className="text-on-back">72</h5>
                      <p className="plan">Medium plan</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button className="btn-round btn-just-icon" color="warning">
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="3" md="6">
                <Card className="card-pricing card-danger card-white">
                  <CardBody>
                    <CardTitle tag="h1">trial</CardTitle>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-danger.png")}
                    />
                    <ListGroup>
                      <ListGroupItem>50 messages</ListGroupItem>
                      <ListGroupItem>50 emails</ListGroupItem>
                      <ListGroupItem>No Support</ListGroupItem>
                    </ListGroup>
                    <div className="card-prices">
                      <h3 className="text-on-front">
                        <span>$</span>9
                      </h3>
                      <h5 className="text-on-back">9</h5>
                      <p className="plan">Trial plan</p>
                    </div>
                  </CardBody>
                  <CardFooter className="text-center mb-3 mt-3">
                    <Button className="btn-round btn-just-icon" color="danger">
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Col className="mt-5" md="12">
              <h3 className="title">Professional Plan</h3>
            </Col>
            <Row>
              <Col md="4">
                <p>
                  Premium pricing is the strategy of consistently pricing at, or
                  near, the high end of the possible price range to help attract
                  status-conscious consumers. The high pricing of a premium
                  product ...
                </p>
              </Col>
              <Col className="ml-auto" md="6">
                <div className="progress-container progress-warning">
                  <span className="progress-badge">500GB</span>
                  <Progress max="100" value="75" />
                </div>
                <div className="progress-container progress-primary">
                  <span className="progress-badge">4 years</span>
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
