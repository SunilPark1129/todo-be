const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // 만들게 된 이유
    // 1. Schema에서 password를 required: true로 해놨지만, 어째서인지 password 값을 안보내도 가입이 가능해지는 현상을 찾음
    // 2. 영어로 된 error message가 아닌 한글로 값을 반환
    if (name === "" || password === "" || email === "") {
      throw new Error("필요한 정보를 입력해 주세요");
    }

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
    res.status(400).json({ status: "fail", message: error.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");

    if (user) {
      // 두개의 암호가 compareSync를 사용하여 같은지 확인하기
      isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
        const token = user.generateToken();
        res.status(200).json({ status: "success", user, token });
      } else {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
      }
    } else {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다");
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
