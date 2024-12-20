# Todo App Challenge

## Overview
This repository contains the implementation of Todo App with key features such as fetching todos and users, creating and task updating and deleting,etc... It includes a user interface built using Reactjs,React Context ,React Query, React Router and Tailwindcss for styling my components an interactive dashboard, and solutions to coding challenges.

## Features
- **Task Management**: Add, edit, delete, and mark tasks as completed.
- **Responsive Design**: Optimized for various screen sizes.
- **Dark Mode**: Toggle between light and dark themes.
- **Multi-language Support**: Interface available in English and French.
- **CRUD Operations**: Integrates with a dummy API to handle todos.
- **Testing**: Unit and component tests using Jest and React Testing Library.

## Technologies Used
- **React** (with TypeScript)
- **React Router**: For navigation.
- **React Query**: For data fetching and state management.
- **Context API**: For global state management.
- **Tailwind CSS**: For responsive styling.
- **Jest & React Testing Library**: For unit and component testing.


## Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/buka1calvin/todo-App
    cd todo-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the App**:
    ```bash
    npm run dev
    ```
   This will start the application on `http://localhost:3000`.


## Gallery web-Solution

### Screens and all these Screens are Responsive

### home Page

The homepage provides an introduction to the platform with a clean and user-friendly design. 

![Alt Text](/public/images/Capture001.PNG)

### Dashboard

Users can switch between light and dark themes for a personalized experience.


![Alt Text](/public/images/Capture002.PNG)

### Dashboard - Projects

The Projects section allows users to view and select from a range of mock projects. It includes filtering and search functionalities for easy navigation.

![Alt Text](/public/images/Capture003.PNG)

### Project Overview

When a project is selected, users can access an overview that displays project details, recent chat history, and the team involved. Multi-language support (English and French) is also available.


![Alt Text](/public/images/Capture004.PNG)
![Alt Text](/public/images/Capture009.PNG)


### Task Management

The user can filter project tasks by various criteria for effective task management.

![Alt Text](/public/images/Capture.PNG)

### Task Assignment

Users can assign team members to specific tasks, streamlining collaboration.


![Alt Text](/public/images/Capture006.PNG)

### Task Creation

Users have the ability to create new tasks and assign them to team members.


![Alt Text](/public/images/Capture007.PNG)

### Task Updates

Users can update existing tasks, making it easy to track progress and make adjustments as needed.


![Alt Text](/public/images/Capture008.PNG)

## Gallery Summary

This gallery solution provides a comprehensive project management platform with robust features to help users organize and collaborate effectively. Let me know if you'd like further adjustments!

## Testing

### Run Unit and Component Tests
```bash
npm run test

```
## Deployment

The app is deployed on Vercel.
 to deploy locally 

 ```bash

 npm run build

 ```

 ## Folder Structure

```

.
├── src
│   ├── assets          # Static assets like images and icons
│   ├── constants       # Application-wide constants (e.g., config values)
│   ├── components      # Reusable React components
│   ├── contexts        # Context providers (e.g., for theme, language)
│   ├── hooks           # Custom hooks for shared logic
│   ├── layouts         # Layout components for consistent page structure
│   ├── pages           # Page components for routing
│   ├── utils           # Utility functions for common tasks
│   ├── types           # TypeScript type definitions and interfaces
│   ├── App.tsx         # Main app component that wraps the app
│   ├── main.tsx        # Entry point for rendering the React application
│   └── index.css       # Global CSS, including Tailwind CSS setup
├── README.md           # Documentation file for the project
└── package.json        # Project dependencies and scripts


```
