import jwt from "jsonwebtoken";
import { TUserToken } from "../types/TUser";

const secret = process.env.JWT_SECRET || 'projLunar';

export const generateToken = (user: TUserToken) => {
    return jwt.sign({ userWtp: user.userWtp, role: user.role, subRole: user.subRole }, secret, {
        expiresIn: "3d",
    });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

export const decodeToken = (token: string) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
};