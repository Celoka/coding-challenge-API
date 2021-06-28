import { check } from 'express-validator';

export const eventName = [
  check('name')
    .isString()
    .withMessage('A valid name is required')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage('Event name should have a min of 8 and max of 16 characters'),
];

export const subEventName = [
  check('eventName')
    .isString()
    .withMessage('A valid name is required')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage('Event name should have a min of 8 and max of 16 characters'),
  check('subEventName')
    .isString()
    .withMessage('A valid name is required')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage('SubEvent name should have a min of 8 and max of 16 characters'),
];
