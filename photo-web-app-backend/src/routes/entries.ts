import express from "express";
import {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
} from "../controllers/entryController";
import { auth } from "../middleware/auth";
import upload from "../middleware/upload";

const router = express.Router();

router.use(auth);

router.post("/", upload.single("image"), createEntry);
router.get("/", getEntries);
router.put("/:id", upload.single("image"), updateEntry);
router.delete("/:id", deleteEntry);

export default router;
