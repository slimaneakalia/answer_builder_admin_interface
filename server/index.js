const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const AnswerItemsRoute = require("./routes/AnswerItemsRoute.js");
const AnswersRoute = require("./routes/AnswersRoute.js");
const AnswerVariablesRoute = require("./routes/AnswerVariablesRoute.js");
const LanguagesRoute = require("./routes/LanguagesRoute.js");
const ChannelsRoute = require("./routes/ChannelsRoute.js");
// const CommandsRoute = require('./routes/CommandsRoute');

app.use("/answer_items", AnswerItemsRoute);
app.use("/answers", AnswersRoute);
app.use("/answer_variables", AnswerVariablesRoute);
app.use("/languages", LanguagesRoute);
app.use("/channels", ChannelsRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port: ${PORT}`);
});
