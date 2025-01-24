# Task Management Frontend

A modern React application for task management and social feed with drag-and-drop functionality and image sharing capabilities.

## Features

- 🔐 Authentication with Email/Password and Google OAuth
- 📋 Kanban-style Task Management
- 🖱️ Drag and Drop Task Organization
- 📱 Social Feed with Image Sharing
- 🎨 Responsive Material Design

## Tech Stack

- React 18
- React Router v6
- React Beautiful DND
- Tailwind CSS
- Cloudinary (Image Upload)
- React-Toastify

## Prerequisites

Before you begin, ensure you have Backend API server running

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sunilkumar27/affworld-front-end.git
cd task-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## Key Components

### Auth Components
- `Login`: Email/password login form
- `Register`: User registration form
- `ForgotPassword`: Password recovery
- `GoogleButton`: Google OAuth integration

### Task Components
- `TaskBoard`: Main Kanban board component
- `TaskColumn`: Individual column for task status
- `TaskCard`: Draggable task card component
- `AddTaskForm`: Task creation form

### Feed Components
- `FeedList`: Social feed container
- `PostCard`: Individual post display
- `CreatePost`: Post creation with image upload
- `ImageUploadField`: Image upload component

### Shared Components
- `Button`: Reusable button component
- `FormInput`: Form input with validation
- `Modal`: Reusable modal dialog
- `LoadingSpinner`: Loading state indicator

### Google OAuth Flow
1. User clicks Google sign-in button
2. OAuth popup opens
3. Upon successful authentication, callback updates app state
4. User is redirected to dashboard

## Task Management

### Task States
- Pending
- In Progress
- Completed

### Drag and Drop
Implemented using react-beautiful-dnd with the following features:
- Drag tasks between columns
- Automatic status update
- Optimistic UI updates
- Error handling with rollback

## Social Feed

### Features
- Image upload with preview
- Post creation with captions
- Responsive image display
- Delete functionality for own posts

### Image Upload
Images are processed and uploaded to Cloudinary through the backend API:
- Client-side image preview
- Progress indicators

## Styling

The application uses Tailwind CSS with custom configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Beautiful DND for drag-and-drop functionality
- Tailwind CSS for styling utilities
- React-Toastify for notifications
- Google OAuth for authentication
