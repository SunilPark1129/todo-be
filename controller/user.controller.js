const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // 중복 확인하기
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입 된 유저 입니다");
    }

    // 암호화하기
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // DB에 저장
    const newUser = new User({ email, name, password: hash });
    await newUser.save();

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
};

module.exports = userController;
