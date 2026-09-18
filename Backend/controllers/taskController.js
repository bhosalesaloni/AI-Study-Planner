const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, subject, studyDate } = req.body;

    if (!title || !subject || !studyDate) {
      return res.status(400).json({
        message: "Title, subject and study date are required",
      });
    }

    const task = await Task.create({
      title,
      subject,
      studyDate,
    });

    const populatedTask = await task.populate("subject");

    res.status(201).json({
      message: "Task created successfully",
      task: populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("subject")
      .sort({ studyDate: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get tasks",
      error: error.message,
    });
  }
};

// Mark Task Complete / Pending
const updateTask = async (req, res) => {
  try {
    const { completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    ).populate("subject");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};