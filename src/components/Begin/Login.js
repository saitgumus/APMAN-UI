import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import User from "../../Models/User";
import Messages from "../../Types/Messages";
import { connect } from "react-redux";

class Login extends Component {
  loginUserContract = new User();

  constructor(props) {
    super(props);
    this.state = {
      dataContract: {
        Email: "",
        Password: "",
      },
      validate: {
        emailState: "",
      },
    };
  }

  componentDidMount() {}

  onSubmit() {
    this.setState(
      Object.assign({}, this.state, { dataContract: this.loginUserContract })
    );
    //TODO: send to backend
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  render() {
    return (
      <div>
        <Container className="App">
          <div>
            <h1>{this.props.userContract.name}</h1>
          </div>
          <Form className="form">
            <Col>
              <FormGroup>
                <Label>{Messages.LabelNames.email}</Label>
                <Input
                  valid={this.state.validate.emailState === "has-success"}
                  invalid={this.state.validate.emailState === "has-danger"}
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder=""
                  onChange={(e) => {
                    this.loginUserContract.Email = e.target.value;
                  }}
                  onBlur={(e) => this.validateEmail(e)}
                />
                <FormFeedback valid={true}> {Messages.EMailValid}</FormFeedback>
                <FormFeedback invalid="true">
                  {Messages.EMailInvalid}
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="userLoginPassword">
                  {Messages.LabelNames.password}
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="userLoginPassword"
                  placeholder=""
                  onChange={(e) => {
                    this.loginUserContract.Password = e.target.value;
                  }}
                />
              </FormGroup>
            </Col>
            <Button color={"primary"}>{Messages.ActionNames.enter}</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userContract: state.loginReducer,
  };
}

export default connect(mapStateToProps)(Login);
