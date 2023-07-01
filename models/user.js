const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
// const emailRegexp = "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";

const statesThemes = ["light", "dark"];
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
    },
    email: {
      type: String,
      // math: emailRegexp,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    skype: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    themeInterface: {
      type: String,
      enum: statesThemes,
      default: "light",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
};
