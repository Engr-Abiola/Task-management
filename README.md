# React Task Management App

A modern **Task Management System** built with **React.js**, designed to manage personal and team tasks efficiently.  
This app provides **role-based access** for different users — **Super Admin**, **Admin**, and **User** — and stores data locally using **browser localStorage** for quick prototyping.

---

## Overview

The **React Task Management App** allows users to create, assign, and monitor tasks seamlessly.  
It includes user authentication, dynamic dashboards, and workflow logic tailored to each role.

Roles include:

- **Super Admin** – Oversees everything, manages users, and can view all tasks.  
- **Admin** – Manages users assigned to them and monitors their progress.  
- **User** – Creates and executes personal tasks or requests tasks from others.

---

## Features

-  **Role-based Authentication**
  - Users can sign up as Super Admin, Admin, or User.
  - Limits: only one Super Admin, two Admins, unlimited Users.
-  **Task Management**
  - Create tasks for yourself or assign them to others.
  - Task fields include: *Task Name*, *Description*, *Due Date*, *Completion Date*, and *Execution Mode*.
-  **Smart Workflow**
  - Tasks move through statuses: Pending Request → In Progress → Completed / Rejected.
-  **Dashboard**
  - Personalized dashboard depending on the user’s role.
  - Quick overview of task analytics.
-  **Form Validation**
  - All signup and task forms use React validation logic for clean input handling.
-  **LocalStorage Data Persistence**
  - Stores signup and task data in localStorage for simulation and testing.
-  **Responsive UI**
  - Clean layout using modern CSS grid and Flexbox.

---

##  Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js |
| Styling | CSS3 (Flexbox & Grid) |
| Icons | Lucide React |
| State Management | React Hooks (`useState`, `useReducer`) |
| Data Storage | Browser LocalStorage |
| Form Handling | React Hook Form |

---

## Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/your-username/react-task-management-app.git
