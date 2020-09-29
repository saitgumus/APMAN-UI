import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import { ParameterService } from "../../Services/Core";

export default class ParameterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      paramType: this.props.paramType,
      labelName: this.props.labelName ? this.props.labelName : "parameter name",
      isAllOption: this.props.isAllOption,
      selectedParamCode: -1,
    };
  }

  service = new ParameterService();

  onChange = this.props.onSelectParameter;

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
      <div>
        {/* <Label for="parameter">{this.state.labelName}</Label>
        <Input
          type="select"
          name="params"
          id="parameter"
          placeholder=""
          onChange={(e) => {
            debugger;
            if (this.props.onSelectParameter) {
              this.props.onSelectParameter(e.target.value);
            }
          }}
        >
          {this.state.isAllOption ? (
            <option key="allOptn" value="-1">
              Seçiniz
            </option>
          ) : (
            <option></option>
          )}
          {this.state.data.map((val, indx) => {
            return (
              <option key={indx + "PRM"} value={val.paramCode}>
                {" "}
                {val.paramDescription}{" "}
              </option>
            );
          })}
        </Input>
        */}
        <Autocomplete
          id="combo-box-demo"
          options={this.state.data}
          getOptionLabel={(option) => option.paramDescription}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={this.state.labelName}
              variant="outlined"
            />
          )}
          onChange={(e, value, reason) => {
            //value : parameterContract
            debugger;
            if (this.props.onSelectParameter) {
              this.props.onSelectParameter(value.paramCode);
            }
          }}
        />
      </div>
    );
  }
}
