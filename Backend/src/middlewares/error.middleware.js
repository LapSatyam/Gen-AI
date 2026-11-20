function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({
      message: "Resource already exists",
    });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
}
export default errorMiddleware;
