/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import Modal from "_shared/Components/Modal";
import PropTypes from "prop-types";
import uuid4 from "uuid/v4";
import _ from "lodash";

const CODE_IS_REQUIRED = "The code is required";
const DESCRIPTION_IS_REQUIRED = "The description is required";

class CreateNewAnswerCodeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldErrors: {},
      globalErrors: [],
      cofirmEnabled: true,
      Code: null,
      Description: null,
      show: true
    };

    this.newProps = {
      title: "Create new Answer Code",
      onConfirm: this.onConfirm,
      onClose: this.onClose
    };
  }

  onConfirm = () => {
    const { createNewAnswerCode } = this.props;
    this.checkFields()
      .then(() => {
        const answerCodeData = this.getDataFromFields();
        this.setState({ cofirmEnabled: false }, () => {
          createNewAnswerCode(answerCodeData)
            .then(() => this.setState({ show: false }))
            .catch(error => {
              const { globalErrors } = this.state;
              const newGlobalErrors = [...globalErrors, error];
              this.setState({
                globalErrors: newGlobalErrors,
                cofirmEnabled: true
              });
            });
        });
      })
      .catch(() => {});
  };

  onClose = () => {
    this.setState({ show: false });
    const { closedModal } = this.props;
    closedModal();
  };

  createDivClassName = fieldId => {
    let className = "form-group";
    const { fieldErrors } = this.state;
    if (fieldErrors[fieldId] && fieldErrors[fieldId].length > 0)
      className += " has-error";
    return className;
  };

  handleChange = event => {
    const { id, value } = event.currentTarget;
    const newPartialState = { [id]: value };

    newPartialState.fieldErrors = {};
    this.setState(newPartialState);
  };

  createErrorDivs = field => {
    const { fieldErrors } = this.state;
    if (fieldErrors[field] && fieldErrors[field].length > 0) {
      const errorDivs = this.mapArrayToErrorDivs(fieldErrors[field]);
      return (
        <React.Fragment>
          <br /> {errorDivs}
        </React.Fragment>
      );
    }
    return null;
  };

  mapArrayToErrorDivs = array => {
    const divs = array.map(error => {
      const key = uuid4();
      return (
        <span key={key} className="help-block">
          {error}
        </span>
      );
    });
    return divs;
  };

  checkFields = () => {
    const { Code, Description } = this.state;
    let test = true;
    return new Promise((resolve, reject) => {
      this.setState({ fieldErrors: {}, globalErrors: [] }, () => {
        this.checkRequiredField("Code", Code, CODE_IS_REQUIRED)
          .catch(() => {
            test = false;
          })
          .finally(() =>
            this.checkRequiredField(
              "Description",
              Description,
              DESCRIPTION_IS_REQUIRED
            )
          )
          .catch(() => {
            test = false;
          })
          .finally(() => {
            if (test) resolve();
            else reject();
          });
      });
    });
  };

  checkRequiredField = (fieldName, fieldValue, errorMessage) =>
    new Promise((resolve, reject) => {
      const test = fieldValue && fieldValue.trim().length > 0;
      if (!test)
        this.addFieldError(fieldName, errorMessage).finally(() => {
          reject();
        });
      else resolve();
    });

  addFieldError = (field, newError) => {
    const { fieldErrors } = this.state;

    const newFieldErrors = { ...fieldErrors };
    if (!newFieldErrors[field]) newFieldErrors[field] = [];
    newFieldErrors[field].push(newError);
    return this.setState({ fieldErrors: newFieldErrors });
  };

  getDataFromFields = () => {
    const data = _.pick(this.state, ["Code", "Description"]);
    return data;
  };

  createGlobalErrorDivs = () => {
    const { globalErrors } = this.state;
    if (globalErrors.length > 0) {
      const errorDivs = this.mapArrayToErrorDivs(globalErrors);
      return (
        <div className="form-group has-error">
          <div className="col-sm-2" />
          <div className="col-sm-10">{errorDivs}</div>
        </div>
      );
    }
    return null;
  };

  render() {
    const { Code, show, cofirmEnabled, Description } = this.state;
    return (
      show && (
        <Modal cofirmEnabled={cofirmEnabled} {...this.newProps} show>
          <form className="form-horizontal">
            <div className={this.createDivClassName("Code")}>
              <label htmlFor="Code" className="col-sm-2 control-label">
                Code
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="Code"
                  value={Code}
                  onChange={this.handleChange}
                />
                {this.createErrorDivs("Code")}
              </div>
            </div>

            <div className={this.createDivClassName("Description")}>
              <label htmlFor="Description" className="col-sm-2 control-label">
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id="Description"
                  onChange={this.handleChange}
                  style={{ resize: "none" }}
                >
                  {Description}
                </textarea>
                {this.createErrorDivs("Description")}
              </div>
            </div>

            {this.createGlobalErrorDivs()}
          </form>
        </Modal>
      )
    );
  }
}

CreateNewAnswerCodeModal.propTypes = {
  createNewAnswerCode: PropTypes.isRequired,
  closeModal: PropTypes.isRequired
};
export default CreateNewAnswerCodeModal;
