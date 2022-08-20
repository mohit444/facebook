const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateEmail, validateLength } = require("../helpers/validations");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      gender,
      byear,
      bmonth,
      bday,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    let check = await User.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    let user_name = await User.findOne({ username });
    if (user_name) {
      return res.status(400).json({ message: "username is already exits" });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "First name must be between 3 to 30 characters" });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "Last name must be between 3 to 30 characters" });
    }

    if (!validateLength(password, 6, 40)) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 character" });
    }
    let bcryptedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      first_name,
      last_name,
      username,
      email,
      password: bcryptedPassword,
      gender,
      byear,
      bmonth,
      bday,
    }).save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
