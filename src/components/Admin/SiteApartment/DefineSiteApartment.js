import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
} from "reactstrap";
import Messages from "../../../Types/Messages";
//import axios from "axios";
import ParameterComponent from "../../Common/parameter-component";
//import { CommonTypes } from "../../../Types/Common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as messageActions from "../../../redux/actions/message-actions";
import * as cityCountyActions from "../../../redux/actions/city-county-actions";
import CityComponent from "../../Common/city-component";
import CountyComponent from "../../Common/county-component";

class DefineSiteApartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //site / apartman
      dataContract: {},
      selectedCityId: 1,
      loading: true,
    };
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

  componentDidMount() {}

  render() {
    return (
      <Card>
        <Form>
          <Row form>
            <Col>
              <FormGroup>
                <ParameterComponent
                  paramType="siteapt"
                  labelName={Messages.LabelNames.recordType}
                ></ParameterComponent>
              </FormGroup>
            </Col>
          </Row>
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
                <Label for="zipcode">{Messages.LabelNames.zipcode}</Label>
                <Input type="number" name="zip" id="zipcode" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="addressText">{Messages.LabelNames.address}</Label>
            <Input type="text" name="address" id="addressText" placeholder="" />
          </FormGroup>
          <Button color={"primary"} onClick={this.onSubmit()}>
            {Messages.ActionNames.save}
          </Button>
        </Form>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    cityList: state.cityReducer,
    countyList: state.countyReducer,
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
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefineSiteApartment);
