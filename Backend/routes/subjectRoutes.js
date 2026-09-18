const express = require("express");

const {
  addSubject,
  getSubjects,
  deleteSubject,
} = require("../controllers/subjectController");

const router = express.Router();

router.post("/", addSubject);
router.get("/", getSubjects);
router.delete("/:id", deleteSubject);

module.exports = router;