import React, {Component} from "react";
import {
    Container,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
    FormText,
    Row,
} from "reactstrap";
import User from "../../Models/User";
import Messages from "../../Types/Messages";
import {CommonTypes} from "../../Types/Common";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as registerActions from "../../redux/actions/register-actions";
import * as messageActions from "../../redux/actions/message-actions";
import * as pageActions from "../../redux/actions/page-actions"
import {AppmanCommon} from "../Common/Constants";

class SignIn extends Component {
    userContract = new User();

    constructor(props) {
        super(props);
        this.state = {
            emailState: "",
            dataContract: new User(),
            validate: {
                emailState: "",
            },
            hasAlert: false,
            messageType: CommonTypes.MessageTypes.info,
            alertMessage: "",
        };
    }

    componentDidMount() {
        // if(this.props.actions.showMessage){
        //     this.props.actions.showMessage("test mesajı",CommonTypes.MessageTypes.success);
        // }
    }
    
    //#region metods

    submitForm() {
        if (this.validateContract(this.state.dataContract) && this.props.actions.register) {
            this.props.actions.changeBackdropStatus(true);
            this.props.actions.register(this.state.dataContract);
        }
    }

    //#region validating
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

    /**
     * validating user values
     * @param {User} contract
     */
    validateContract(contract) {
        if (contract.FirstName && contract.FirstName.length < 1) {
            return false;
        }
        if (contract.LastName && contract.LastName.length < 1) {
            return false;
        }
        if (contract.Email && contract.Email.length < 1) {
            return false;
        }
        if (contract.Password && contract.Password.length < 1) {
            return false;
        }
        return true;
    }

    //#endregion

    //#endregion

    render() {
        return (
            <div>
                <Container className="App">
                    <Form className="form">
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>{Messages.LabelNames.name}</Label>
                                    <Input
                                        type="text"
                                        name="firstname"
                                        id="userFirstName"
                                        onChange={(e) => {
                                            // eslint-disable-next-line
                                            this.state.dataContract.firstName = e.target.value;
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>{Messages.LabelNames.surname}</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        id="userLastName"
                                        onChange={(e) => {
                                            // eslint-disable-next-line
                                            this.state.dataContract.lastName = e.target.value;
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="userSignEmail">{Messages.LabelNames.email}</Label>
                                    <Input
                                        valid={this.state.validate.emailState === "has-success"}
                                        invalid={this.state.validate.emailState === "has-danger"}
                                        type="email"
                                        name="email"
                                        id="userSignEmail"
                                        placeholder=""
                                        onChange={(e) => {
                                            // eslint-disable-next-line
                                            this.state.dataContract.email = e.target.value;
                                        }}
                                        onBlur={(e) => this.validateEmail(e)}
                                    />
                                    <FormFeedback valid={true}>
                                        {" "}
                                        {Messages.EMailValid}
                                    </FormFeedback>
                                    <FormFeedback invalid={"true"}>
                                        {Messages.EMailInvalid}
                                    </FormFeedback>
                                    <FormText> {Messages.EMailInputFormText}</FormText>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="userPassword">
                                        {Messages.LabelNames.password}
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="userPassword"
                                        placeholder=""
                                        onChange={(e) => {
                                            // eslint-disable-next-line
                                            this.state.dataContract.password = e.target.value;
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button
                            color={"primary"}
                            onClick={(e) => {
                                AppmanCommon.isBackDrop = !AppmanCommon.isBackDrop
                                this.submitForm();
                            }}
                        >
                            {Messages.ActionNames.save}
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
       // registeredUser: state.registerReducer,
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
            changeBackdropStatus:bindActionCreators(pageActions.changeBackDropStatus,dispatch),
            register: bindActionCreators(registerActions.registerUser, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
