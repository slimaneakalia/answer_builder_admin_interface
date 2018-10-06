import React from "react";
import PropTypes from "prop-types";
import SmartTD from "_shared/Components/SmartTD";

class AnswerCodesTable extends React.Component {
  constructor(props) {
    super(props);
    this.rows = {};
  }

  remove = e => {
    const targetUID = e.target.getAttribute("answerCodeUID");
    const row = this.rows[targetUID];
    if (row) {
      delete this.rows[targetUID];
      const { remove } = this.props;
      remove(targetUID, row.code.getValue(), row.description.getValue());
    }
  };

  editOrSave = e => {
    const targetUID = e.target.getAttribute("answerCodeUID");
    const row = this.rows[targetUID];

    if (row) {
      if (row.code.isEditable()) {
        const { editAnswerCode } = this.props;
        editAnswerCode(
          targetUID,
          row.code.getValue(),
          row.description.getValue()
        );
      }

      Object.values(row).forEach(smartTD => {
        if (smartTD) smartTD.inverseEditableState();
      });
    }
  };

  creatingNewAnswerItem = e => {
    console.log("Adding answerCode");
    console.log(e);
  };

  createAnswerCodeItem = (answerData, answerCodeUID) => {
    let className = "glyphicon glyphicon-pencil";
    let rowColumns;
    if (this.rows[answerCodeUID]) {
      rowColumns = this.rows[answerCodeUID];
      className = rowColumns.row.isEditable();
    } else {
      rowColumns = {
        code: <SmartTD contentEditable={false} value={answerData.code} />,
        description: (
          <SmartTD contentEditable={false} value={answerData.description} />
        )
      };
      this.rows[answerCodeUID] = rowColumns;
    }

    return (
      <tr>
        {rowColumns.code}
        {rowColumns.description}
        <td>
          <button
            type="button"
            onClick={this.editOrSave}
            answerCodeUID={answerCodeUID}
          >
            <span className={className} />
          </button>
        </td>
        <td>
          <button
            type="button"
            onClick={this.remove}
            answerCodeUID={answerCodeUID}
          >
            <span className="glyphicon glyphicon-remove" />
          </button>
        </td>
        <td>
          <button
            type="button"
            onClick={this.creatingNewAnswerItem}
            answerCodeUID={answerCodeUID}
          >
            <span className="glyphicon glyphicon-paperclip" />
          </button>
        </td>
      </tr>
    );
  };

  render() {
    const { data } = this.props;
    const rows = Object.keys(data).map(key =>
      this.createAnswerCodeItem(data[key], key)
    );

    return (
      <table className="table table-bordered table-hover table-striped codes-table">
        <thead>
          <tr>
            <th>Answer code</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Remove</th>
            <th>Create new item</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

AnswerCodesTable.propTypes = {
  data: PropTypes.string.isRequired,
  /* channels: PropTypes.isRequired,
  languages: PropTypes.isRequired,
  createNewAnswerItem: PropTypes.isRequired,
  checkDescription: PropTypes.isRequired,
  */
  remove: PropTypes.isRequired,
  editAnswerCode: PropTypes.isRequired
};

export default AnswerCodesTable;
