/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import PropTypes from "prop-types";
import SmartTD from "_shared/Components/SmartTD";
import Button from "_shared/Components/Button";
import ManageAnswerVariable from "_home//Components/ManageAnswerVariable";
import AddItemButton from "_shared/Components/AddItemButton";

export const dataFields = ["Name", "Value", "_Group", "SubGroup", "Activated"];

class AnswerVariablesTable extends React.Component {
  constructor(props) {
    super(props);
    this.rows = {};
    this.state = {
      editAnswerVariable: false,
      targetAnswerVariableUID: null,
      addAnswerVariable: false
    };
  }

  edit = event => {
    const answerVariableUUID = event.currentTarget.getAttribute("uid");

    const row = this.rows[answerVariableUUID];
    if (row) {
      this.setState({
        editAnswerVariable: true,
        targetAnswerVariableUID: answerVariableUUID
      });
    }
  };

  remove = event => {
    const answerVariableUUID = event.currentTarget.getAttribute("uid");
    const row = this.rows[answerVariableUUID];
    if (row) {
      delete this.rows[answerVariableUUID];
      const { remove } = this.props;
      remove(answerVariableUUID);
    }
  };

  duplicate = event => {
    const answerVariableUUID = event.currentTarget.getAttribute("uid");

    const row = this.rows[answerVariableUUID];
    if (row) {
      const { duplicate } = this.props;
      duplicate(answerVariableUUID);
    }
  };

  createAnswerVariableRow = (answerVariableData, answerVariableUID) => {
    let rowColumns;
    let ref;
    let renderedRowColumns;
    const rowClassName = !answerVariableData.Activated ? "danger" : null;

    if (this.rows[answerVariableUID]) {
      rowColumns = this.rows[answerVariableUID];
      renderedRowColumns = _.pick(rowColumns, dataFields);
    } else {
      const refs = {};
      rowColumns = {};
      dataFields.forEach(key => {
        ref = React.createRef();
        refs[key] = ref;
        rowColumns[key] = <SmartTD ref={ref} value={answerVariableData[key]} />;
      });

      renderedRowColumns = { ...rowColumns };
      rowColumns.refs = refs;
      this.rows[answerVariableUID] = rowColumns;
    }

    return (
      <tr className={rowClassName}>
        {Object.values(renderedRowColumns)}
        <td>
          <Button onClick={this.edit} uid={answerVariableUID}>
            <span className="glyphicon glyphicon-pencil" />
          </Button>
        </td>
        <td>
          <Button onClick={this.duplicate} uid={answerVariableUID}>
            <span className="glyphicon glyphicon-duplicate" />
          </Button>
        </td>
        <td>
          <Button onClick={this.remove} uid={answerVariableUID}>
            <span className="glyphicon glyphicon-remove" />
          </Button>
        </td>
      </tr>
    );
  };

  editModalCallback = newData => {
    if (newData) {
      const { edit } = this.props;
      return new Promise((resolve, reject) => {
        edit(newData)
          .then(() => {
            this.setState({
              editAnswerVariable: false,
              targetAnswerVariableUID: null
            });
            resolve();
          })
          .catch(err => reject(err));
      });
    }

    this.setState({
      editAnswerVariable: false,
      targetAnswerVariableUID: null
    });

    return null;
  };

  createVariableCallback = newData => {
    if (newData) {
      const { create } = this.props;
      return new Promise((resolve, reject) => {
        create(newData)
          .then(() => {
            this.setState({ addAnswerVariable: false });
            resolve();
          })
          .catch(err => reject(err));
      });
    }

    this.setState({ addAnswerVariable: false });

    return null;
  };

  addAnswerVariableClick = () => {
    this.setState({ addAnswerVariable: true });
  };

  render() {
    const {
      editAnswerVariable,
      targetAnswerVariableUID,
      addAnswerVariable
    } = this.state;
    const { data, withAddItemButton } = this.props;
    const rows = Object.keys(data).map(key =>
      this.createAnswerVariableRow(data[key], key)
    );

    return (
      <React.Fragment>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Group</th>
              <th>SubGroup</th>
              <th>Activated</th>
              <th>Edit</th>
              <th>Duplicate</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>

        {withAddItemButton && (
          <AddItemButton onClick={this.addAnswerVariableClick}>
            Add new Answer Variable
          </AddItemButton>
        )}

        {editAnswerVariable && (
          <ManageAnswerVariable
            data={data[targetAnswerVariableUID]}
            answerVariableUID={targetAnswerVariableUID}
            operation={this.editModalCallback}
            closedModal={this.editModalCallback}
            title="Edit Anwser variable"
          />
        )}

        {addAnswerVariable && (
          <ManageAnswerVariable
            operation={this.createVariableCallback}
            closedModal={this.createVariableCallback}
            title="Create Anwser variable"
          />
        )}
      </React.Fragment>
    );
  }
}

AnswerVariablesTable.propTypes = {
  data: PropTypes.isRequired,
  duplicate: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  remove: PropTypes.isRequired,
  create: PropTypes.isRequired,
  withAddItemButton: PropTypes.isRequired
};

export default AnswerVariablesTable;
