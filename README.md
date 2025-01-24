# Hackathon Project

This project includes both frontend and backend. Depending on whether you're running the backend on a hosting service or locally, you'll need to adjust configurations and start the relevant servers.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-URL>
cd <project-folder>

```
2. Frontend Setup and Run
#### A. If Running Frontend Locally (on Your Laptop)
Navigate to the frontend directory:

```bash
cd frontend

```

Install the dependencies:

```bash
npm install

```

To run the frontend server, use the following command:

```bash
npm run start

```

The frontend server will be available at http://localhost:3000.

#### B. If Running Frontend on Hosting (e.g., Versel)

You can also open the frontend deployed on the hosting at the following address:

[Frontend on the hosting](https://trood-front-hackathon-main-f01ypb9ah.vercel.app)

4. Cors-server 

In another terminal 

```bash
cd frontend
node server.js

```

The CORS server should run on a separate port, http://localhost:8081.

3. Backend Setup and Run
#### A. If Running Backend on Hosting (e.g., Render)
In the store.js file of the frontend, change the API URL from:

```bash
const API_URL = 'http://localhost:8081/http://localhost:8080';

```

to:

```bash
const API_URL = 'http://localhost:8081/https://trood-front-hackathon-main.onrender.com';

```

Now your frontend will use the backend hosted on a platform like Render.

#### B. If Running Backend Locally (on Your Laptop)
In another terminal
Navigate to the backend directory:

```bash
cd backend

```

Start the backend server with the following command:

```bash
go run main.go

```

The backend will be available at http://localhost:8080.

In this case, you don't need to change the URL in the store.js file. The frontend will use the local backend at http://localhost:8080.