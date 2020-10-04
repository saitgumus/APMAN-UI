import React, { Component } from "react";
import { Collapse } from "reactstrap";
import Messages from "../../../Types/Messages";
import ApartmentContract from "../../../Models/ApartmentContract";
import ParameterComponent from "../../Common/parameter-component";
import { CommonTypes } from "../../../Types/Common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as messageActions from "../../../redux/actions/message-actions";
import * as cityCountyActions from "../../../redux/actions/city-county-actions";
import * as pageActions from "../../../redux/actions/page-actions";
import CityComponent from "../../Common/city-component";
import CountyComponent from "../../Common/county-component";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  Paper,
} from "@material-ui/core";

import { DefineSiteApartmentService } from "../../../Services/DefineSiteApartment";
import BlockDefinition from "../../ToolBox/popup-block-definition";
import { IsNullOrEmpty } from "../../Utils/Helper";

class DefineSiteApartment extends Component {
  dataContract = new ApartmentContract();

  constructor(props) {
    super(props);
    this.state = {
      //site / apartman
      dataContract: new ApartmentContract(),
      selectedCityId: 1,
      loading: true,
      selectedParamCode: -1,
      blocks: [],
    };

    this.renderForParameter = this.renderForParameter.bind(this);
  }

  componentDidUpdate() {
    if (this.props.actionEvent && this.props.actionEvent.key.length > 1) {
      switch (this.props.actionEvent.key) {
        case CommonTypes.ActionKeys.Save:
          if (this.controlDataContract())
            DefineSiteApartmentService(this.dataContract);
          break;

        default:
          break;
      }
    }
  }

  componentDidMount() {
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.defineSiteApartment.resourceCode
      );
    }
  }

  /**
   * render for site or apartment parameter
   */
  renderForParameter = () => {
    if (parseInt(this.state.selectedParamCode) > 0) {
      if (this.state.selectedParamCode === "1") {
        //site
        return (
          <Collapse isOpen={this.state.selectedParamCode === "1"}>
            {this.siteDefinitionCard}
          </Collapse>
        );
      } else {
        //apartman
        return (
          <Collapse isOpen={this.state.selectedParamCode === "2"}>
            {this.apartmentDefinitionCard}
          </Collapse>
        );
      }
    } else {
      return <div></div>;
    }
  };

  /**
   * kaydedilen blokları forma ekler
   */
  getBlockList = () => {
    if (this.props.addedBlocks && this.props.addedBlocks.length > 0) {
      this.dataContract.BlockList = this.props.addedBlocks;
      var lst = this.props.addedBlocks.map((elm, ind) => {
        return <ListItem key={ind}> {elm.Code}</ListItem>;
      });
      return lst;
    }
  };
  /**
   * apartman tanıtım kartı
   */
  apartmentDefinitionCard = (
    <Card>
      <Paper>
        <TextField
          type="string"
          label="Apartman Adı"
          onChange={(e) => {
            this.dataContract.Name = e.target.value;
          }}
        ></TextField>
      </Paper>
    </Card>
  );
  /**
   * site tanıtım kartı
   */
  siteDefinitionCard = (
    <Card>
      <Paper>
        <TextField
          type="string"
          label="Site Adı"
          onChange={(e) => {
            this.dataContract.Name = e.target.value;
          }}
        ></TextField>
        <BlockDefinition></BlockDefinition>
      </Paper>
    </Card>
  );

  /**
   * control for data contract validation
   */
  controlDataContract() {
    if (IsNullOrEmpty(this.dataContract.Name)) {
      this.showDialogMessage("Apartman veya Site ismini giriniz.", true);
      return false;
    }
    if (IsNullOrEmpty(this.dataContract.AddressText)) {
      this.showDialogMessage("Adres alanı boş olamamalıdır.", true);
      return false;
    }
    if (this.dataContract.CityId < 1) {
      this.showDialogMessage("İl bilgisi giriniz.", true);
      return false;
    }
    if (this.dataContract.CountyId < 1) {
      this.showDialogMessage("İlçe bilgisi giriniz.", true);
      return false;
    }
    if (this.dataContract.ZipCode < 1) {
      this.showDialogMessage("Posta Kodu bilgisi giriniz.", true);
      return false;
    }
    return true;
  }

  showDialogMessage(message, isError = false) {
    if (this.props.actions.showMessage) {
      this.props.actions.showMessage(
        message,
        isError ? CommonTypes.MessageTypes.error : CommonTypes.MessageTypes.info
      );
    }
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <ParameterComponent
                  paramType="siteapt"
                  labelName={Messages.LabelNames.recordType}
                  isAllOption={true}
                  onSelectParameter={(val) => {
                    if (val > 0) {
                      this.setState(
                        Object.assign({}, this.state, {
                          selectedParamCode: val,
                        })
                      );
                    }
                  }}
                ></ParameterComponent>
                {this.renderForParameter()}
                <List>{this.getBlockList()}</List>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <CityComponent
                  onSelectedCity={(cityContract) => {
                    this.dataContract.CityId = cityContract.cityId;
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <CountyComponent
                  onSelectedCounty={(contract) => {
                    this.dataContract.CountyId = contract.countyId;
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  id="outlined-basic"
                  label={Messages.LabelNames.zipcode}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    this.dataContract.ZipCode = e.target.value;
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xl={6}>
              <TextField
                id="outlined-basic"
                label={Messages.LabelNames.address}
                multiline
                rows={5}
                variant="outlined"
                onChange={(e) => {
                  this.dataContract.AddressText = e.target.value;
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

//#region  redux metods

function mapStateToProps(state) {
  return {
    cityList: state.cityReducer,
    countyList: state.countyReducer,
    blockList: state.defineBlockReducer,
    actionEvent: state.actionExecuteReducer,
    currentCityId: state.changeSelectedCityReducer,
    addedBlocks: state.defineBlockReducer,
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
      getCityList: bindActionCreators(cityCountyActions.getCityList, dispatch),
      getCountyList: bindActionCreators(
        cityCountyActions.getCountyListAll,
        dispatch
      ),
      changeActiveResourceCode: bindActionCreators(
        pageActions.changeActiveResourceCode,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefineSiteApartment);

//#endregion
