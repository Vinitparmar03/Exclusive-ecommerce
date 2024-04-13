import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
const saltRounds = 10;
export const registerUser = async (req, res, next) => {
  const { name, email, password, gender, dob } = req.body;
  console.log(name, email, password, gender, dob);

  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new ErrorHandler("User already exists", 400);
    }

    if (!name || !email || !password || !gender || !dob) {
      throw new ErrorHandler("Please provide all required fields", 400);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      dob,
    });

    await newUser.save();

    const sessionData = { id: newUser._id, name, email, role: "user" };

    req.session.data = sessionData;
    req.session.authenticated = true;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: sessionData,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        throw new ErrorHandler("Invalid email or password", 401);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new ErrorHandler("Invalid email or password", 401);
      }

      const sessionData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      req.session.authenticated = true;
      req.session.data = sessionData;

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: sessionData,
      });
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.clearCookie("userData");
      res.status(200).json({ success: true, message: "Logout successful" });
    });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const saveDetails = async (req, res) => {
  try {
    const { address, phoneNumber, email } = req.body;
    const { id } = req.query;
    const user = await User.findOne({ _id: id });

    console.log(user);

    if (!user) {
      throw new ErrorHandler("Invalid user ID", 400);
    }

    if (email) user.email = email;

    if (address) user.address = address;
    if (phoneNumber) {
      if (phoneNumber.length !== 10)
        throw new ErrorHandler("Phone number should be 10 digits long", 400);
      user.phoneNumber = phoneNumber;
    }
    await user.save();

    console.log(user);

    return res.status(200).json({
      success: true,
      message: "Details saved successfully",
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getSession = async (req, res) => {
  if (req.session.authenticated && req.session.data) {
    const user = req.session.data;
    res.cookie("userData", JSON.stringify(user), {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ userData: req.session.data });
  } else {
    res.status(200).json({ userData: null });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to fetch users", 500));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      throw new ErrorHandler("Invalid Id", 400);
    }

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
