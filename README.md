\# AI Study Planner



AI Study Planner is a full-stack web application that helps students organize their studies by managing subjects, creating study tasks, setting study dates, tracking task completion, and generating AI-based study plan suggestions.



\## Features



\* Add and manage study subjects

\* Create and manage study tasks

\* Set study dates

\* Track task completion

\* Display study plan

\* AI Study Assistant for study plan suggestions

\* MongoDB database integration

\* REST API using Node.js and Express

\* React frontend with Axios



\## Technologies Used



\### Frontend



\* React.js

\* Vite

\* Axios

\* CSS



\### Backend



\* Node.js

\* Express.js

\* MongoDB

\* Mongoose



\### AI



\* AI Study Assistant for generating study plan suggestions



\## Project Structure



```text

AI-Study-Planner/

│

├── Backend/

│   ├── config/

│   ├── controllers/

│   ├── models/

│   ├── routes/

│   ├── server.js

│   └── package.json

│

├── frontend/

│   ├── src/

│   ├── public/

│   └── package.json

│

├── .gitignore

└── README.md

```



\## How to Run the Project



\### Backend



```bash

cd Backend

npm install

node server.js

```



Backend runs on:



```text

http://localhost:5000

```



\### Frontend



Open another terminal:



```bash

cd frontend

npm install

npm run dev

```



Frontend runs on:



```text

http://localhost:5173

```



\## Database



The project uses MongoDB Atlas with Mongoose for storing subjects and study tasks.



\## API Endpoints



\### Subjects



```text

GET    /api/subjects

POST   /api/subjects

```



\### Tasks



```text

GET    /api/tasks

POST   /api/tasks

PUT    /api/tasks/:id

DELETE /api/tasks/:id

```



\### AI Study Assistant



```text

GET /api/ai/generate

```



\## Project Status



The AI Study Planner is a working full-stack project with frontend, backend, database integration, task management, and AI study plan functionality.



