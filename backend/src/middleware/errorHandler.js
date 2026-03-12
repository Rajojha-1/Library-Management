const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(
    `[ERROR] ${req.method} ${req.originalUrl} -> ${statusCode} | ${err.message}`
  );

  if (process.env.NODE_ENV !== "production" && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
