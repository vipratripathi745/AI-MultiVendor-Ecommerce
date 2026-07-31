import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken.js";

import {
  findUserByEmail,
  createUser,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from "../models/userModel.js";

// ========================================
// Register User
// ========================================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
      name,
      email,
      hashedPassword,
      "customer",
      phone
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token: generateToken(user.id),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
};

// ========================================
// Login User
// ========================================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",

      token: generateToken(user.id),

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};

// ========================================
// Admin - Get All Users
// ========================================
export const fetchUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// ========================================
// Admin - Update User Role
// ========================================
export const editUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "Role is required",
      });
    }

    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = await updateUserRole(
      req.params.id,
      role
    );

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update user role",
    });
  }
};

// ========================================
// Admin - Delete User
// ========================================
export const removeUser = async (req, res) => {
  try {
    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await deleteUser(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};