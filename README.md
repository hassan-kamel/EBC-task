# EbcTask

# Angular Application

## Overview

This Angular application demonstrates several key functionalities, including component communication, HTTP interceptors, route guards, and routing and navigation. The application includes a login page for user authentication, a dashboard for displaying a list of users with pagination, and a details page for displaying detailed information about a selected user.

## Features

1. **Component Communication**:

   - Implemented communication between parent and child components, as well as sibling components.
   - Example: The home product list communicates with the product card.

2. **HTTP Interceptors**:

   - Implemented interceptors to handle authentication, display a loading spinner during HTTP requests, and handle global errors.

3. **Route Guards**:

   - Used route guards to restrict access to sensitive routes based on the presence of a JWT token in local storage.

4. **Routing and Navigation**:
   - Proper routing and navigation throughout the application, including protected routes.

## Components

### Login Page

- Allows user authentication and securely stores the obtained token in local storage.

### Dashboard Page

- Displays a list of users with pagination.
- This page is restricted to authenticated users only.

### Home Page

- Includes a product list with search functionality.
- Demonstrates parent-to-child and child-to-parent communication.

## Additional Implementations

- **Pagination**: Implemented pagination for the user list in the dashboard, which requires a JWT token to access.
- **Add to Favorite**: Utilized Angular signals for the add to favorite functionality.
- **State Management**: Used RxJS for state management in some places and Angular Signals in others. Instead of over-engineering with tools like NgRx.
- **Error Handling**: Gracefully handles HTTP errors and displays user-friendly error messages.

## Interceptors

1. **JWT Interceptor**: Patches JWT to HTTP requests.
2. **Loading Spinner Interceptor**: Displays a loading spinner during HTTP requests.
3. **Global Error Handling Interceptor**: Handles global errors and displays user-friendly error messages.

## Angular Guards

- **Auth Guard**: Protects routes that require a token in local storage.
- **No Auth Guard**: Protects the login page to ensure it is only accessible when there is no token in local storage.

## Deployment

The application is deployed to Vercel. You can access it at [ebc-task.vercel.app](https://ebc-task.vercel.app).

## Source Code

The source code for the application is available on GitHub at [https://github.com/hassan-kamel/ebc-task](https://github.com/hassan-kamel/ebc-task).

## Running the Application Locally

To run the application locally, follow these steps:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `ng serve` to start the development server.
4. Navigate to `http://localhost:4200/` to access the application.

## Conclusion

This application showcases the implementation of essential Angular features and best practices. It provides a solid foundation for building more complex applications with robust authentication, routing, and state management functionalities.
