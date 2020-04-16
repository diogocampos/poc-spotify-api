function errorHandler(err, req, res, next) {
  console.error(err)
  res.sendStatus(500)
}

function notFound(req, res) {
  res.sendStatus(404)
}

module.exports = {
  errorHandler,
  notFound,
}
