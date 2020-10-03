import React, { useState } from "react";
//import { Container } from "reactstrap";
//import { NavMenu } from "./NavMenu";
import TabIn from "./Begin/TabIn";
import Messages from "../Types/Messages";
import { connect } from "react-redux";
import AppBarMenu from "./Navigation/app-bar";
import { Backdrop, CircularProgress, Container } from "@material-ui/core";
import ActionBar from "./Navigation/action-bar";

function Layout(props) {
  // eslint-disable-next-line
  const [openMenu, setOpenMenu] = useState(false);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLogin: false,
  //     openMenu: false,
  //   };
  // }

  //render() {
  //eslint-disable-next-line
  let loginControl = () => {
    if (props.loginJwtObject && props.loginJwtObject.isSuccess) {
      return props.children;
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
      <Backdrop
        open={false}
        onClick={(e) => {
          //setBackdrop(!backdrop);
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBarMenu>
        <Container maxWidth="xl">
          <ActionBar></ActionBar>
          {loginControl()}
        </Container>
      </AppBarMenu>
    </div>
  );
}
//}

function mapStateToProps(state) {
  return {
    loginJwtObject: state.changeLoginStatusReducer,
  };
}

export default connect(mapStateToProps)(Layout);
