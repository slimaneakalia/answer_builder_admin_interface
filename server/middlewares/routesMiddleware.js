function sendDBResult(res, dbResult) {
  dbResult
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
}

module.exports = {
  sendDBResult
};
