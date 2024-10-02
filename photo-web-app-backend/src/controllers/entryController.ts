import { Request, Response } from "express";
import Entry from "../models/Entry";
import User from "../models/User";
import path from "path";

export const createEntry = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = (req.user as User).id;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    const entry = await Entry.create({
      name,
      imagePath,
      userId,
      createdAt: new Date(), // Explicitly set the creation time
    });
    res.status(201).json(entry);
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const where = user.canViewAll ? {} : { userId: user.id };
    const entries = await Entry.findAll({
      where,
      order: [["createdAt", "DESC"]], // Sort by most recent date
      include: [{ model: User, attributes: ["id", "name"] }],
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = req.user as User;
    const entry = await Entry.findOne({ where: { id, userId: user.id } });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    if (!user.canEdit) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit entries" });
    }
    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : entry.imagePath;
    await entry.update({ name, imagePath });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user as User;
    const entry = await Entry.findOne({ where: { id, userId: user.id } });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    if (!user.canDelete) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete entries" });
    }
    await entry.destroy();
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
