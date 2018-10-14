/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import AnswerItemTableContentComponent from "_home/Components/AnswerItemTableContentComponent";
import checkDescription from "_shared/Helpers/AnswerItemHelper";

const data = {
  AnswerItem_UUID1: {
    Answer_UID: "Answer_UID_1",
    Name: "Name",
    Language: "FR",
    Channel: "TWITTER",
    Text: "Text 1",
    Activated: true,
    _Default: false
  },
  AnswerItem_UUID2: {
    Answer_UID: "Answer_UID_2",
    Name: "Name 2",
    Language: "EN",
    Channel: "WEB",
    Text: "Text 2",
    Activated: false,
    _Default: true
  }
};

const channels = {
  WEB: { Channel_label: "WEB", selected: false },
  TWITTER: { Channel_label: "TWITTER", selected: true }
};

const languages = {
  FR: { Language_label: "FR", selected: false },
  EN: { Language_label: "EN", selected: true }
};

const remove = answerItemUID => {
  console.log(`Answer UID to remove : ${answerItemUID}`);
};

const edit = answerItem => {
  console.log(`New Edition with data to do :`);
  console.log(answerItem);
  return new Promise((resolve, reject) => {
    resolve("Edition error from minoucha");
    // reject("Edition error from minoucha");
  });
};

const duplicate = answerItemUID => {
  console.log(`Answer UID to duplicate : ${answerItemUID}`);
};

const HOC = () => (
  <AnswerItemTableContentComponent
    data={data}
    remove={remove}
    edit={edit}
    duplicate={duplicate}
    channels={channels}
    languages={languages}
    checkDescription={checkDescription}
  />
);

export default HOC;
