const User = require("../models/userModel");
const Section = require("../models/sectionModel");
const Page = require("../models/pageModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);


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
    console.log(email)
    const user = await User.findOne({ email });

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    console.log(user)

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 30 * 60 * 1000); // 30 min expiry

    user.forgotPasswordOTP = otp;
    user.forgotPasswordOTPExpiry = expiry;
    await user.save();

    // TODO: send OTP via email (e.g., nodemailer)
    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      !user.forgotPasswordOTP ||
      user.forgotPasswordOTPExpiry < new Date() ||
      Number(otp) !== user.forgotPasswordOTP
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.forgotPasswordOTP || user.forgotPasswordOTPExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

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
