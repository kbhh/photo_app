import express from "express";
import {
  getUsers,
  updateUserPermissions,
} from "../controllers/adminController";
import { auth, adminAuth } from "../middleware/auth";

const router = express.Router();

router.use(auth);
router.use(adminAuth);

router.get("/users", getUsers);
router.put("/users/:id/permissions", updateUserPermissions);

export default router;
