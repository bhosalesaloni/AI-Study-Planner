const Subject = require("../models/Subject");

// Add Subject
const addSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Subject name is required",
      });
    }

    const subject = await Subject.create({
      name,
    });

    res.status(201).json({
      message: "Subject added successfully",
      subject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add subject",
      error: error.message,
    });
  }
};

// Get Subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });

    res.json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get subjects",
      error: error.message,
    });
  }
};

// Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete subject",
      error: error.message,
    });
  }
};

module.exports = {
  addSubject,
  getSubjects,
  deleteSubject,
};