function sendDBResult(res, dbResult) {
  dbResult
    .then(result => {
      res.send(result);
    })
    .catch(() => {
      res.sendStatus(500);
    });
}

module.exports = {
  sendDBResult
};
