import React, { Component } from "react";
import { Collapse } from "reactstrap";
import Messages from "../../../Types/Messages";
//import axios from "axios";
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
} from "@material-ui/core";

//import { blockDefinition } from "../../ToolBox/popup-block-definition";

class DefineSiteApartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //site / apartman
      dataContract: {},
      selectedCityId: 1,
      loading: true,
      selectedParamCode: -1,
      blocks: [],
    };
  }

  componentDidUpdate() {
    debugger;
    if (this.props.actionEvent) {
      switch (this.props.actionEvent.key) {
        case CommonTypes.ActionKeys.Save:
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

  //
  async onSubmit() {
    // var apartment = this.state.dataContract;
    // var url = CommonTypes.GetUrlForAPI("core", "saveapartment");
    // await axios.post(url, apartment).then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    // });
  }

  renderForParameter = () => {
    if (parseInt(this.state.selectedParamCode) > 0) {
      if (this.state.selectedParamCode === "1") {
        //site
        return (
          <Collapse isOpen={this.state.selectedParamCode === "1"}>
            <Card>
              <CardContent>
                {/* <blockDefinition></blockDefinition> */}
                <List>
                  {this.props.blockList && this.props.blockList.length > 0 ? (
                    this.props.blockList.map((elm, ind) => {
                      return <ListItem> {elm.code}</ListItem>;
                    })
                  ) : (
                    <ListItem></ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Collapse>
        );
      } else {
        //apartman
        return (
          <Collapse isOpen={this.state.selectedParamCode === "2"}>
            <Card>
              <CardContent>apartman bilgisi eklenecek</CardContent>
            </Card>
          </Collapse>
        );
      }
    } else {
      return <div></div>;
    }
  };

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
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <CityComponent />
              </Grid>
              <Grid item md={4}>
                <CountyComponent />
              </Grid>
              <Grid item md={4}>
                <TextField
                  id="outlined-basic"
                  label={Messages.LabelNames.zipcode}
                  variant="outlined"
                  type="number"
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
              />
            </Grid>
          </Grid>
        </CardContent>
        {/* <Form>
          <Row form>
            <Col>
              <FormGroup>
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
              </FormGroup>
            </Col>
          </Row>
          {this.renderForParameter()}
          <Row form>
            <Col md={5}>
              <FormGroup>
                <CityComponent />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <CountyComponent />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <TextField
                  id="outlined-basic"
                  label={Messages.LabelNames.zipcode}
                  variant="outlined"
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <TextField
              id="outlined-basic"
              label={Messages.LabelNames.address}
              multiline
              rows={5}
              variant="outlined"
            />
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={this.onSubmit()}
          >
            {Messages.ActionNames.save}
          </Button>
        </Form>
      */}
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
