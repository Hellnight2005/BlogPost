# Blogging Application Project

## Project Description
This project is a blogging application developed using Node.js, Express.js, MongoDB, and EJS as the templating engine. It allows users to sign up, sign in, and create, view, and manage blog posts. The application includes user authentication and maintains session state using cookies.

## Project Structure
/blogging-app
│
├── /models
│ ├── blog.js
│ └── user.js
│
├── /routes
│ ├── blog.js
│ └── user.js
│
├── /views
│ ├── home.ejs
│ └── ...
│
├── /public
│ ├── css
│ └── js
│
├── .env
├── app.js
└── package.json

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/blogging-app.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd blogging-app
    ```

3. **Install dependencies:**
    ```sh
    npm install
    ```

4. **Set up the environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    PORT=8000
    MONGODB_URL=mongodb://localhost:27017/mydatabase
    SECRET_KEY=your_secret_key
    ```

5. **Start the server:**
    ```sh
    npm start
    ```

6. **Access the application:**
    Open your browser and navigate to `http://localhost:8000`.

## Features

- **User Authentication:**
  - Sign up and Sign in functionality
  - Session management using cookies
- **Blog Management:**
  - Create, read, update, and delete blog posts
  - View all blogs on the home page
- **Responsive Design:**
  - User-friendly interface with a responsive design

 
This document provides a comprehensive overview of your blogging application project, including the installation steps, features, project structure, code snippets, and environment variables.
