import User from "../models/User.js";
import mongoose from "mongoose";
export const getLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return 404 if user doesn't exist
    }

    // Trim spaces from both stored password and input password to avoid whitespace issues
    const storedPassword = user.password.trim();
    const inputPassword = password.trim();

    console.log("Stored password:", storedPassword); // Log stored password for debugging
    console.log("Input password:", inputPassword); // Log input password for debugging

    // Compare the stored password with the input password
    if (storedPassword !== inputPassword) {
      return res.status(401).json({ message: "Invalid password" }); // Return 401 if passwords don't match
    }

    // If passwords match, return success message with user info
    return res.status(200).json({ 
        message: "Login successful", 
        user: { name: user.name, email: user.email },
    });
    

  } catch (error) {
    // Catch any errors during the process
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};