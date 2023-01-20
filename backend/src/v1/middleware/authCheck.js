const jwt = require('jsonwebtoken');
let User = require("../../models/User.model");
async function authCheck(req, res, next) {
  const token = req.cookies['token'];
  if (!token) {
    return res.status(403).json({ err: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    let user = await User.findOne({ _id: decoded.user_id });
    if (!user) return res.status(401).json({ err: "Invalid Token" });
    decoded['Username'] = user.Username;
    decoded['Phone'] = user.Phone;
    decoded['Role'] = user.Role;
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ err: "Invalid Token" });
  }
  return next();
}
module.exports = authCheck;