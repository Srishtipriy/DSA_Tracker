const Profile = require("../models/Profile");
const User = require("../models/User");

// Create or Update Profile
const saveProfile = async (req, res) => {
  try {
    const { leetcodeUrl, hackerrankUrl } = req.body;

    const userId = req.user.id;

    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      profile.leetcodeUrl = leetcodeUrl;
      profile.hackerrankUrl = hackerrankUrl;

      await profile.save();

      return res.status(200).json({
        message: "Profile updated successfully",
        profile,
      });
    }

    profile = await Profile.create({
      user: userId,
      leetcodeUrl,
      hackerrankUrl,
    });

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email"
    );

    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,

      leetcodeUrl: profile.leetcodeUrl,
      hackerrankUrl: profile.hackerrankUrl,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get the dashboard 1 data of leetcode hackerrank URLS
module.exports = {
  saveProfile,
  getProfile,
};