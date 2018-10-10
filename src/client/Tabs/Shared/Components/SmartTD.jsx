import React from "react";
import PropTypes from "prop-types";

const UNSELECTED_BACKGROUND_COLOR = "#c2c2c2";
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
    const tdStyle = !this.contentEditable
      ? { backgroundColor: UNSELECTED_BACKGROUND_COLOR }
      : null;

    console.log(`this.contentEditable : ${this.contentEditable}`);
    console.log(`tdStyle`);
    console.log(tdStyle);
    return (
      <td
        contentEditable={this.contentEditable}
        onKeyUp={this.handleChange}
        style={tdStyle}
      >
        {this.value}
      </td>
    );
  }
}

SmartTD.propTypes = {
  value: PropTypes.string.isRequired,
  contentEditable: PropTypes.bool.isRequired
};
