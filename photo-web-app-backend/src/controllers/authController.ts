import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const ADMIN_CREATION_TOKEN =
  process.env.ADMIN_CREATION_TOKEN || "secret-admin-token";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, adminToken } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdmin = adminToken === ADMIN_CREATION_TOKEN;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      canEdit: isAdmin,
      canDelete: isAdmin,
      canViewAll: isAdmin,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Add logging to see what's being received
    console.log("Login attempt:", { email, password: "******" });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    console.log("Login successful for user:", user.email);
    res.json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    // The user should be attached to the request by the auth middleware
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Send back user info, excluding the password
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      canEdit: user.canEdit,
      canDelete: user.canDelete,
      canViewAll: user.canViewAll,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: "Logged out successfully" });
};
