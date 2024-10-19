const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");

// tasks라는 주소가 불리면 정의해놓은 taskApi가 불리게 된다
router.use("/tasks", taskApi);
router.use("/user", userApi);

module.exports = router;
