import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import TabIn from "./Begin/TabIn";
import Messages from "../Types/Messages";
import { connect } from "react-redux";

class Layout extends Component {
  static displayName = Layout.name;

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  render() {
    let loginControl = () => {
      if (this.props.loginJwtObject && this.props.loginJwtObject.isSuccess) {
        return this.props.children;
      } else {
        return (
          <div>
            <p className={"lead"}>{Messages.PlsLogIn}</p>
            <TabIn />
          </div>
        );
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

function mapStateToProps(state) {
  return {
    loginJwtObject: state.changeLoginStatusReducer,
  };
}

export default connect(mapStateToProps)(Layout);
