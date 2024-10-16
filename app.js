const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();

app.use(bodyParser.json());

// 해당 path를 호출하면 indexRouter(routes)를 불러온다
// path를 붙이는건 필수가 아니지만 좋은 습관 및 깔끔한 코딩이다
app.use("/api", indexRouter);

const mongoURI = "mongodb://localhost:27017/todo-demo";

// useNewUrlParser - 최신 mongoose에서도 잘 호환하게 도와달라는 옵션
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(5000, () => {
  console.log("server on 5000");
});
