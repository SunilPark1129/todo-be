const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 이 경로의 api를 사용할때 항상 이 규칙을 적용한다
userSchema.methods.toJSON = function () {
  // ** this를 리턴하면 스키마가 들고있는 객체를 볼 수 있다
  // return this;

  const obj = this._doc;
  delete obj.password;
  return obj;
};

// 토큰 만들기
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this.id }, JWT_SECRET_KEY, { expiresIn: "1d" });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
