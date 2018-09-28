const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const AnswerItemsRoute = require("./routes/AnswerItemsRoute");
const AnswersRoute = require("./routes/AnswersRoute");
const AnswerVariablesRoute = require("./routes/AnswerVariablesRoute");
// const CommandsRoute = require('./routes/CommandsRoute');

app.use("/answer_items", AnswerItemsRoute);
app.use("/answers", AnswersRoute);
app.use("/answer_variables", AnswerVariablesRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port: ${PORT}`);
});
