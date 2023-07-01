const { HttpError, ctrlWrapper } = require("../helpers/index");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      birthday: newUser.birthday,
      phone: newUser.phone,
      skype: newUser.skype,
      avatarURL: newUser.avatarURL,
      themeInterface: newUser.themeInterface,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      birthday: user.birthday,
      phone: user.phone,
      skype: user.skype,
      avatarURL: user.avatarURL,
      themeInterface: user.themeInterface,
    },
  });
};

const changePassword = async (req, res) => {
  const { _id } = req.user;
 
  const { password, newPassword } = req.body;
  console.log(req.body)
  const user = await User.findOne({ _id });
  
 
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Password invalid");
  }

  const hashNewPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(_id, { password: hashNewPassword });

  res.status(200).json({
    message: "Successfull change password"
  })
};

const getCurrent = async (req, res) => {
  const {
    email,
    name,
    birthday,
    phone,
    skype,
    avatarURL,
    themeInterface,
    _id,
  } = req.user;

  res.json({
    id: _id,
    email,
    name,
    birthday,
    phone,
    skype,
    avatarURL,
    themeInterface,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const update = async (req, res) => {
  const { _id } = req.user;
  if (req.body.birthday) {
    const currentDate = new Date();
    const birthdayDate = new Date(req.body.birthday);
    if (birthdayDate >= currentDate) {
      throw HttpError(
        400,
        "Birthday must not match or be less than the current date"
      );
    }
  }

  if (req.file) {
    const avatarURL = req.file.path;
    await User.findByIdAndUpdate(_id, { avatarURL, ...req.body });
  }

  await User.findByIdAndUpdate(_id, { ...req.body });
  const user = await User.findById(_id);
  res.json({
    email: user.email,
    name: user.name,
    birthday: user.birthday,
    phone: user.phone,
    skype: user.skype,
    avatarURL: user.avatarURL,
    themeInterface: user.themeInterface,
  });
};

const toggleThemes = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  let newTheme = "";
  switch (user.themeInterface) {
    case "light":
      newTheme = "dark";
      break;
    case "dark":
      newTheme = "light";
      break;
    default:
      newTheme = "light";
  }
  await User.findByIdAndUpdate(_id, { themeInterface: newTheme });
  res.json({
    themeInterface: newTheme,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  update: ctrlWrapper(update),
  toggleThemes: ctrlWrapper(toggleThemes),
  changePassword: ctrlWrapper(changePassword),
};
