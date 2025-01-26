Project Overview
QuestSearch is a full-stack application for searching questions from a database. It showcases seamless gRPC communication between a Node.js backend and a React frontend. The application is fully responsive and provides a clean user interface, supporting advanced features like pagination, filtering, and a dynamic JSON upload feature.

Features
Frontend:
Search box with real-time results.
Pagination for large result sets.
Filtering by question type.
Fully responsive design.
File upload to dynamically manage questions.

Backend:
Developed in Node.js.
gRPC communication for efficient client-server interaction.
MongoDB for storing questions data.
Regex-based search functionality for precise and flexible queries.
Prerequisites
Backend:
Node.js (v16+)
MongoDB (v4+)
Frontend:
Node.js
npm
Tools:
Protocol Buffers Compiler (protoc)

Setup Instructions
Clone the Repository
git clone https://github.com/85Narayan/QuestSearch.git
cd QuestSearch
Backend Setup

Navigate to the backend folder:
cd backend
Install dependencies:
npm install

Set up MongoDB:
Create a database named questsearch.
Import the provided JSON file:
mongoimport --db questsearch --collection questions --file questions.json --jsonArray

Configure environment variables:
Create a .env file:
MONGO_URI=mongodb://localhost:27017/questsearch
GRPC_PORT=50051

Start the backend server:
npm run dev


Frontend Setup
Navigate to the frontend folder:
cd ../frontend
Install dependencies:
npm install
Start the React application:
npm run dev
