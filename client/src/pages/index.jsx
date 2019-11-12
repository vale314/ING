
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
                <video autoPlay loop muted>
                  <source type="video/mp4" src="https://r8---sn-0opoxu-jtfz.googlevideo.com/videoplayback?expire=1573551487&ei=HinKXcXIOYLyNqrSvdAE&ip=185.33.85.197&id=o-APy1kbspObANpH9PoTjzVDzW5x85qrPFJOLeCsmL_WiE&itag=399&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&mime=video%2Fmp4&gir=yes&clen=25266514&dur=144.143&lmt=1570837543229984&fvip=5&keepalive=yes&fexp=23842630&c=WEB&txp=3531432&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=ALgxI2wwRQIgEsR14cXeo2AWjnpJJS9YlSeOsZm1YultuUTe7W4-jAkCIQDX_k9kzGPRYvx8fhyCH8RuCL22f_wyJTCAXcf33QGoIA%3D%3D&ratebypass=yes&title=JOKER%20-%20Final%20Trailer%20-%20Now%20Playing%20In%20Theaters&cms_redirect=yes&mip=2806:102e:1c:50c1:d83:5f78:221a:6ce3&mm=31&mn=sn-0opoxu-jtfz&ms=au&mt=1573530310&mv=m&mvi=7&pl=48&usequic=no&lsparams=mip,mm,mn,ms,mv,mvi,pl,usequic&lsig=AHylml4wRgIhAPt1ExGwD6fUr9RZsT7R2kfIIXGncJIx5-3NzCB-cZuNAiEA2ym28fdcl9rZbkv7cyIjiI_1gNJ6Eb3nGteNJBXdmus=" />
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
