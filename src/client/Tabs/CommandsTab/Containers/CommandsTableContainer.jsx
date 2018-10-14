/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import CommandsTable from "_commands/Components/CommandsTable";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";
import PropTypes from "prop-types";

const data = {
  Command_UID1: {
    Name: "Name 1",
    Text: "Text 1",
    Description: "Description 1"
  },
  Command_UID2: {
    Name: "Name 2",
    Text: "Text 2",
    Description: "Description 2"
  },
  Command_UID3: {
    Name: "Name 3",
    Text: "Text 3",
    Description: "Description 3"
  }
};

const remove = CommandUID => {
  console.log(`CommandUID to remove : ${CommandUID}`);
};

const duplicate = CommandUID => {
  console.log(`CommandUID to duplicate : ${CommandUID}`);
};

const edit = commandData => {
  console.log(`New Edition with data to add :`);
  console.log(commandData);
  return new Promise((resolve, reject) => {
    // resolve();
    reject("Internal Server error edition : Minoucha");
  });
};

const create = commandData => {
  console.log("New Command to add :");
  console.log(commandData);
  return new Promise((resolve, reject) => {
    // resolve();
    reject("Internal Server error creation : Minoucha");
  });
};

const Component = ({ withAddItemButton }) => (
  <CommandsTable
    data={data}
    edit={edit}
    duplicate={duplicate}
    remove={remove}
    create={create}
    withAddItemButton={withAddItemButton}
  />
);

Component.propTypes = {
  withAddItemButton: PropTypes.bool
};

Component.defaultProps = {
  withAddItemButton: false
};

const CommandsTableContainer = WrapTableContainer(Component, "Answer commands");

export default CommandsTableContainer;
