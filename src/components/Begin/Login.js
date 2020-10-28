import React, {Component} from "react";
import {
    Container,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback
} from "reactstrap";
import User from "../../Models/User";
import Messages from "../../Types/Messages";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as cityActions from "../../redux/actions/city-county-actions";
import * as loginActions from "../../redux/actions/login-actions";
import {CommonTypes} from "../../Types/Common";
import GoogleLoginComponent from "./google/google-login";
import * as messageActions from "../../redux/actions/message-actions";

/*
* Login component (giriş yap)
* */
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
        this.props.actions.changeLoginStatus({
            token: "",
            expiration: new Date(),
            isSuccess: false,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {validate} = this.state;
        if (emailRex.test(e.target.value)) {
            validate.emailState = "has-success";
        } else {
            validate.emailState = "has-danger";
        }
        this.setState({validate});
    }

    isLogin = () => {
        let user = this.props.userContract;
        if (user.token && user.token.length > 1) {
            let lclUser = window.localStorage.getItem("user");
            if(lclUser || lclUser.token){
            this.props.actions.changeLoginStatus({
                token: user.token,
                expiration: user.expiration,
                isSuccess: true,
            });
            this.props.actions.showMessage("giriş başarılı..",CommonTypes.MessageTypes.success);
            }
        } else {
            debugger;
            this.props.actions.showMessage("giriş başarısız..",CommonTypes.MessageTypes.success);
        }
    };

    render() {
        return (
            <div>
                <Container className="App">
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
                                        this.loginUserContract.email = e.target.value;
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
                                        this.loginUserContract.password = e.target.value;
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
                    <hr/>
                    <GoogleLoginComponent/>
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

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            /**
             * showStatusMessage(message, type)
             */
            showMessage: bindActionCreators(
                messageActions.showStatusMessage,
                dispatch
            ),
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
