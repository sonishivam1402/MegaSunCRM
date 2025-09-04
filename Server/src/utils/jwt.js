import jwt from "jsonwebtoken";
import { JWT_SECRET,JWT_EXPIRES_IN, REFRESH_SECRET, REFRESH_TOKEN_EXPIRES_IN } from '../config/env.js';

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};