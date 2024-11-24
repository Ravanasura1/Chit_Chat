import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req,res) => {
  const {email, password, fullName} = req.body;
  try {
    if(!email || !password || !fullName) {
      return res.status(400).json({message: "All the fields are required"});
    }

    if(password.length < 6) {
      return res.status(400).json({message: "Password must be at least 6 characters long"});
    }

    const user = await User.findOne({email});
    if(user) {
      return res.status(400).json({message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({email, password: hashedPassword, fullName});
    if(newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({message: "User created successfully"});
    }
    else {
      return res.status(400).json({message: "Invalid user data"});
    }
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);
    
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.status(200).json(userWithoutPassword);

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req,res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName } = req.body;
    const userId = req.user._id;

    let updateData = {};

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "chat_app_profiles",
        resource_type: "auto",
        width: 500,
        height: 500,
        crop: "fill",
        quality: "auto"
      });
      
      updateData.profilePic = uploadResponse.secure_url;
    }

    if (fullName) {
      updateData.fullName = fullName;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ 
      message: error.message || "Failed to update profile"
    });
  }
};

const checkAuth = (req,res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
}

export {signup, login, logout, updateProfile, checkAuth};
