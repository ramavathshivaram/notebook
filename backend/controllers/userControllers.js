const User = require("../models/userModel");
const Section = require("../models/sectionModel");
const Page = require("../models/pageModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const sendMail = require("../config/nodeMailler");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const checkPasswordExpiry = async (user, res) => {
  try {
    if (
      user.forgotPasswordOTPExpiry != null &&
      user.forgotPasswordOTPExpiry < new Date()
    ) {
      user.forgotPasswordOTP = null;
      user.forgotPasswordOTPExpiry = null;
      await user.save();
      res.status(400).json({ message: "OTP expired" });
      return true;
    }
    return false;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check user exits
    let user = await User.findOne({ email });

    if (!user) {
      //add user if not exits
      await User.create({
        email,
        password,
      });
    }

    user = await User.findOne({ email }).populate({
      path: "sections",
      populate: { path: "pages", select: "-content" },
    });
    if (!(await user.matchPassword(password))) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", status: false, error: true });
    }
    const token = generateToken(user._id);

    res
      .status(200)
      .json({ token, user, message: "success", status: true, error: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (await checkPasswordExpiry(user, res)) return;

    if (user.forgotPasswordOTP && user.forgotPasswordOTPExpiry > new Date()) {
      return res.status(400).json({ message: "OTP already sent" });
    }

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    user.forgotPasswordOTP = otp;
    user.forgotPasswordOTPExpiry = expiry;
    await user.save();

    // console.log(`OTP for ${email}: ${otp}`);

    sendMail(
      email,
      "Password Reset OTP",
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9; text-align: center;">
          <h2 style="color: #333;">Password Reset OTP</h2>
          <p style="font-size: 16px; color: #555;">Use the OTP below to reset your password. It is valid for 10 minutes.</p>
          <p style="font-size: 24px; font-weight: bold; color: #2d89ff; margin: 20px 0;">${otp}</p>
          <p style="font-size: 14px; color: #777;">Do not share this OTP with anyone.</p>
          <a href="${process.env.FRONTEND_URL}/forgot-password/${user._id}" 
            style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #2d89ff; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify OTP
          </a>
          <p style="font-size: 12px; color: #aaa; margin-top: 20px;">If you didn’t request a password reset, please ignore this email.</p>
      </div>`
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user);
    if (await checkPasswordExpiry(user, res)) return;

    if (Number(otp) !== user.forgotPasswordOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP verified", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user);

    if (await checkPasswordExpiry(user, res)) return;

    user.password = password; // will be hashed automatically in pre-save
    user.forgotPasswordOTP = null;
    user.forgotPasswordOTPExpiry = null;

    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  auth,
  sendOTP,
  verifyOTP,
  resetPassword,
};
