import { NotFoundError, ValidationError } from "../errors/customError.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError || err instanceof NotFoundError) {
    return res.status(err.status).json({ error: err.name, message: err.message });
  }

  console.error(err);
  res.status(500).json({ error: 'internal_server_error', message: 'Something went wrong' });
}
