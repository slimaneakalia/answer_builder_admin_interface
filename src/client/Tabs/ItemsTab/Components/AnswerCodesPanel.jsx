import React from "react";

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
      <textarea
        className="form-control"
        id="answer-desc"
        value={Description}
        disabled
      />
    </div>
  </form>
);

export default AnswerCodesPanel;
