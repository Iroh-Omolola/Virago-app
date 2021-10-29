import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from 'dotenv'

dotenv.config();

const Auth = {
register: async (req, res) => {
   
    const { username, email, password } = req.body;

    if (!username || !email || !password ) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please fill all fields' });
    }
    // check if not female
    

    //find if email already exist

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User already exist' });
    }
    

    //password hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (hash) {
      const newUser = new User({ username, email, password: hash });
      const savedUser = await newUser.save();

      if (savedUser) {
        jwt.sign(
          { id: savedUser._id },
          process.env.SECRET,
          { expiresIn:'50d' },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.status(200).json({
              status: 'success',
              data: {
                token: "Bearer " + token,
                savedUser
              },
              message: 'registered successfully',
            });
          }
        );
      }
    }
  },

 login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("user not found");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")
  
      jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn:'50d' },
        (err, token) => {
          if (err) {
            throw err;
          }else{
            console.log(token)
          }
       res.status(200).json({user,token});
        }
      )
    } catch (err) {
      res.status(500).json(err)
    }
}
}
export default Auth;