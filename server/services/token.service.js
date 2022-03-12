const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  // return accessToken, refreshToken, exporesIn
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecret"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"));
    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  async save(user, refreshToken) {
    const data = await Token.findOne({ user });

    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }

    const token = Token.create({ user, refreshToken });
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecret"));
    } catch (err) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessSecret"));
    } catch (err) {
      return err;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (err) {
      return null;
    }
  }
}

module.exports = new TokenService();
