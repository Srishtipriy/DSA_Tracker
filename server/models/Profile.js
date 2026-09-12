/*Mongoose is a Node.js library that helps our backend talk to MongoDB.

Instead of writing complicated MongoDB queries, we write:  -->"Create another collection "users" in the same MongoDB database." 

MongoDB Database
│
├── Users Folder
├── Profiles Folder
└── Friends Folder           Same MongoDB database ✅ Same Mongoose connection ✅ Different collections ✅*/

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    leetcodeUrl: {
      type: String,
      default: "",
    },

    hackerrankUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);