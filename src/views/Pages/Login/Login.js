import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {connect} from 'react-redux';

import {
  changeValueUser
} from '../../../redux/actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login       = this.login.bind(this);
    this.changeField = this.changeField.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.signInWithEmailAndPassword(this.props.userLogin.email, this.props.userLogin.password);
  }

  changeField(e) {
    this.props.dispatch(changeValueUser({[e.target.name]: e.target.value}));
  }

  render() {
    const {
      user,
      error,
      userLogin
    } = this.props;

    if(!user) {
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={this.login}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        {error && 
                          <div className="alert alert-danger fade show">
                            {error}
                          </div>
                        }
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" value={userLogin.email} name="email" onChange={this.changeField} placeholder="Username" autoComplete="username" />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i> 
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" value={userLogin.password} name="password" onChange={this.changeField} placeholder="Password" autoComplete="current-password" />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button color="primary" type="submit" className="px-4">Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.</p>
                        <Link to="/register">
                          <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card> */}
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return <Redirect to='/' />;
  }
}

const mapStatetoProps = state => ({
  userLogin: state.userInit
});

export default connect(mapStatetoProps)(Login);
