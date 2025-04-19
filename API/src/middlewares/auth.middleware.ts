import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import errorHandler from "../utils/errorHandler";

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: {
    userID: number;
    username: string;
    email: string;
  };
}

export type UserData = {
  userID: number;
  username: string;
  email: string;
}

export default function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ errors: [{ message: "authorization denied", path: "missing authorization" }] });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) throw new Error("TOKEN_SECRET não configurado");

    const decoded = jwt.verify(token, secret) as { userID: number; username: string; email: string };
    req.user = decoded;

    return next();
  } catch (error) {
    return errorHandler(error, res);
  }
}
