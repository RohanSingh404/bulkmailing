const mongoose = require("mongoose");
const { hashPassword } = require("../utils/hashPassword");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true, // ensures no duplicates
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await hashPassword(this.password);
    //console.warn(this.password);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
