import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

class ModalComponent extends React.Component {
  closeHandler = () => {
    const { onClose } = this.props;
    if (onClose) onClose();
  };

  render() {
    const { title, children, cofirmEnabled, onConfirm } = this.props;

    return (
      <Modal show onHide={this.closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onConfirm}
            disabled={!cofirmEnabled}
            className="btn btn-turquoise"
          >
            Confirm
          </Button>
          <Button onClick={this.closeHandler} className="btn btn-danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  cofirmEnabled: PropTypes.bool.isRequired,
  onConfirm: PropTypes.isRequired,
  onClose: PropTypes.isRequired
};
export default ModalComponent;
