export const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal server error ";
  err.statusCode ||= 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
