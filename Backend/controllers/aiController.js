const Subject = require("../models/Subject");
const Task = require("../models/Task");

const generateStudyPlan = async (req, res) => {
  try {
    const subjects = await Subject.find();
    const tasks = await Task.find()
      .populate("subject")
      .sort({ studyDate: 1 });

    if (subjects.length === 0) {
      return res.status(400).json({
        message: "Please add subjects first",
      });
    }

    if (tasks.length === 0) {
      return res.status(400).json({
        message: "Please add study tasks first",
      });
    }

    const pendingTasks = tasks.filter((task) => !task.completed);

    const suggestions = pendingTasks.map((task, index) => ({
      priority: index + 1,
      subject: task.subject?.name || "Unknown Subject",
      task: task.title,
      studyDate: new Date(task.studyDate).toLocaleDateString(),
      suggestion: `Spend 45 minutes studying ${task.title}. Take a 10-minute break after the session.`,
    }));

    res.json({
      message: "AI study plan generated successfully",
      totalSubjects: subjects.length,
      totalTasks: tasks.length,
      pendingTasks: pendingTasks.length,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate study plan",
      error: error.message,
    });
  }
};

module.exports = {
  generateStudyPlan,
};