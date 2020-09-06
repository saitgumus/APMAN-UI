import React, { Component } from "react";
import { Label, Input, Card } from "reactstrap";
import { ParameterService } from "../../Services/Core";

export default class ParameterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      paramType: this.props.paramType,
      labelName: this.props.labelName ? this.props.labelName : "parameter name",
    };
  }

  service = new ParameterService();

  componentDidMount() {
    this.service
      .GetParameter(this.state.paramType)
      .then((res) => {
        this.setState({ data: res.valueList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Card>
        <Label for="parameter">{this.state.labelName}</Label>
        <Input type="select" name="params" id="parameter" placeholder="">
          {this.state.data.map((val, indx) => {
            return (
              <option key={indx + "PRM"} value={val.paramCode}>
                {" "}
                {val.paramDescription}{" "}
              </option>
            );
          })}
        </Input>
      </Card>
    );
  }
}
