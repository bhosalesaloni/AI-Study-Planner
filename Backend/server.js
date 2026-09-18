const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const subjectRoutes = require("./routes/subjectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// Routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// AI Route Test
app.get("/api/ai/test", (req, res) => {
  res.json({
    message: "AI route is working",
  });
});

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "AI Study Planner Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});