import express from 'express';

import { signin, signup, handleValidation } from '../middlewares/validators';
import { User } from '../controllers';

const user = express.Router();

user.post('/signup', signup, handleValidation, User.signUp);
user.post('/login', signin, handleValidation, User.signIn);

export default user;
