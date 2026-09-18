import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [subjectName, setSubjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("");
  const [studyDate, setStudyDate] = useState("");

  // AI states
  const [aiPlan, setAiPlan] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
    fetchTasks();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/subjects`);
      setSubjects(response.data);
    } catch (error) {
      console.log("Error fetching subjects:", error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.log("Error fetching tasks:", error.message);
    }
  };

  // Add Subject
  const addSubject = async (e) => {
    e.preventDefault();

    if (!subjectName.trim()) {
      alert("Please enter subject name");
      return;
    }

    try {
      await axios.post(`${API_URL}/subjects`, {
        name: subjectName,
      });

      setSubjectName("");
      fetchSubjects();

      alert("Subject added successfully!");
    } catch (error) {
      console.log("Error adding subject:", error.message);
      alert("Failed to add subject");
    }
  };

  // Add Task
  const addTask = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskSubject || !studyDate) {
      alert("Please fill all task details");
      return;
    }

    try {
      await axios.post(`${API_URL}/tasks`, {
        title: taskTitle,
        subject: taskSubject,
        studyDate: studyDate,
      });

      setTaskTitle("");
      setTaskSubject("");
      setStudyDate("");

      fetchTasks();

      alert("Study task added successfully!");
    } catch (error) {
      console.log("Error adding task:", error.message);
      alert("Failed to add task");
    }
  };

  // Complete / Uncomplete Task
  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task._id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.log("Error updating task:", error.message);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("Error deleting task:", error.message);
    }
  };

  // Generate AI Study Plan
  const generateStudyPlan = async () => {
    try {
      setAiLoading(true);

      const response = await axios.get(`${API_URL}/ai/generate`);

      setAiPlan(response.data.suggestions);

      if (response.data.suggestions.length === 0) {
        alert("All study tasks are completed!");
      }
    } catch (error) {
      console.log("Error generating AI plan:", error.message);
      alert("Failed to generate study plan");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <h1>🤖 AI Study Planner</h1>
          <p>
            Plan your studies. Track your progress. Achieve your goals.
          </p>
        </div>
      </header>

      <main className="container">

        {/* Add Subject */}
        <section className="card">
          <h2>📚 Add Study Subject</h2>

          <form onSubmit={addSubject} className="form-row">
            <input
              type="text"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />

            <button type="submit">
              Add Subject
            </button>
          </form>
        </section>

        {/* Subjects */}
        <section className="card">
          <h2>📖 My Subjects</h2>

          {subjects.length === 0 ? (
            <p className="empty">
              No subjects added yet.
            </p>
          ) : (
            <div className="subject-list">
              {subjects.map((subject) => (
                <div
                  className="subject"
                  key={subject._id}
                >
                  📘 {subject.name}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Create Task */}
        <section className="card">
          <h2>📝 Create Study Task</h2>

          <form onSubmit={addTask}>

            <input
              type="text"
              placeholder="Enter study task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <select
              value={taskSubject}
              onChange={(e) => setTaskSubject(e.target.value)}
            >
              <option value="">
                Select Subject
              </option>

              {subjects.map((subject) => (
                <option
                  key={subject._id}
                  value={subject._id}
                >
                  {subject.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={studyDate}
              onChange={(e) => setStudyDate(e.target.value)}
            />

            <button type="submit">
              Add Study Task
            </button>

          </form>
        </section>

        {/* Study Plan */}
        <section className="card">

          <div className="section-title">

            <div>
              <h2>📅 My Study Plan</h2>
              <p>Track your study tasks</p>
            </div>

            <div className="task-count">
              {tasks.filter((task) => task.completed).length}
              /
              {tasks.length}
              <span> completed</span>
            </div>

          </div>

          {tasks.length === 0 ? (
            <p className="empty">
              No study tasks yet.
            </p>
          ) : (
            <div className="task-list">

              {tasks.map((task) => (

                <div
                  className={`task ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task._id}
                >

                  <div className="task-left">

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                    />

                    <div>

                      <h3>{task.title}</h3>

                      <p>
                        📚{" "}
                        {task.subject?.name ||
                          "Unknown Subject"}
                      </p>

                      <p>
                        📅{" "}
                        {new Date(
                          task.studyDate
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(task._id)
                    }
                  >
                    🗑️
                  </button>

                </div>

              ))}

            </div>
          )}

        </section>

        {/* AI Study Assistant */}
        <section className="ai-card">

          <div className="ai-icon">
            🤖
          </div>

          <div>
            <h2>AI Study Assistant</h2>

            <p>
              Your AI assistant will help you create a
              personalized study schedule based on your
              subjects and tasks.
            </p>
          </div>

          <button
            className="ai-button"
            onClick={generateStudyPlan}
            disabled={aiLoading}
          >
            {aiLoading
              ? "Generating..."
              : "Generate Study Plan"}
          </button>

          {/* AI Results */}
          {aiPlan.length > 0 && (
            <div className="ai-results">

              <h3>
                🤖 AI Suggested Study Plan
              </h3>

              {aiPlan.map((plan, index) => (

                <div
                  className="ai-suggestion"
                  key={index}
                >

                  <p>
                    <strong>Priority:</strong>{" "}
                    {plan.priority}
                  </p>

                  <p>
                    <strong>Subject:</strong>{" "}
                    {plan.subject}
                  </p>

                  <p>
                    <strong>Task:</strong>{" "}
                    {plan.task}
                  </p>

                  <p>
                    <strong>Study Date:</strong>{" "}
                    {plan.studyDate}
                  </p>

                  <p>
                    💡 {plan.suggestion}
                  </p>

                </div>

              ))}

            </div>
          )}

        </section>

      </main>

      <footer>
        <p>
          AI Study Planner © 2026
        </p>
      </footer>

    </div>
  );
}

export default App;