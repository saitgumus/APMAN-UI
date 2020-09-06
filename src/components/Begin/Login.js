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
import { bindActionCreators } from "redux";
import * as cityActions from "../../redux/actions/city-county-actions";
import * as loginActions from "../../redux/actions/login-actions";
import ShowMessage from "../ShowMessage";
import { CommonTypes } from "../../Types/Common";

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

  componentDidMount() {
    //todo: kaldırılacak
    this.props.actions.getCityList();
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
    let isLogin = () => {
      var jwtObj = this.props.userContract;
      if (jwtObj.token && jwtObj.token.length > 1) {
        if (jwtObj.token === "null") {
          this.props.actions.changeLoginStatus({
            token: jwtObj.token,
            expiration: jwtObj.expiration,
            isSuccess: false,
          });

          return (
            <ShowMessage
              Message={Messages.Errors.InvalidMailOrUser}
              MessageType={CommonTypes.MessageTypes.error}
            />
          );
        }

        this.props.actions.changeLoginStatus({
          token: jwtObj.token,
          expiration: jwtObj.expiration,
          isSuccess: true,
        });
        return (
          <ShowMessage
            Message={Messages.Information.Success}
            MessageType={CommonTypes.MessageTypes.success}
          />
        );
      } else {
        return <p></p>;
      }
    };
    return (
      <div>
        <Container className="App">
          {/* <div>
            <h1>{this.props.userContract.name}</h1>
            <p>eleman sayısı: {this.props.cityList.length}</p>
            <ParameterComponent paramType={"yesno"} labelName="yes miii" />
          </div> */}
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
            <Button
              color={"primary"}
              onClick={(e) => {
                this.props.actions.loginUser(this.loginUserContract);
              }}
            >
              {Messages.ActionNames.enter}
            </Button>
          </Form>
          {isLogin()}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userContract: state.loginReducer,
    cityList: state.cityReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCityList: bindActionCreators(cityActions.getCityList, dispatch),
      loginUser: bindActionCreators(loginActions.Login, dispatch),
      changeLoginStatus: bindActionCreators(
        loginActions.ChangeLoginStatus,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
