import asyncHandler from "express-async-handler";


const updateUser = asyncHandler(async (req, res) => {
  try {
    const { darkMode } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (darkMode != null) {
      console.log(darkMode);
      user.isDarkMode = darkMode;
    }
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})

export default {
  updateUser
};
