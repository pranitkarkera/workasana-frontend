
# Workasana
Workasana is a task management and team collaboration tool where users can create projects, assign tasks, set deadlines, and organize work using tags. It supports authentication, dynamic filtering, URL-based queries, and reporting features to track task progress and team productivity.

## Tech Stack
Frontend: React, Bootstrap, HTML5, CSS, JavaScript

Backend: Node.js, Express.js, JWT, Bcrypt, Mongoose

Database: MongoDB

## Features
User Authentication:

JWT-based authentication

Secure password encryption with Bcrypt

Redirects for protected routes and logout functionality

Project Management:

Create, view, and filter projects by status

Project forms with name and description

Project cards display status, title, and description

Task Management:

Create, assign, and filter tasks by status

Task forms with fields for name, project, team, owners, tags, due date, status, and priority

Dynamic selection for project, team, owners, and tags

Task details with update status feature

Team Collaboration:

Create and manage teams

Team cards display name and member initials

Add members from available options

Reporting:

Dashboard with search for projects/tasks

Reports page with charts (Pie, Bar) using Chart.js

Visualize total work left, work done last week, and tasks closed/opened

User Settings:

Profile section with name and email

Welcome message for logged-in user

Navigation:

Sidebar navigation menu

Logout button visible when logged in

# Frontend
## Pages Overview
Login & Sign Up:

Forms with validation and error messages

Navigation between login and sign up

Dashboard:

Search and filter projects/tasks

View "My Projects" and "My Tasks"

Add new projects and tasks

Projects:

List all projects

Filter and add new projects

Teams:

List and manage teams

Add new teams and select members

Reports:

View work progress and productivity charts

Settings:

View and update profile details

Project Details:

View project info and associated tasks

Filter/sort tasks, add new tasks, update project status

Task Details:

View and update task information

# Backend
## Models
User

Project

Task

Tag

Team

## Security & Validation
All sensitive routes require JWT authentication

Passwords are securely hashed before storage

All user inputs are validated before saving to the database

## Getting Started
Clone the repository.

Install dependencies in both frontend and backend directories.

Set up environment variables as needed.

Start the backend and frontend servers.
