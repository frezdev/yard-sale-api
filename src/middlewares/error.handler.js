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
  });
}

function boomErrorHandler (error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
};
