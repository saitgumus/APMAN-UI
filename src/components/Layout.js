import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import TabIn from "./Begin/TabIn";
import Messages from "../Types/Messages";

export class Layout extends Component {
  static displayName = Layout.name;

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  render() {
    let loginControl = () => {
      if (!this.state.isLogin) {
        return (
          <div>
            <p className={"lead"}>{Messages.PlsLogIn}</p>
            <TabIn />
          </div>
        );
      } else {
        return this.props.children;
      }
    };
    return (
      <div>
        <NavMenu />
        <Container>{loginControl()}</Container>
      </div>
    );
  }
}
