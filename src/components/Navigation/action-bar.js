import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import Action from "../ToolBox/action";
import {CommonTypes} from "../../Types/Common";

import SaveIcon from "@material-ui/icons/Save";
import ListIcon from '@material-ui/icons/List';
import CreateIcon from '@material-ui/icons/Create'; //düzenle
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'; //kapat
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class ActionBar extends Component {
    getIcon = (key) => {
        switch (key) {
            case CommonTypes.ActionKeys.Save:
                return <SaveIcon/>;
            case CommonTypes.ActionKeys.GetList:
                return <ListIcon/>
            case CommonTypes.ActionKeys.Clean:
                return <InsertDriveFileIcon/>
            case CommonTypes.ActionKeys.Edit:
                return <CreateIcon/>
            case CommonTypes.ActionKeys.Close:
                return <PowerSettingsNewIcon/>
            default:
                break;
        }
    };

    static executeCommand(key) {
        alert("no event. key:" + key);
        return;
    }

    generateActions = () => {
        if (
            this.props.actionListInfo &&
            this.props.actionListInfo.actionKeyList &&
            this.props.actionListInfo.actionKeyList.length > 0
        ) {
            let rtnObj = this.props.actionListInfo.actionKeyList.map(
                (value, index) => {
                    return (
                        <Action
                            key={index + "apbar"}
                            ActionKey={value}
                            Icon={this.getIcon(value)}
                            ResourceCode={this.props.actionListInfo.resourceCode}
                            executeCommand
                            onExecuteCommand={ActionBar.executeCommand}
                        />
                    );
                }
            );

            return rtnObj;
        }
    };

    render() {
        return (
           <div>
               {this.generateActions()}
           </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        actionListInfo: state.actionListReducer,
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
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
