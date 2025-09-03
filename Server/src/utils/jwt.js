import jwt from "jsonwebtoken";
import { JWT_SECRET,JWT_EXPIRES_IN } from '../config/env.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
