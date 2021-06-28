import bcrypt from 'bcryptjs';

import { User } from '../models';
import { exitsOr404, response, resolver } from '../helper/http';
import { generateToken } from '../helper/utils';

const UserController = {
  signUp: async (req, res) => {
    const email = req.body.email.toLowerCase();
    const userExists = await User.findOne({ where: { email } });
    exitsOr404(!userExists, 'This user already exists.');

    const { id, username, email: userEmail } = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const newUser = { id, username, email: userEmail };

    const message = 'Signup successful';
    return response({
      res,
      code: 201,
      message,
      data: { token: generateToken(newUser), user: newUser },
    });
  },
  signIn: async (req, res) => {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ errors: ['Email or password is invalid.'] });
    }
    const { id, username, email: userEmail } = user;
    const newUser = { id, username, email: userEmail };
    return response({
      res,
      message: 'Login successful',
      data: { token: generateToken(newUser), user: newUser },
    });
  },
};

export default resolver(UserController);
