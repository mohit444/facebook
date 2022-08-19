const User = require("../models/User");

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
    const user = await new User({
      first_name,
      last_name,
      username,
      email,
      password,
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
