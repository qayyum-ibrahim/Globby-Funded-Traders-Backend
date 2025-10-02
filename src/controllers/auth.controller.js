const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const createJWT = require("../utils/createJWT");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });
  const token = createJWT({ id: user._id, role: user.role });
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};
