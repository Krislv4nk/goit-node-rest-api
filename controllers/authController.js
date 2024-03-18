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
    await authServices.updateUser({_id: id}, {token});
    res.json({token, user: {username: user.username, email, subscription: user.subscription}});
}

const getCurrent = async(req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email,
    })
}

const signout = async(req, res)=> {
    const {_id: id} = req.user;
    await authServices.updateUser({_id: id}, {token: ""});
    res.json({message: "Signout success"});
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
};