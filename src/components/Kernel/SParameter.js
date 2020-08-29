// import Parameter from "../../Models/Parameter";
//
// export class SParameter {
//
//     static GetParameter(paramType){

// }
import React, { Component } from "react";
import { Input } from "reactstrap";
import { ParameterService } from "../../Services/Core";

class SParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramType: props.paramType,
    };
  }

  getParameterValues() {
    return ParameterService.getParameter(this.state.paramType);
  }

  render() {
    let data = this.getParameterValues();

    return (
      <div>
        <Input type="select">
          {data.map((e, key) => {
            return (
              <option key={key} value={e.ParamCode}>
                {e.ParamDescription}
              </option>
            );
          })}
        </Input>
      </div>
    );
  }
}

export default SParameter;
