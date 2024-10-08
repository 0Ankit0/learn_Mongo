import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//import { LoginLog } from "../Modals/LoginLog.js"; //to keep log of login if you want

export const createJWT = (user) => {
    const token = jwt.sign({ id: user.id, name: user.Name, Role: user.Role }, process.env.JWTSecret);
    return token;
}
export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);// here 5 is known as salt which is used to increase randomness.
}
export const comparePassword = (hash, password) => {
    try {

        return bcrypt.compare(password, hash);
    } catch (error) {
        return false;
    }
}
export const protect = (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401).json({ message: "not authorized" })
        return;
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        res.status(401).json({ message: "Not a token" })
        return;
    }
    try {
        const user = jwt.verify(token, process.env.JWTSecret);
        req.user = user;

        // LoginLog.findOne({ Token: token, logoutTime: { $ne: null } }) //to keep log of login if you want
        //     .then((loginLog) => {
        //         if (loginLog) {
        //             return res.status(401).json({ message: "Token Already used" })
        //         }
        //     });

        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid token" })
    }
}
export function enforceRole(role) {
    return function (req, res, next) {
        if (req.user.Role !== role) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to perform this action" });
        }
        next();
    }
}