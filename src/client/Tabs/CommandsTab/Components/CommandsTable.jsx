/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import SmartTD from "_shared/Components/SmartTD";
import Button from "_shared/Components/Button";
import ManageCommand from "_commands/Components/ManageCommand";
import AddItemButton from "_shared/Components/AddItemButton";

export const dataFields = ["Name", "Text", "Description"];

class CommandsTable extends React.Component {
  constructor(props) {
    super(props);
    this.rows = {};
    this.state = {
      editCommand: false,
      targetCommandUID: null,
      addCommand: false
    };
  }

  edit = event => {
    const commandUID = event.currentTarget.getAttribute("uid");

    const row = this.rows[commandUID];
    if (row) {
      this.setState({
        editCommand: true,
        targetCommandUID: commandUID
      });
    }
  };

  duplicate = event => {
    const commandUID = event.currentTarget.getAttribute("uid");

    const row = this.rows[commandUID];
    if (row) {
      const { duplicate } = this.props;
      duplicate(commandUID);
    }
  };

  remove = event => {
    const commandUID = event.currentTarget.getAttribute("uid");
    const row = this.rows[commandUID];
    if (row) {
      delete this.rows[commandUID];
      const { remove } = this.props;
      remove(commandUID);
    }
  };

  createCommandRow = (commandData, commandUID) => {
    let rowColumns;
    let ref;
    let renderedRowColumns;

    if (this.rows[commandUID]) {
      rowColumns = this.rows[commandUID];
      renderedRowColumns = _.pick(rowColumns, dataFields);
    } else {
      const refs = {};
      rowColumns = {};
      dataFields.forEach(key => {
        ref = React.createRef();
        refs[key] = ref;
        rowColumns[key] = <SmartTD ref={ref} value={commandData[key]} />;
      });

      renderedRowColumns = { ...rowColumns };
      rowColumns.refs = refs;
      this.rows[commandUID] = rowColumns;
    }

    return (
      <tr>
        {Object.values(renderedRowColumns)}
        <td>
          <Button onClick={this.edit} uid={commandUID}>
            <span className="glyphicon glyphicon-pencil" />
          </Button>
        </td>
        <td>
          <Button onClick={this.duplicate} uid={commandUID}>
            <span className="glyphicon glyphicon-duplicate" />
          </Button>
        </td>
        <td>
          <Button onClick={this.remove} uid={commandUID}>
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
              editCommand: false,
              targetCommandUID: null
            });
            resolve();
          })
          .catch(err => reject(err));
      });
    }

    this.setState({
      editCommand: false,
      targetCommandUID: null
    });

    return null;
  };

  addCommandClick = () => {
    this.setState({ addCommand: true });
  };

  createCommandCallback = newData => {
    if (newData) {
      const { create } = this.props;
      return new Promise((resolve, reject) => {
        create(newData)
          .then(() => {
            this.setState({ addCommand: false });
            resolve();
          })
          .catch(err => reject(err));
      });
    }

    this.setState({ addCommand: false });

    return null;
  };

  render() {
    const { data, withAddItemButton } = this.props;
    const { editCommand, targetCommandUID, addCommand } = this.state;
    const rows = Object.keys(data).map(key =>
      this.createCommandRow(data[key], key)
    );

    return (
      <React.Fragment>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Text</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Duplicate</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>

        {withAddItemButton && (
          <AddItemButton onClick={this.addCommandClick}>
            Add new Command
          </AddItemButton>
        )}

        {editCommand && (
          <ManageCommand
            data={data[targetCommandUID]}
            commandUID={targetCommandUID}
            operation={this.editModalCallback}
            closedModal={this.editModalCallback}
            title="Edit Command"
          />
        )}

        {addCommand && (
          <ManageCommand
            operation={this.createCommandCallback}
            closedModal={this.createCommandCallback}
            title="Create a new Command"
          />
        )}
      </React.Fragment>
    );
  }
}
CommandsTable.propTypes = {
  data: PropTypes.isRequired,
  duplicate: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  remove: PropTypes.isRequired,
  create: PropTypes.isRequired,
  withAddItemButton: PropTypes.isRequired
};

export default CommandsTable;
