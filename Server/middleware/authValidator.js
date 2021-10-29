import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

//initialize env
dotenv.config();

const authValidator = async(req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return res.status(401).json({ status: 'fail', message: 'unauthorized' });
  }
  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id)
    req.user = user._id;
    req.access = user.access;
    next();
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: error });
  }
};

export default authValidator;
