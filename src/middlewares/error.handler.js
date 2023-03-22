/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
function logErrors (error, _req, _res, next) {
  console.log('log handler');
  console.error(error);
  next(error);
}
function errorHandler (error, req, res, next) {
  console.log('error handler');
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

module.exports = {
  logErrors,
  errorHandler
};
