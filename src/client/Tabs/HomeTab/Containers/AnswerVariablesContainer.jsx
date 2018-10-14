/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import AnswerVariablesTable from "_home/Components/AnswerVariablesTable";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";
import PropTypes from "prop-types";

const data = {
  AnswerVariable_UID1: {
    Name: "Name 1",
    Value: "Value 1",
    _Group: "_Group 1",
    SubGroup: "SubGroup 1",
    Activated: false
  },
  AnswerVariable_UID2: {
    Name: "Name 2",
    Value: "Value 2",
    _Group: "_Group 2",
    SubGroup: "SubGroup 2",
    Activated: true
  }
};

const remove = answerVariableUID => {
  console.log(`AnswerVariableUID to remove : ${answerVariableUID}`);
};

const duplicate = answerVariableUID => {
  console.log(`AnswerVariableUID to duplicate : ${answerVariableUID}`);
};

const edit = answerVariableData => {
  console.log(`New Edition with data to add :`);
  console.log(answerVariableData);
  return new Promise((resolve, reject) => {
    resolve();
    // reject("Internal Server error : Minoucha");
  });
};

const create = answerVariableData => {
  console.log("New AnswerVariable to add :");
  console.log(answerVariableData);
  return new Promise(resolve => {
    resolve();
    // reject("Internal Server error : Minoucha");
  });
};

const Component = ({ withAddItemButton }) => (
  <AnswerVariablesTable
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

const AnswerVariablesTableContainer = WrapTableContainer(
  Component,
  "Answer variables"
);

export default AnswerVariablesTableContainer;
