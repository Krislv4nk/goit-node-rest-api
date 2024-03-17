import  HttpError  from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import { userSignupSchema, userSigninSchema} from "../schemas/usersSchemas.js";
import jwt from "jsonwebtoken";
import "dotenv/config"; 


const {JWT_SECRET} = process.env;

 const signup = async(req, res )=> {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const newUser = await authServices.signup(req.body);
    res.status(201).json({username: newUser.username,
         email: newUser.email, subscription: newUser.subscription,});
}  
const signin = async(req, res )=> {
    const {email, password} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const comparePassword = await authServices.validatePassword(password, user.password);
    if(!comparePassword) {
        throw HttpError(401, "Email or password is wrong");
    }
    const {_id: id} = user;
    const payload = {id, email};
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await authServices.updateToken({_id: id}, token);
    res.json({token, user: {email, subscription: user.subscription}});
}


export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
};