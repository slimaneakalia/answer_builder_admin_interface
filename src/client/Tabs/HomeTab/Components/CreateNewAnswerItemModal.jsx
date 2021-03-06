/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import Modal from "_shared/Components/Modal";
import _ from "lodash";
import uuid4 from "uuid/v4";

const NAME_IS_REQUIRED = "The Name is required";
const TEXT_IS_REQUIRED = "The text is required";

class CreateNewAnswerItemModal extends React.Component {
  constructor(props) {
    super(props);
    const { languages, channels } = props;
    const languageUIDs = Object.keys(languages);
    const channelUIDs = Object.keys(channels);
    const Language = languageUIDs.length ? languageUIDs[0] : null;
    const Channel = channelUIDs.length ? channelUIDs[0] : null;
    this.state = {
      show: true,
      Name: null,
      Text: null,
      Activated: false,
      _Default: false,
      cofirmEnabled: true,
      fieldErrors: {},
      globalErrors: [],
      Language,
      Channel
    };

    this.newProps = {
      title: "Create new Answer Item",
      onConfirm: this.onConfirm,
      onClose: this.onClose
    };
  }

  onConfirm = () => {
    // this.setState({ show: false });
    const { createNewAnswerItem } = this.props;
    this.checkFields()
      .then(() => {
        const answerItemData = this.getDataFromFields();
        this.setState({ cofirmEnabled: false }, () => {
          createNewAnswerItem(answerItemData)
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

  addFieldError = (field, newError) => {
    const { fieldErrors } = this.state;

    const newFieldErrors = { ...fieldErrors };
    if (!newFieldErrors[field]) newFieldErrors[field] = [];
    newFieldErrors[field].push(newError);
    return new Promise(resolve =>
      this.setState({ fieldErrors: newFieldErrors }, resolve)
    );
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

  checkFields = () => {
    const { checkDescription } = this.props;
    const { Name, Text } = this.state;
    let test = true;
    return new Promise((resolve, reject) => {
      this.setState({ fieldErrors: {}, globalErrors: [] }, () => {
        this.checkRequiredField("Text", Text, TEXT_IS_REQUIRED)
          .catch(() => {
            test = false;
          })
          .finally(() => checkDescription(Text))
          .catch(error => {
            test = false;
            return this.addFieldError("Text", error);
          })
          .finally(() =>
            this.checkRequiredField("Name", Name, NAME_IS_REQUIRED)
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

  getDataFromFields = () => {
    const data = _.pick(this.state, [
      "Name",
      "Language",
      "Channel",
      "Text",
      "Activated",
      "_Default"
    ]);
    const { answerCodeUID } = this.props;
    data.Answer_UID = answerCodeUID;

    return data;
  };

  onClose = () => {
    this.setState({ show: false });
    const { closedModal } = this.props;
    closedModal();
  };

  handleChange = event => {
    const { id, value, type, checked } = event.currentTarget;
    const newPartialState =
      type === "checkbox" ? { [id]: checked } : { [id]: value };

    newPartialState.fieldErrors = {};
    this.setState(newPartialState);
  };

  createDivClassName = fieldId => {
    let className = "form-group";
    const { fieldErrors } = this.state;
    if (fieldErrors[fieldId] && fieldErrors[fieldId].length > 0)
      className += " has-error";
    return className;
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
    const { languages, channels } = this.props;
    const {
      show,
      Name,
      Language,
      Channel,
      Text,
      Activated,
      _Default,
      cofirmEnabled
    } = this.state;
    const languagesSelect = Object.keys(languages).map(key => (
      <option key={key} value={key}>
        {languages[key].Language_label}
      </option>
    ));

    const channelsSelect = Object.keys(channels).map(key => (
      <option key={key} value={key}>
        {channels[key].Channel_label}
      </option>
    ));

    return (
      show && (
        <Modal cofirmEnabled={cofirmEnabled} {...this.newProps}>
          <form className="form-horizontal">
            <div className={this.createDivClassName("Name")}>
              <label htmlFor="Name" className="col-sm-2 control-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  value={Name || ""}
                  onChange={this.handleChange}
                />
                {this.createErrorDivs("Name")}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="Language" className="col-sm-2 control-label">
                Language
              </label>
              <div className="col-sm-10">
                <select
                  id="Language"
                  className="form-control"
                  onChange={this.handleChange}
                  value={Language}
                >
                  {languagesSelect}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="Channel" className="col-sm-2 control-label">
                Channel
              </label>
              <div className="col-sm-10">
                <select
                  id="Channel"
                  className="form-control"
                  onChange={this.handleChange}
                  value={Channel}
                >
                  {channelsSelect}
                </select>
              </div>
            </div>

            <div className={this.createDivClassName("Text")}>
              <label htmlFor="Text" className="col-sm-2 control-label">
                Text
              </label>
              <div className="col-sm-10">
                <textarea
                  id="Text"
                  className="form-control"
                  onChange={this.handleChange}
                  style={{ resize: "none" }}
                >
                  {Text}
                </textarea>
                {this.createErrorDivs("Text")}
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-6" style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={Activated}
                  onChange={this.handleChange}
                  id="Activated"
                />{" "}
                Activated
              </div>
              <div className="col-sm-6" style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={_Default}
                  onChange={this.handleChange}
                  id="_Default"
                />{" "}
                Default
              </div>
            </div>

            {this.createGlobalErrorDivs()}
          </form>
        </Modal>
      )
    );
  }
}

export default CreateNewAnswerItemModal;
