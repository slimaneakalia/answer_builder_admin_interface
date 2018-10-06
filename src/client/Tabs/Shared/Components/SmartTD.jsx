import React from "react";
import PropTypes from "prop-types";

export default class SmartTD extends React.Component {
  constructor(props) {
    super(props);
    const { value, contentEditable } = this.props;
    this.state = { value, contentEditable };
  }

  handleChange = e => {
    this.setState({ value: e.target.innerText });
  };

  getValue = () => {
    const { value } = this.state;
    return value;
  };

  isEditable = () => {
    const { contentEditable } = this.state;
    return contentEditable;
  };

  inverseEditableState = () => {
    const { contentEditable } = this.state;
    this.setState({ contentEditable: !contentEditable });
  };

  render() {
    const { value, contentEditable } = this.state;
    return (
      <td contentEditable={contentEditable} onKeyUp={this.handleChange}>
        {value}
      </td>
    );
  }
}

SmartTD.propTypes = {
  value: PropTypes.string.isRequired,
  contentEditable: PropTypes.bool.isRequired
};
