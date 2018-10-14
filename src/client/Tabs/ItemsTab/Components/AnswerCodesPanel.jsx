import React from "react";
import PropTypes from "prop-types";

const AnswerCodesPanel = ({ Code, Description }) => (
  <form>
    <div className="form-group">
      <label htmlFor="answer-code">Answer code</label>
      <input
        type="text"
        className="form-control"
        id="answer-code"
        disabled
        value={Code}
      />
    </div>

    <div className="form-group">
      <label htmlFor="answer-desc">Description</label>
      <textarea className="form-control" id="answer-desc" disabled>
        {Description}
      </textarea>
    </div>
  </form>
);

AnswerCodesPanel.propTypes = {
  Code: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired
};

export default AnswerCodesPanel;
