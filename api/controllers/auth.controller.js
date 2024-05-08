import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  try {      
    if (!emailRegex.test(email)) {
      return next(errorHandler(400,"Invalid email format"));
    } 

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400,"User already exists"));
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


const signin = async(req,res,next) => {
  const { email, password } = req.body;
  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404,"User not found"));
    }

    const isPasswordCorrect = await bcryptjs.compare(password, validUser.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(401,"Wrong credentials"));
    }
    // Token'i oluşturuyoruz
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    // Kullanıcının şifresini haslenmiş olsa bile görmek istemiyoruz
    const {password:pass,...rest} = validUser._doc;
   // Token'i cookide saklıyoruz
   //HttpOnly:true ile sadece server tarafından okunabilir olmasını sağlıyoruz
    res.cookie('access_token',token,{
      httpOnly:true,
      maxAge:24*60*60*1000 // 1 day
    });
    res.status(200).json({ 
      message: "User signed in successfully",
      rest,
     });
  } catch (error) {
    next(error)
  }
}

export { signup, signin};
