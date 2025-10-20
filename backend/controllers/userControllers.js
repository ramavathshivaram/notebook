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
      populate: [
        { path: "pages", select: "-content" }, 
        { path: "canvases",select: "-content" },
      ],
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
      `<div style="
      font-family: Arial, sans-serif; 
      max-width: 600px; 
      margin: auto; 
      padding: 30px; 
      border: 2px solid #000; 
      border-radius: 15px; 
      background-color: #fff; 
      text-align: center; 
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  ">
      <h2 style="
          color: #000; 
          font-size: 28px; 
          margin-bottom: 15px; 
          text-transform: uppercase;
          letter-spacing: 1px;
      ">
          Password Reset OTP
      </h2>
      
      <p style="
          font-size: 16px; 
          color: #333; 
          margin-bottom: 25px;
      ">
          Use the OTP below to reset your password. It is valid for 10 minutes.
      </p>
      
      <div style="
          display: inline-block; 
          padding: 20px 40px; 
          font-size: 28px; 
          font-weight: bold; 
          color: #000; 
          border: 2px dashed #000; 
          border-radius: 10px; 
          margin-bottom: 25px;
          letter-spacing: 2px;
      ">
          ${otp}
      </div>
      
      <p style="font-size: 14px; color: #555; margin-bottom: 25px;">
          Do not share this OTP with anyone.
      </p>
      
      <a href="${process.env.FRONTEND_URL}/forgot-password/${user._id}" 
        style="
          display: inline-block; 
          padding: 14px 30px; 
          font-size: 16px; 
          font-weight: bold; 
          text-decoration: none; 
          color: #fff; 
          background-color: #000; 
          border-radius: 8px;
          transition: all 0.3s ease;
      "
        onmouseover="this.style.backgroundColor='#333'; this.style.transform='scale(1.05)';"
        onmouseout="this.style.backgroundColor='#000'; this.style.transform='scale(1)';"
      >
        Verify OTP
      </a>
      
      <p style="font-size: 12px; color: #777; margin-top: 30px;">
          If you didn’t request a password reset, please ignore this email.
      </p>
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
