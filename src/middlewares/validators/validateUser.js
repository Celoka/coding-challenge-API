import { check } from 'express-validator';

export const signup = [
  check('username')
    .isString()
    .withMessage('A valid name is required')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('username should have a min of 2 and max of 30 characters'),
  check('email').isEmail().withMessage('A valid email is required'),
  check('password')
    .isString()
    .withMessage('A password string is required')
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage('password should have a min of 2 and max of 80 characters'),
];

export const signin = [
  check('email', 'A valid email is required')
    .isString()
    .isEmail()
    .isLength({ min: 5, max: 30 }),
  check('password', 'A valid password is required')
    .trim()
    .isString()
    .isLength({ min: 5, max: 30 }),
];
