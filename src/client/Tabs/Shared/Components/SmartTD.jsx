import React from "react";
import PropTypes from "prop-types";

export default class SmartTD extends React.Component {
  constructor(props) {
    super(props);
    const { value, contentEditable } = this.props;
    this.contentEditable = contentEditable;
    this.value = value;
  }

  handleChange = e => {
    this.value = e.target.innerText;
  };

  getValue = () => this.value;

  isEditable = () => this.contentEditable;

  inverseEditableState = () => {
    this.contentEditable = !this.contentEditable;
    this.forceUpdate();
  };

  render() {
    return (
      <td contentEditable={this.contentEditable} onKeyUp={this.handleChange}>
        {this.value}
      </td>
    );
  }
}

SmartTD.propTypes = {
  value: PropTypes.string.isRequired,
  contentEditable: PropTypes.bool.isRequired
};
