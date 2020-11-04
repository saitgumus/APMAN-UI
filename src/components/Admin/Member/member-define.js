import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonTypes } from "../../../Types/Common";
import { bindActionCreators } from "redux";
import * as pageActions from "../../../redux/actions/page-actions";
import { TextField, Grid, Paper } from "@material-ui/core";
import {
  GetApartmentListByManagerUserName,
  SaveNewMember,
} from "../../../Services/MemberDefineService";
import ComboBox from "../../ToolBox/combo-box";
import * as messageActions from "../../../redux/actions/message-actions";
import { MemberUserContract } from "../../../Models/MemberUserContract";
import { StringBuilder } from "../../../Core/Helper";
import { Response, Severity } from "../../../Core/Response";

const style = {
  root: {
    flexGrow: 1,
    margin: 10,
    backgroundColor: "white",
  },
};

class MemberDefine extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      apartmentList: [],
      isMailValid: undefined,
    };
    this.dataContract = new MemberUserContract();
  }

  //#region life cycle

  componentDidMount() {
    this.props.actions.changeBackdropStatus(true);

    //#region yöneticisi olunan apartman listesi getirilir.

    GetApartmentListByManagerUserName()
      .then((res) => {
        if (res && res.length > 0) {
          this.setState({ apartmentList: res });
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        this.props.actions.changeBackdropStatus(false);
      });

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
        let validateResponse = this.isValidContract(this.dataContract);
        if (validateResponse.success) {
          this.props.actions.changeBackdropStatus(true);
          SaveNewMember(this.dataContract)
            .then((res) => {
              if (res.status === 201) {
                this.props.actions.showMessage(
                  "yeni üye eklendi.",
                  CommonTypes.MessageTypes.success
                );
              }
            })
            .catch((e) => console.log(e))
            .finally(() => {
              this.props.actions.changeBackdropStatus(false);
            });
        } else {
          let message = validateResponse.getResultsStringFormat();
          this.props.actions.showMessage(
            message,
            CommonTypes.MessageTypes.error
          );
        }
        break;

      case CommonTypes.ActionKeys.Clean:
        this.dataContract = new MemberUserContract();

        break;
      default:
        break;
    }
  };

  isValidContract(contract) {
    let strbuilder = new StringBuilder();

    if (!contract.firstName || contract.firstName.length < 1) {
      strbuilder.appendLine("üye adı girilmesi zorunludur..");
    }
    if (!contract.lastName || contract.lastName.length < 1) {
      strbuilder.appendLine("üye soyadı girilmesi zorunludur.");
    }
    if (!contract.email || contract.email.length < 1) {
      strbuilder.appendLine("email girilmesi zorunludur.");
    }
    if (
      !contract.floorNumber ||
      contract.floorNumber < 1 ||
      !contract.doorNumber ||
      contract.doorNumber < 1
    ) {
      strbuilder.appendLine("kat ve daire numarası girilmesi zorunludur.");
    }

    let response = new Response();
    if (strbuilder.toString().length > 1) {
      response.addResult(strbuilder.toString(), Severity.Low);
      return response;
    } else {
      response.value = 1;
      return response;
    }
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = this.state.isMailValid;
    isValid = !emailRex.test(e.target.value);
    this.setState({ isMailValid: isValid });
  }

  render() {
    return (
      <div style={style.root} className={"apman-layout-root"}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper elevation={0}>
              <ComboBox
                label={"Apartman"}
                onSelectedItemChange={(item) => {
                  //                   addressId: 8
                  // addressText: null
                  // apartmentId: 5
                  // apartmentManagerId: 1
                  // blockList: null
                  // cityId: 0
                  // countyId: 0
                  // managerUserName: null
                  // name: "postmanTest"
                  // zipCode: null
                  // __proto__: Object
                  console.log("selected apartmentId:", item.apartmentId);
                  this.dataContract.apartmentId = item.apartmentId;
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
                  this.dataContract.firstName = e.target.value;
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
                  this.dataContract.lastName = e.target.value;
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
                error={this.state.isMailValid}
                onChange={(e) => {
                  this.dataContract.email = e.target.value;
                }}
                onBlur={(e) => {
                  this.validateEmail(e);
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
                  let flrNumber = parseInt(e.target.value);
                  this.dataContract.floorNumber = flrNumber;
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
                  let doorn = parseInt(e.target.value);
                  this.dataContract.doorNumber = doorn;
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
      changeBackdropStatus: bindActionCreators(
        pageActions.changeBackDropStatus,
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

export default connect(mapStateToProps, mapDispatchToProps)(MemberDefine);
