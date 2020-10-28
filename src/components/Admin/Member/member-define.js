import React, {Component} from "react";
//import PropTypes from "prop-types";
import {connect} from "react-redux";
//import Messages from "../../../Types/Messages";
import {CommonTypes} from "../../../Types/Common";
import {bindActionCreators} from "redux";
//import * as messageActions from "../../../redux/actions/message-actions";
//import * as cityCountyActions from "../../../redux/actions/city-county-actions";
import * as pageActions from "../../../redux/actions/page-actions";
//import CityComponent from "../../Common/city-component";
//import CountyComponent from "../../Common/county-component";
import {TextField, Grid, Paper} from "@material-ui/core";
import {GetApartmentListByManagerUserName} from "../../../Services/MemberDefineService";
import ComboBox from "../../ToolBox/combo-box";
import * as messageActions from "../../../redux/actions/message-actions";

const style = {
    root: {
        flexGrow: 1,
        margin: 10,
    },
};

class MemberDefine extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            apartmentList: [],
        };
        this.dataContract = {
            Name: "",
            Surname: "",
            Apartment: {},
            Mail: "",
            Floor: -1,
            DoorNumber: -1,
        };
    }

    //#region life cycle

    componentDidMount() {
        debugger;
        this.props.actions.changeBackdropStatus(true);

        //#region yöneticisi olunan apartman listesi getirilir.
        //todo: user bilgileri gönderilecek.
        GetApartmentListByManagerUserName()
            .then((res) => {
                if (res && res.length > 0) {
                    this.setState({apartmentList: res});
                }
            })
            .catch((e) => console.log(e)).finally(()=>{
            this.props.actions.changeBackdropStatus(false);
        })
        //#endregion

        //#region action
        if (this.props.actions.changeActiveResourceCode) {
            this.props.actions.changeActiveResourceCode(
                CommonTypes.Resources.defineMember.resourceCode
            );
        }
        if (this.props.actions.executeCommand) {
            this.props.actions.executeCommand(this.onExecute);
        }
        //#endregion
    }

    //#endregion

    onExecute = (key) => {
        switch (key) {
            case CommonTypes.ActionKeys.Save:
                alert("clicked!");
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div style={style.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Paper elevation={0}>
                            <ComboBox
                                label={"Apartman"}
                                onSelectedItemChange={(item) => {
                                    this.setState({
                                        selectedApartment: item,
                                    });
                                }}
                                itemSource={this.state.apartmentList}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0}>
                            <TextField
                                label="Ad"
                                fullWidth
                                onChange={(e) => {
                                    this.dataContract.Name = e.target.value;
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0}>
                            <TextField
                                label="Soyad"
                                fullWidth
                                onChange={(e) => {
                                    this.dataContract.Surname = e.target.value;
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0}>
                            <TextField
                                label="Mail"
                                type={"email"}
                                fullWidth
                                onChange={(e) => {
                                    this.dataContract.Mail = e.target.value;
                                }}
                                autoComplete={"username"}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0}>
                            <TextField
                                label="Kat"
                                type="number"
                                fullWidth
                                onChange={(e) => {
                                    this.dataContract.Floor = e.target.value;
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0}>
                            <TextField
                                label="Daire"
                                type="number"
                                fullWidth
                                onChange={(e) => {
                                    this.dataContract.DoorNumber = e.target.value;
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

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
            changeActiveResourceCode: bindActionCreators(
                pageActions.changeActiveResourceCode,
                dispatch
            ),
            executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDefine);
