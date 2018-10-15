/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import PropTypes from "prop-types";
import { dataFields } from "_home/Components/AnswerVariablesTable";
import Modal from "_shared/Components/Modal";
import _ from "lodash";
import uuid4 from "uuid/v4";

const createRequiredFieldError = field =>
  `The ${field.replace("_", "")} is required`;

class ManageAnswerVariable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      show: true,
      fieldErrors: {},
      globalErrors: []
    };

    this.newProps = {
      title: props.title,
      onConfirm: this.onConfirm,
      onClose: this.onClose
    };
  }

  onConfirm = () => {
    const { operation } = this.props;
    this.checkFields().then(() => {
      const answerVariableData = this.getDataFromFields();
      operation(answerVariableData)
        .then(() => {
          this.setState({ show: false });
        })
        .catch(error => {
          const { globalErrors } = this.state;
          const newGlobalErrors = [...globalErrors, error];
          this.setState({
            globalErrors: newGlobalErrors
          });
        });
    });
  };

  onClose = () => {
    this.setState({ show: false });
    const { closedModal } = this.props;
    closedModal();
  };

  checkFields = () =>
    new Promise((resolve, reject) => {
      const { state } = this;
      this.setState({ fieldErrors: {}, globalErrors: [] }, () => {
        const promises = dataFields.map(field => {
          if (field !== "Activated") {
            return this.checkRequiredField(
              field,
              state[field],
              createRequiredFieldError(field)
            );
          }

          return new Promise(resolveLocal => resolveLocal());
        });

        Promise.all(promises)
          .then(() => resolve())
          .catch(err => reject(err));
      });
    });

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
    return new Promise(resolve =>
      this.setState({ fieldErrors: newFieldErrors }, resolve)
    );
  };

  getDataFromFields = () => {
    const data = _.pick(this.state, dataFields);
    const { answerVariableUID } = this.props;
    if (answerVariableUID) data.AnswerVariable_UID = answerVariableUID;

    return data;
  };

  createDivClassName = fieldId => {
    let className = "form-group";
    const { fieldErrors } = this.state;
    if (fieldErrors[fieldId] && fieldErrors[fieldId].length > 0)
      className += " has-error";
    return className;
  };

  handleChange = event => {
    const { id, value, type, checked } = event.currentTarget;
    const newPartialState =
      type === "checkbox" ? { [id]: checked } : { [id]: value };

    newPartialState.fieldErrors = {};
    this.setState(newPartialState);
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

  createInputFieldFromKey = (state, field) => {
    const key = uuid4();
    if (field === "Activated") {
      return (
        <input
          type="checkbox"
          checked={state[field]}
          onChange={this.handleChange}
          id="Activated"
          key={key}
        />
      );
    }
    return (
      <input
        type="text"
        className="form-control"
        id={field}
        value={state[field]}
        onChange={this.handleChange}
        key={key}
      />
    );
  };

  render() {
    const { state } = this;
    const fields = dataFields.map(field => (
      <div className={this.createDivClassName(field)} key={field}>
        <label htmlFor={field} className="col-sm-2 control-label">
          {field.replace("_", "")}
        </label>
        <div className="col-sm-10">
          {this.createInputFieldFromKey(state, field)}
          {this.createErrorDivs(field)}
        </div>
      </div>
    ));
    return (
      state.show && (
        <Modal {...this.newProps} cofirmEnabled>
          <form className="form-horizontal">
            {fields}
            {this.createGlobalErrorDivs()}
          </form>
        </Modal>
      )
    );
  }
}

ManageAnswerVariable.propTypes = {
  title: PropTypes.isRequired,
  operation: PropTypes.isRequired,
  closedModal: PropTypes.isRequired
};

export default ManageAnswerVariable;
