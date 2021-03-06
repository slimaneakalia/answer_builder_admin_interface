/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
const express = require("express");
const bodyParser = require("body-parser");

const { SERVER_PORT } = require("../../config/app_config.json");

const app = express();
app.use(bodyParser.json());

const AnswerItemsRoute = require("./routes/AnswerItemsRoute.js");
const AnswersRoute = require("./routes/AnswersRoute.js");
const AnswerVariablesRoute = require("./routes/AnswerVariablesRoute.js");
const LanguagesRoute = require("./routes/LanguagesRoute.js");
const ChannelsRoute = require("./routes/ChannelsRoute.js");
const CommandsRoute = require("./routes/CommandsRoute.js");

/* app.use(express.static("dist"));
app.use(express.static(__dirname)); */

app.use("/answer_items", AnswerItemsRoute);
app.use("/answers", AnswersRoute);
app.use("/answer_variables", AnswerVariablesRoute);
app.use("/languages", LanguagesRoute);
app.use("/channels", ChannelsRoute);
app.use("/commands", CommandsRoute);

app.listen(SERVER_PORT, "0.0.0.0", () => {
  console.log(`Server listening on port: ${SERVER_PORT}`);
});
