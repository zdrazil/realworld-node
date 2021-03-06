import express, { ErrorRequestHandler } from 'express';
import users from './users';

const router = express.Router();

router.use('/', users);

const validationErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce<Record<string, string>>(
        (errors, key) => {
          errors[key] = err.errors[key].message;
          return errors;
        },
        {},
      ),
    });
  }

  return next(err);
};

router.use(validationErrorHandler);

export default router;
