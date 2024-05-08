import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from '../utils/error.js';


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
 
      
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    } 

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error)
  }
};

export { signup };
