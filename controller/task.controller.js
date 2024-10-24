const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const { userId } = req;

    const newTask = new Task({ task, isComplete, author: userId });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    // populate => collection 들을 join-like 해준다
    // ID가 참조하고 있는 것을 그 정보로 replace 해달라는 의미
    const taskList = await Task.find({}).populate("author");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;

    await Task.updateOne(
      { _id: id },
      {
        $set: { isComplete: isComplete },
      }
    );

    // 업데이트 된 데이터를 client로 반환 할 필요성이 없다 생각해서 메시지만 반환했습니다
    // Q) 혹시 안좋은 방법이였을까요? 감사합니다!
    res
      .status(200)
      .json({ status: "ok", message: "task updated successfully" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.deleteOne({ _id: id });

    // 지워진 데이터를 client로 반환 할 필요성이 없다 생각해서 메시지만 반환했습니다
    res
      .status(200)
      .json({ status: "ok", message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;
