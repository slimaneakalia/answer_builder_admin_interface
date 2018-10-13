/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
function sendDBResult(res, dbResult) {
  dbResult
    .then(resultParam => {
      const result = resultParam;
      const type = typeof result;
      if (type === "object") res.send(result);
      else res.send(`${result}`);
    })
    .catch(() => {
      res.sendStatus(500);
    });
}

module.exports = {
  sendDBResult
};
