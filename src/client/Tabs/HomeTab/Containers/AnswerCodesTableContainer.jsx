import React from "react";
import AnswerCodesTable from "_home/Components/AnswerCodesTable";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";

const data = {
  answerUID1: { Code: "Premier Code", Description: "Première description" },
  answerUID2: { Code: "Deuxième Code", Description: "Deuxième description" }
};

const remove = answerCodeUID => {
  console.log(`UID to remove : ${answerCodeUID}`);
};

const editAnswerCode = (answerCodeUID, code, description) => {
  console.log(`New Edition with data to add :`);
  console.log(`answerCodeUID : ${answerCodeUID}`);
  console.log(`code : ${code}`);
  console.log(`description : ${description}`);
};

const Component = () => (
  <AnswerCodesTable
    editAnswerCode={editAnswerCode}
    remove={remove}
    data={data}
  />
);

const AnswerCodesTableContainer = WrapTableContainer(Component, "Answer codes");

export default AnswerCodesTableContainer;
