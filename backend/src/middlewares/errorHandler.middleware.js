import AppError from '../utils/appError.utils.js';

const handleCastErrorDB = err => AppError.badRequest(`Invalid ${err.path}: ${err.value}`);
const handleDuplicateFieldsDB = err => AppError.conflict('Duplicate field value entered');
const handleValidationErrorDB = err => AppError.badRequest(err.message);

export const errorHandler = (err, req, res, next) => {
  // Copy the error to avoid mutating original
  let error = { ...err };
  // Ensure message and status fields are present on the cloned object
  error.message = err.message || error.message || 'Something went wrong';
  error.statusCode = err.statusCode || error.statusCode || 500;
  error.status = err.status || error.status || 'error';

  if (err.name === 'CastError') error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err);

  // Make sure statusCode is an integer and fallback to 500
  const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Something went wrong',
  });
};
