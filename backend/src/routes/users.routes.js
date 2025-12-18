import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  login,
  register,
} from "../controllers/user.controller.js";

const router = Router();

// Auth routes
router.post("/login", login);
router.post("/register", register);

// User activity routes
router.post("/add-to-activity", addToHistory);
router.get("/get-all-activity", getUserHistory);

export default router;
