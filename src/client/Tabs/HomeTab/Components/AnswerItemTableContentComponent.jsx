import React from "react";
import PropTypes from "prop-types";
import SmartTD from "_shared/Components/SmartTD";
import Button from "_shared/Components/Button";
import EditAnswerItem from "_home/Components/EditAnswerItem";
import NoResultLabel from "_shared/Components/NoResultLabel";
import _ from "lodash";

/* function getFromRow(row, field) {
  return row.refs[field].current;
} */
const dataFields = [
  "Name",
  "Language",
  "Channel",
  "Text",
  "Activated",
  "_Default"
];

class AnswerItemTableContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editAnswerItem: false,
      targetAnswerItemUID: null
    };
  }

  edit = event => {
    const answerItemUUID = event.currentTarget.getAttribute("uid");

    const row = this.rows[answerItemUUID];
    if (row) {
      this.setState({
        editAnswerItem: true,
        targetAnswerItemUID: answerItemUUID
      });
    }
  };

  editModalCallback = newData => {
    if (newData) {
      const { edit } = this.props;
      return new Promise((resolve, reject) => {
        edit(newData)
          .then(() => {
            this.setState({
              editAnswerItem: false,
              targetAnswerItemUID: null
            });
            resolve();
          })
          .catch(err => reject(err));
      });
    }

    this.setState({
      editAnswerItem: false,
      targetAnswerItemUID: null
    });
  };

  remove = event => {
    const answerItemUUID = event.currentTarget.getAttribute("uid");
    const row = this.rows[answerItemUUID];
    if (row) {
      delete this.rows[answerItemUUID];
      const { remove } = this.props;
      remove(answerItemUUID);
    }
  };

  duplicate = event => {
    const answerItemUUID = event.currentTarget.getAttribute("uid");

    const row = this.rows[answerItemUUID];
    if (row) {
      const { duplicate } = this.props;
      duplicate(answerItemUUID);
    }
  };

  createAnswerItemRow = (answerItemData, answerItemUID) => {
    let rowColumns;
    let ref;
    let renderedRowColumns;
    const rowClassName = !answerItemData.Activated ? "danger" : null;

    if (this.rows[answerItemUID]) {
      rowColumns = this.rows[answerItemUID];
      renderedRowColumns = _.pick(rowColumns, dataFields);
    } else {
      const refs = {};
      rowColumns = {};
      dataFields.forEach(key => {
        ref = React.createRef();
        refs[key] = ref;
        rowColumns[key] = <SmartTD ref={ref} value={answerItemData[key]} />;
      });

      renderedRowColumns = { ...rowColumns };
      rowColumns.refs = refs;
      this.rows[answerItemUID] = rowColumns;
    }

    return (
      <tr className={rowClassName} key={answerItemUID}>
        {Object.values(renderedRowColumns)}
        <td>
          <Button onClick={this.edit} uid={answerItemUID}>
            <span className="glyphicon glyphicon-pencil" />
          </Button>
        </td>
        <td>
          <Button onClick={this.duplicate} uid={answerItemUID}>
            <span className="glyphicon glyphicon-duplicate" />
          </Button>
        </td>
        <td>
          <Button onClick={this.remove} uid={answerItemUID}>
            <span className="glyphicon glyphicon-remove" />
          </Button>
        </td>
      </tr>
    );
  };

  render() {
    this.rows = {};
    const { data, languages, channels, checkDescription } = this.props;
    const { editAnswerItem, targetAnswerItemUID } = this.state;

    const dataKeys = Object.keys(data);
    let finalContent;
    if (dataKeys.length > 0) {
      const rows = dataKeys.map(key =>
        this.createAnswerItemRow(data[key], key)
      );

      finalContent = (
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Language</th>
              <th>Channel</th>
              <th>Text</th>
              <th>Activated</th>
              <th>Default</th>
              <th>Edit</th>
              <th>Duplicate</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    } else {
      finalContent = <NoResultLabel />;
    }

    return (
      <React.Fragment>
        {finalContent}
        {editAnswerItem && (
          <EditAnswerItem
            answerItemUID={targetAnswerItemUID}
            answerItemData={data[targetAnswerItemUID]}
            languages={languages}
            channels={channels}
            edit={this.editModalCallback}
            checkDescription={checkDescription}
            closedModal={this.editModalCallback}
          />
        )}
      </React.Fragment>
    );
  }
}

AnswerItemTableContentComponent.propTypes = {
  data: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  remove: PropTypes.isRequired,
  duplicate: PropTypes.isRequired,
  languages: PropTypes.isRequired,
  channels: PropTypes.isRequired,
  checkDescription: PropTypes.isRequired
};
export default AnswerItemTableContentComponent;
