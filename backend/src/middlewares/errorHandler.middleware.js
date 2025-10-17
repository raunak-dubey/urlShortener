import AppError from '../utils/appError.utils.js';

const handleCastErrorDB = err => AppError.badRequest(`Invalid ${err.path}: ${err.value}`);
const handleDuplicateFieldsDB = err => AppError.conflict('Duplicate field value entered');
const handleValidationErrorDB = err => AppError.badRequest(err.message);

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';


  if (err.name === 'CastError') error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err);

  res.status(error.statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
};
