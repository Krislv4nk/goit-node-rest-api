import  HttpError  from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import "dotenv/config"; 
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";

const {JWT_SECRET} = process.env;

const avatarPath = path.resolve("public", "avatars");
 const signup = async(req, res )=> {
    const {email} = req.body;
    const avatarURL = gravatar.url(email);
    const user = await authServices.findUser({email});
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const newUser = await authServices.signup({...req.body, avatarURL});
    res.status(201).json({user:{
    email: newUser.email,
    subscription: newUser.subscription, avatarURL
  }});
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

    res.json({token, user: { email, subscription: user.subscription}});
}

const getCurrent = async(req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email, subscription: req.user.subscription
    })
}

const signout = async(req, res)=> {
    const {_id: id} = req.user;
    await authServices.updateUser({_id: id}, {token: ""});
    res.status(204).json({message: "No Content"});
}

const updateStatus = async(req, res)=> {
    const {subscription} = req.user;
    const {_id: id} = req.user;
    await authServices.updateUser({_id: id}, {subscription});
    res.status(200).json({subscription});
}

const updateAvatar = async(req, res)=> {
    const {_id: id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${id}_${originalname}`;
    const uploadDir = path.join(avatarPath, filename);
    await fs.rename(tempUpload, uploadDir);
    const avatarURL = path.join("avatars", filename);
    await authServices.updateUser({_id: id}, {avatarURL});
    res.json({avatarURL});
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateStatus: ctrlWrapper(updateStatus),
    updateAvatar: ctrlWrapper(updateAvatar),
};