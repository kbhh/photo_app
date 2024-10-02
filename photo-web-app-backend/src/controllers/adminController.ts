import { Request, Response } from "express";
import User from "../models/User";
import Entry from "../models/Entry";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "isAdmin",
        "canEdit",
        "canDelete",
        "canViewAll",
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllEntries = async (req: Request, res: Response) => {
  try {
    const entries = await Entry.findAll({
      include: [{ model: User, attributes: ["id", "name", "email"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching all entries:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserPermissions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { canEdit, canDelete, canViewAll } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update({ canEdit, canDelete, canViewAll });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
