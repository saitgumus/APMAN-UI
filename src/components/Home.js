import React, { Component } from "react";
import { Container, Jumbotron } from "reactstrap";
import { CommonTypes } from "../Types/Common";
import * as pageActions from "../redux/actions/page-actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Home extends Component {
  static displayName = Home.name;

  componentDidMount() {
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.home.resourceCode
      );
    }
  }
  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Merhaba</h1>
            <p className="lead">Site yönetim uygulamasına hoş geldin...</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeActiveResourceCode: bindActionCreators(
        pageActions.changeActiveResourceCode,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
