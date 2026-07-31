import express from "express";

import protect from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

import {
  registerUser,
  loginUser,
  fetchUsers,
  editUserRole,
  removeUser,
} from "../controllers/userController.js";

const router = express.Router();

// ========================================
// Public Routes
// ========================================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// ========================================
// Admin Routes
// ========================================

// Get All Users
router.get(
  "/",
  protect,
  verifyAdmin,
  fetchUsers
);

// Update User Role
router.put(
  "/:id/role",
  protect,
  verifyAdmin,
  editUserRole
);

// Delete User
router.delete(
  "/:id",
  protect,
  verifyAdmin,
  removeUser
);

export default router;