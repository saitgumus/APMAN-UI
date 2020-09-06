import React, { Component } from "react";
import { Container, Jumbotron } from "reactstrap";

export class Home extends Component {
  static displayName = Home.name;

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
