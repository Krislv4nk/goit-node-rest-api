import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";

const {JWT_SECRET} = process.env;

const authenticate = (req, _, next) => {
       const {authorization} = req.headers;
       if (!authorization) {
          return next (HttpError(401, "Authorization header not found"));
       }
       const [bearer, token] = authorization.split(" ");
       if (bearer !== "Bearer") {
          return next(HttpError(401, "Invalid token"));
       }
       try {
          const {id} = jwt.verify(token, JWT_SECRET);
         const user = findUser({_id: id});
         if(!user) {
            return next(HttpError(401, "User not found"));
         }
         // if(!user.token) {
         //    return next(HttpError(401, "Not authorized"));
         // }
         req.user = user;
         next();
       } catch (error) {
          next(HttpError(401, error.message));
       }
    };
    
   export default  authenticate;