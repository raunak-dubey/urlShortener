import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generateNanoId = (length) => {
    return nanoid(length);
}
export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
}

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}

export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};