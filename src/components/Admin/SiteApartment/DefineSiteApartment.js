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
import SParameter from "../../Kernel/SParameter";
import Messages from "../../../Types/Messages";
import axios from "axios";

export class DefineSiteApartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //site / apartman
      dataContract: {},
    };
  }

  //
  onSubmit() {
    var user = this.state.dataContract;
    debugger;
    axios
      .post(`https://localhost:23163/api/user/saveuser`, { user })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    return (
      <Card>
        <Form>
          <Row form>
            <Col>
              <FormGroup>
                <Label>{Messages.LabelNames.recordType}</Label>
                <SParameter paramType={"siteapt"} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label for="cmbCity">{Messages.LabelNames.city}</Label>
                <Input type="select" name="city" id="cmbCity" placeholder="">
                  <option value={1}> Adana </option>
                  <option value={2}> Adıyaman </option>
                  <option value={33}> Mersin </option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="cmbCounty">{Messages.LabelNames.county}</Label>
                <Input type="select" name="city" id="cmbCounty" placeholder="">
                  <option value={1}> Erdemli </option>
                  <option value={2}> Mezitli </option>
                  <option value={3}> Silifke </option>
                </Input>
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

export default DefineSiteApartment;
