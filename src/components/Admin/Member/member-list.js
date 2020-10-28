import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataGridComponent from "../../ToolBox/DataGrid";
import { CommonTypes } from "../../../Types/Common";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import * as messageActions from "../../../redux/actions/message-actions";
import * as pageActions from "../../../redux/actions/page-actions";
import {GetApartmentListByManagerUserName} from "../../../Services/MemberDefineService";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";


const style = {
    root:{
        flexGrow:1
    },
    paper:{
        textAlign:'center'
    }
}
class MemberList extends Component {
    
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            criteria :{}
        }
    }


    componentDidMount() {
        
        //#region yöneticisi olunan apartman listesi getirilir.
        //todo: user bilgileri gönderilecek.
        GetApartmentListByManagerUserName("api")
            .then((res) => {
                if (res && res.length > 0) {
                    this.setState({ apartmentList: res });
                }
            })
            .catch((e) => console.log(e));
        //#endregion

        //#region action
        if (this.props.actions.changeActiveResourceCode) {
            this.props.actions.changeActiveResourceCode(
                CommonTypes.Resources.memberList.resourceCode
            );
        }
        if (this.props.actions.executeCommand) {
            this.props.actions.executeCommand(this.onExecute);
        }
        //#endregion
    }

    onExecute = (key) => {
        switch (key) {
            case CommonTypes.ActionKeys.GetList:
                alert("clicked list!");
                break;
            default:
                break;
        }
    };
    
    render() {
        return (
            <div style={style.root}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper>
                            <TextField type={'text'}
                            label={"apartman adı"}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper>
                            <DataGridComponent/>    
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

MemberList.propTypes = {};


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
            changeActiveResourceCode: bindActionCreators(
                pageActions.changeActiveResourceCode,
                dispatch
            ),
            executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
        },
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MemberList);