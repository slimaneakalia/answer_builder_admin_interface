import React from "react";
import PropTypes from "prop-types";
import SmartTD from "_shared/Components/SmartTD";
import Button from "_shared/Components/Button";
import CreateNewAnswerItemModal from "_home/Components/CreateNewAnswerItemModal";

function getFromRow(row, field) {
  return row.refs[field].current;
}

class AnswerCodesTable extends React.Component {
  constructor(props) {
    super(props);
    this.rows = {};
    this.state = { addAnswerItem: false, targetAnswerCodeUID: null };
  }

  remove = event => {
    const targetUID = event.currentTarget.getAttribute("uid");

    const row = this.rows[targetUID];
    if (row) {
      delete this.rows[targetUID];
      const { remove } = this.props;
      remove(targetUID);
    }
  };

  editOrSave = event => {
    const targetUID = event.currentTarget.getAttribute("uid");
    const row = this.rows[targetUID];

    if (row) {
      if (getFromRow(row, "Code").isEditable()) {
        const { editAnswerCode } = this.props;
        editAnswerCode(
          targetUID,
          getFromRow(row, "Code").getValue(),
          getFromRow(row, "Description").getValue()
        );
      }

      const refs = Object.values(row.refs);
      for (let i = 0; i < refs.length; i += 1) {
        if (refs[i]) refs[i].current.inverseEditableState();
      }

      this.forceUpdate();
    }
  };

  creatingNewAnswerItem = event => {
    event.preventDefault();
    const targetUID = event.currentTarget.getAttribute("uid");
    this.setState({ addAnswerItem: true, targetAnswerCodeUID: targetUID });
  };

  createAnswerCodeItem = (answerData, answerCodeUID) => {
    let className = "glyphicon glyphicon-pencil";
    let rowColumns;

    if (this.rows[answerCodeUID]) {
      rowColumns = this.rows[answerCodeUID];

      if (getFromRow(rowColumns, "Code").isEditable()) {
        className = "glyphicon glyphicon-floppy-disk";
      }
    } else {
      const refs = {
        Code: React.createRef(),
        Description: React.createRef()
      };
      rowColumns = {
        refs,
        Code: (
          <SmartTD
            ref={refs.Code}
            contentEditable={false}
            value={answerData.Code}
          />
        ),
        Description: (
          <SmartTD
            ref={refs.Description}
            contentEditable={false}
            value={answerData.Description}
          />
        )
      };
      this.rows[answerCodeUID] = rowColumns;
    }

    return (
      <tr>
        {rowColumns.Code}
        {rowColumns.Description}
        <td>
          <Button onClick={this.editOrSave} uid={answerCodeUID}>
            <span className={className} />
          </Button>
        </td>
        <td>
          <Button onClick={this.remove} uid={answerCodeUID}>
            <span className="glyphicon glyphicon-remove" />
          </Button>
        </td>
        <td>
          <Button onClick={this.creatingNewAnswerItem} uid={answerCodeUID}>
            <span className="glyphicon glyphicon-paperclip" />
          </Button>
        </td>
      </tr>
    );
  };

  closedAddAnswerItemModal = () => {
    this.setState({ addAnswerItem: false, targetAnswerCodeUID: null });
  };

  render() {
    const { data } = this.props;
    const { addAnswerItem, targetAnswerCodeUID } = this.state;

    const rows = Object.keys(data).map(key =>
      this.createAnswerCodeItem(data[key], key)
    );

    return (
      <React.Fragment>
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
        {addAnswerItem && (
          <CreateNewAnswerItemModal
            AnswerCodeUID={targetAnswerCodeUID}
            closedModal={this.closedAddAnswerItemModal}
          />
        )}
      </React.Fragment>
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
