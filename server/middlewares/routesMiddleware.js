function sendDBResult(res, dbResult) {
  dbResult
    .then(result => {
      if (result && Object.keys(result).length > 0) res.send(result);
      else res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
}

module.exports = {
  sendDBResult
};
