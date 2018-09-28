function sendDBResult(res, dbResult) {
  dbResult
    .then(result => {
      if (Object.keys(result).length > 0) res.send(result);
      else res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

module.exports = {
  sendDBResult
};
