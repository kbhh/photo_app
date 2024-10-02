import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && (req.user as User).isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};
