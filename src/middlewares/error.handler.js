/* eslint-disable no-console */
function logErrors (error, req, res, next) {
  console.log(error);
  console.log('error handler');
  next(error);
}
function errorHandler (error, req, res, next) {
  console.log('error handler');
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
  next(error);
}

module.exports = {
  logErrors,
  errorHandler
};
