import React from "react";
import Modal from "_shared/Components/Modal";
import PropTypes from "prop-types";

class CreateNewAnswerItemModal extends React.Component {
  state = {
    show: true
  };

  onConfirm = () => {
    this.setState({ show: false });
  };

  onClose = () => {
    this.setState({ show: false });
    const { closedModal } = this.props;
    closedModal();
  };

  render() {
    // const { answerCodeUID } = this.props;
    const { show } = this.state;
    const newPrpps = {
      title: "Create new Answer Item",
      cofirmEnabled: true,
      onConfirm: this.onConfirm,
      onClose: this.onClose
    };

    return (
      show && (
        <Modal {...newPrpps} show={show}>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="name" className="col-sm-2 control-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter a name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="language" className="col-sm-2 control-label">
                Language
              </label>
              <div className="col-sm-10">
                <select id="language" className="form-control">
                  <option value="Language_1">Language 1</option>
                  <option value="Language_2">Language 2</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="channel" className="col-sm-2 control-label">
                Channel
              </label>
              <div className="col-sm-10">
                <select id="channel" className="form-control">
                  <option value="Channel_1">Channel 1</option>
                  <option value="Channel_2">Channel 2</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="text" className="col-sm-2 control-label">
                Text
              </label>
              <div className="col-sm-10">
                <textarea id="text" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-6" style={{ textAlign: "center" }}>
                <input type="checkbox" /> Activated
              </div>
              <div className="col-sm-6" style={{ textAlign: "center" }}>
                <input type="checkbox" /> Default
              </div>
            </div>
          </form>
        </Modal>
      )
    );
  }
}

CreateNewAnswerItemModal.propTypes = {
  closedModal: PropTypes.isRequired,
  answerCodeUID: PropTypes.string.isRequired,
  languages: PropTypes.isRequired,
  channels: PropTypes.isRequired,
  checkDescription: PropTypes.isRequired,
  create: PropTypes.isRequired
};

export default CreateNewAnswerItemModal;
