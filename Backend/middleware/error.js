class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  (err.message = err.message || "Internal server E rror"),
    (err.statusCode = err.statusCode || 500);
  if (err.name === "caseError") {
    const message = `Resource not found.Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "jsonWebToken") {
    const message = `json web token invalid,Try again `;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token Expired`;
    err = new ErrorHandler(message, 400);
  }
  return res.status(statusCode).json({
    message:false,
    message:err.message
  })
};

export default ErrorHandler