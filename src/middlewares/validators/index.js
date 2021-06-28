import { validationResult } from 'express-validator';

import * as validateUser from './validateUser';
import * as validateEvent from './validateEvent';

const getErrors = (req, next) => {
  const errors = validationResult(req)
    .array()
    .map((error) => error.msg);
  if (!errors.length) {
    return next();
  }
  return errors;
};

export const handleValidation = async (req, res, next) => {
  const result = getErrors(req, next);
  return Array.isArray(result)
    ? res.status(400).json({ errors: result, status: 'error' })
    : result;
};

export const { signin, signup } = validateUser;
export const { eventName, subEventName } = validateEvent;
