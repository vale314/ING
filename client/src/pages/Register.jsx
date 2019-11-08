import React from "react";
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { withRouter } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{        
        name: '',
        email: '',
        phone:'',
        password: '',
        password2: ''
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle("sign-up-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("sign-up-page");
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    
    if (nextProps.isAuthenticated){
      this.props.history.push('/user');
    }
  }

  onSubmit = e => {
    const { name, email, phone, password, password2 } = this.state.user;

    e.preventDefault();
    if (name === '' || email === '' || password === '' || phone === '') {
      console.log('Please enter all fields', 'danger');
    } else if (password !== password2) {
      console.log('Passwords do not match', 'danger');
    } else {
        this.props.register(this.state.user);
    }
  };

  onChange(e){
    const user = this.state.user;
    const name = e.target.name;
    user[name] = e.target.value;

    this.setState({
      user
    })

  }
  render() {
    return (
      <>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  <div className="icon icon-warning">
                    <i className="tim-icons icon-wifi" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Marketing</h3>
                    <p className="description">
                      We've created the marketing campaign of the website. It
                      was a very interesting collaboration.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-triangle-right-17" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Fully Coded in HTML5</h3>
                    <p className="description">
                      We've developed the website with HTML5 and CSS3. The
                      client has access to the code using GitHub.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="tim-icons icon-trophy" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Built Audience</h3>
                    <p className="description">
                      There is also a Fully Customizable CMS Admin Dashboard for
                      this product.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="7">
                <Card className="card-register card-white">
                  <CardHeader>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h4">Register</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form className="form" onSubmit={this.onSubmit} href="#">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Full Name" type="name" name="name" value={this.state.user.name} onChange={this.onChange} required />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" name="email" value={this.state.user.email} onChange={this.onChange} required />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Telefono" type="number" name="phone" value={this.state.user.phone} onChange={this.onChange} required 
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" name="password" value={this.state.user.password} onChange={this.onChange} required />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" name="password2" value={this.state.user.password2} onChange={this.onChange} required />
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />I agree to the{" "}
                          <a href="/" onClick={e => e.preventDefault()}>
                            terms and conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-round"
                      color="primary"
                      onClick={this.onSubmit}
                      href="#"
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(withRouter(SignUp));
