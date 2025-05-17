# Workasana

**Workasana** is a comprehensive task management and team collaboration tool. Users can create projects, assign tasks, set deadlines, organize work using tags, and collaborate efficiently. The platform supports robust authentication, dynamic filtering, URL-based queries, and insightful reporting features to track task progress and team productivity.

---

## 🚀 Tech Stack

### Client
- **React**
- **Bootstrap**
- **HTML5**
- **CSS**
- **JavaScript**

### Server
- **NodeJS**
- **ExpressJS**
- **JWT (JSON Web Token)**
- **Bcrypt**
- **Mongoose**

---

## 🗂️ Features

### Frontend

#### Authentication
- [x] **Login Page**
  - [x] Login form with Email and Password fields
  - [x] Error message on invalid input
  - [x] Log In button
  - [x] Link to Sign Up page

- [x] **Sign Up Page**
  - [x] Sign Up form with Name, Email, and Password fields
  - [x] Error message on invalid input
  - [x] Sign Up button
  - [x] Link to Log In page

- [x] **Authentication Handling**
  - [x] Checks for a valid JWT token in `localStorage` to confirm authentication
  - [x] Redirects unauthenticated users to Login page for protected routes
  - [x] Logout functionality clears token and redirects to Login

#### Dashboard
- [x] Search bar to search Projects and Tasks by title or name
- [x] **My Projects** section: view projects created by the user
- [x] Filter Projects by status
- [x] Add new Project button (opens Project form)
- [x] **My Tasks** section: view tasks assigned to the user
- [x] Filter Tasks by status
- [x] Add new Task button (opens Task form)

#### Project Form
- [x] Project name and Description input fields
- [x] Add Project button

#### Task Form
- [x] Task name, Project name, Team name, Owners, Tags, Completion date, Status, and Priority fields
- [x] Project, Team, Owners, and Tags must be selected from available options
- [x] Add Task button

#### Projects Page
- [x] Display all available projects as cards (status, title, description)
- [x] Filter projects by status
- [x] Add new Project button (opens Project form)

#### Teams Page
- [x] Display available teams as cards (Team Name, member initials)
- [x] Add new Team button (opens Team form)

#### Team Form
- [x] Team name, description, and members fields
- [x] Members selected from available options
- [x] Add Team button

#### Reports Page
- [x] 3 reports displayed as charts using Chart.js:
  - [x] Total work left
  - [x] Total work done in last week
  - [x] Number of tasks closed/opened

#### Settings Page
- [x] Welcome message with logged-in user’s name
- [x] Profile details: user name and email

#### Side Navigation
- [x] Sidebar navigation menu
- [x] Logout button (visible when logged in)

#### Project Details Page
- [x] Show project details
- [x] Show associated tasks
- [x] Filter tasks (by priority, newest/oldest, status)
- [x] Add new Task button
- [x] Update project status

#### Task Details Page
- [x] Show task details
- [x] Update task status

---

### Backend

#### Models
- [x] **User**
- [x] **Project**
- [x] **Task**
- [x] **Tag**
- [x] **Team**

#### Authentication
- [x] JWT authentication for protected routes
- [x] Passwords encrypted with Bcrypt before storage

#### Form Handling
- [x] Thorough validation of all user inputs before storing in the database

---

## 📊 Reporting

- [x] **Pie Chart:** Total work left
- [x] **Bar Chart:** Total work done in last week
- [x] **Bar Chart:** Number of tasks closed vs. opened

---

## 📦 Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/your-username/workasana.git
    cd workasana
    ```

2. **Install dependencies:**
    ```
    npm install
    cd frontend
    npm install
    ```

3. **Configure environment variables:**
    - Create a `.env` file in the root and server directories. Add your MongoDB URI and JWT secret.

4. **Run the development server:**
    ```
    # In one terminal
    npm run dev

    # In another terminal, for the client
    cd frontend
    npm start
    ```
