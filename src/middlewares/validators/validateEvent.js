import { check } from 'express-validator';

export const eventName = [
  check('name')
    .isString()
    .withMessage('A valid name is required')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Event name should have a min of 2 and max of 30 characters'),
];

export const subEventName = [
  check('eventName')
    .isString()
    .withMessage('A valid name is required')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Event name should have a min of 2 and max of 30 characters'),
  check('subEventName')
    .isString()
    .withMessage('A valid name is required')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('SubEvent name should have a min of 2 and max of 30 characters'),
];
