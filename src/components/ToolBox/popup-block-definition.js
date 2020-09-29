import React, { Component } from "react";
import { connect } from "react-redux";
import * as messageActions from "../../redux/actions/message-actions";
import * as apartmentActions from "../../redux/actions/apertment-actions";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import Messages from "../../Types/Messages";
import { bindActionCreators } from "redux";

export class blockDefinition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      blockList: [],
    };
  }

  toggle = () => this.setState({ modal: !this.state.modal });
  inpRef = Input;

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {Messages.Titles.defineBlock}
          </ModalHeader>
          <ModalBody>
            <Label for="blokName"> {Messages.LabelNames.blockName}</Label>
            <Input
              ref={(r) => (this.inpRef = r)}
              type="text"
              id="blokName"
              maxLength="2"
              onChange={(e) => {
                var lst = this.state.blockList;
                lst.push({ code: e.target.value });
                this.setState({ blockList: lst });
                var r = this.inpRef;
                debugger;
              }}
            ></Input>
            <Button
              color="primary"
              onClick={(e) => {
                this.props.actions.addBlock(this.state.blockList);
                this.setState({ modal: false });
              }}
            >
              {Messages.ActionNames.add}
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={(e) => {
                this.props.actions.addBlock(this.state.blockList);
              }}
            >
              {Messages.ActionNames.save}
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      showMessage: bindActionCreators(
        messageActions.showStatusMessage,
        dispatch
      ),
      addBlock: bindActionCreators(apartmentActions.saveBlock, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(blockDefinition);
