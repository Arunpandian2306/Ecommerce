import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "All fields (username, email, password) are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    const trimmedPassword = password.trim();
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const newUser = await UserModel.create(
      {
        username,
        email,
        password_hash: hashedPassword,
        role: "customer",
      },
      { hooks: false }
    );

    console.log("User after creation:", newUser.toJSON());

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const trimmedPassword = password.trim();
    console.log("Password during login:", trimmedPassword);
    console.log("Stored hash during login:", user.password_hash);

    const isValidPassword = await bcrypt.compare(
      trimmedPassword,
      user.password_hash
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};
export const createAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "All fields (username, email, password) are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    const trimmedPassword = password.trim();
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const newUser = await UserModel.create(
      {
        username,
        email,
        password_hash: hashedPassword,
        role: "admin",
      },
      { hooks: false }
    );

    console.log("User after creation:", newUser.toJSON());

    const token = generateToken(newUser);

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
};
