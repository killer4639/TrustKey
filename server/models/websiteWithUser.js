const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const websiteWithUserSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  superUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const websiteWithUser = mongoose.model(
  "websiteWithUser",
  websiteWithUserSchema
);

export default websiteWithUser;
