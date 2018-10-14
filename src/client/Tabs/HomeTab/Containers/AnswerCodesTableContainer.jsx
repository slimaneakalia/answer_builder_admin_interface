/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import AnswerCodesTable from "_home/Components/AnswerCodesTable";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";
import checkDescription from "_shared/Helpers/AnswerItemHelper";

const data = {
  answerUID1: { Code: "Premier Code", Description: "Première description" },
  answerUID2: { Code: "Deuxième Code", Description: "Deuxième description" }
};

const channels = {
  WEB: { Channel_label: "WEB", selected: false },
  TWITTER: { Channel_label: "TWITTER", selected: true }
};

const languages = {
  FR: { Language_label: "FR", selected: false },
  EN: { Language_label: "EN", selected: true }
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

const createNewAnswerItem = answerItemData => {
  console.log("New AnswerItem to add :");
  console.log(answerItemData);
  return new Promise(resolve => {
    resolve();
    // reject("Internal Server error : Minoucha");
  });
};

const createNewAnswerCode = answerCodeData => {
  console.log("New AnswerCode to add :");
  console.log(answerCodeData);
  return new Promise(resolve => {
    resolve();
    // reject("Internal Server error : Minoucha");
  });
};

const Component = () => (
  <AnswerCodesTable
    editAnswerCode={editAnswerCode}
    remove={remove}
    data={data}
    channels={channels}
    languages={languages}
    createNewAnswerItem={createNewAnswerItem}
    createNewAnswerCode={createNewAnswerCode}
    checkDescription={checkDescription}
    withAddItemButton
  />
);

const AnswerCodesTableContainer = WrapTableContainer(Component, "Answer codes");

export default AnswerCodesTableContainer;
