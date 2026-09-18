const express = require("express");

const {
  generateStudyPlan,
} = require("../controllers/aiController");

const router = express.Router();

router.get("/generate", generateStudyPlan);

module.exports = router;