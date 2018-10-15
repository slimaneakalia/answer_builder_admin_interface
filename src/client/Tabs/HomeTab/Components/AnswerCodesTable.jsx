/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import PropTypes from "prop-types";
import SmartTD from "_shared/Components/SmartTD";
import Button from "_shared/Components/Button";
import CreateNewAnswerItemModal from "_home/Components/CreateNewAnswerItemModal";
import CreateNewAnswerCodeModal from "_home/Components/CreateNewAnswerCodeModal";
import AddItemButton from "_shared/Components/AddItemButton";

function getFromRow(row, field) {
  return row.refs[field].current;
}

class AnswerCodesTable extends React.Component {
  constructor(props) {
    super(props);
    this.rows = {};
    this.state = {
      addAnswerItem: false,
      targetAnswerCodeUID: null,
      addAnswerCode: false
    };
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

  handleCodeSelectionChange = event => {
    const answerCodeUUID = event.currentTarget.getAttribute("uid");
    const { selectNewCode } = this.props;
    selectNewCode(answerCodeUUID);
  };

  createAnswerCodeItem = (answerData, answerCodeUID) => {
    let className = "glyphicon glyphicon-pencil";
    let rowColumns;
    const { currentAnswerCodeUID } = this.props;

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
        <td>
          <input
            className="radio"
            type="radio"
            name="answerCodes"
            uid={answerCodeUID}
            checked={answerCodeUID === currentAnswerCodeUID.toString()}
            onChange={this.handleCodeSelectionChange}
          />
        </td>
      </tr>
    );
  };

  addAnswerCode = () => {
    this.setState({ addAnswerCode: true });
  };

  closedAddAnswerItemModal = () => {
    this.setState({ addAnswerItem: false, targetAnswerCodeUID: null });
  };

  closedAddAnswerCodeModal = () => {
    this.setState({ addAnswerCode: false });
  };

  render() {
    const {
      data,
      languages,
      channels,
      checkDescription,
      createNewAnswerItem,
      createNewAnswerCode,
      withAddItemButton
    } = this.props;
    const { addAnswerItem, targetAnswerCodeUID, addAnswerCode } = this.state;

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
              <th>Select</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        {withAddItemButton && (
          <AddItemButton onClick={this.addAnswerCode}>
            Add new Answer Code
          </AddItemButton>
        )}
        {addAnswerItem && (
          <CreateNewAnswerItemModal
            answerCodeUID={targetAnswerCodeUID}
            closedModal={this.closedAddAnswerItemModal}
            languages={languages}
            channels={channels}
            createNewAnswerItem={createNewAnswerItem}
            checkDescription={checkDescription}
          />
        )}

        {addAnswerCode && (
          <CreateNewAnswerCodeModal
            createNewAnswerCode={createNewAnswerCode}
            closedModal={this.closedAddAnswerCodeModal}
          />
        )}
      </React.Fragment>
    );
  }
}

AnswerCodesTable.propTypes = {
  data: PropTypes.isRequired,
  currentAnswerCodeUID: PropTypes.isRequired,
  channels: PropTypes.isRequired,
  languages: PropTypes.isRequired,
  withAddItemButton: PropTypes.bool.isRequired,
  createNewAnswerItem: PropTypes.isRequired,
  createNewAnswerCode: PropTypes.isRequired,
  checkDescription: PropTypes.isRequired,
  remove: PropTypes.isRequired,
  editAnswerCode: PropTypes.isRequired,
  selectNewCode: PropTypes.isRequired
};

export default AnswerCodesTable;
