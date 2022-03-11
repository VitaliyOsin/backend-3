const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Bearer eiurhvaerhvgpEROUGPEAJPEUTHA
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = tokenService.validateAccess(token);
    req.user = data;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
