// 토큰 값을 사용해서 유저 찾기
const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
  try {
    // 프론트에서 토큰 값을 해더에 넣어놨다
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("invalid token");
    }
    const token = tokenString.replace("Bearer ", "");

    // 받아온 토큰을 jwt로 통해서 암호화를 푼다
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error("invalid token");
      }

      // 다음 미드웨어에서 사용하기 위해 req 객체에 넣어준다
      req.userId = payload._id;

      // 미드웨어를 사용하여 다음으로 넘어가기
      next();

      // res.status(200).json({ status: "success", userId: payload._id });
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = authController;
