import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, CardContent, Grid} from "@material-ui/core";
import {bindActionCreators} from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import Action from "../ToolBox/action";
import {CommonTypes} from "../../Types/Common";

import SaveIcon from "@material-ui/icons/Save";

class ActionBar extends Component {
    getIcon = (key) => {
        switch (key) {
            case CommonTypes.ActionKeys.Save:
                return <SaveIcon/>;

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
                            key={index+"apbar"}
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
            <Card>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {this.generateActions()}
                    </Grid>
                </CardContent>
            </Card>
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
