# Project Overview

This is a React Native mobile application called "Tasker". It allows users to manage their tasks, view tasks assigned by friends, and collaborate on tasks. The app uses a stack-based navigation for authentication screens and a bottom-tab navigation for the main app screens.

The backend is a Node.js application that uses Express.js to provide a RESTful API for managing users, tasks, and friends. It also uses Socket.io for real-time communication with the client.

## Main Technologies

### Client

*   **React Native:** The core framework for building the mobile application.
*   **TypeScript:** For static typing and improved code quality.
*   **React Navigation:** For handling navigation between screens.
*   **Axios:** For making HTTP requests to the backend API.
*   **Socket.io-client:** For real-time communication.
*   **React Native Gesture Handler:** For handling touch gestures.
*   **React Native Reanimated:** For creating smooth animations.
*   **AsyncStorage:** For local data storage.

### Backend

*   **Node.js:** The core runtime for the backend application.
*   **Express.js:** A web application framework for Node.js.
*   **Mongoose:** An ODM library for MongoDB.
*   **Socket.io:** For real-time communication.
*   **JSON Web Token (JWT):** For authentication.
*   **bcrypt:** For password hashing.
*   **Nodemailer:** For sending emails.

## Architecture

### Client

The application is structured into the following main directories:

*   `src/screens`: Contains the different screens of the application.
*   `src/components`: Contains reusable UI components.
*   `src/navigation`: Defines the navigation structure of the app.
*   `src/network`: Handles API requests to the backend.
*   `src/context`: Manages global state using React Context.
*   `src/theme`: Defines the application's theme and styling.

### Backend

The application is structured into the following main directories:

*   `src/controllers`: Contains the business logic for the different API endpoints.
*   `src/models`: Defines the Mongoose schemas for the different data models.
*   `src/routes`: Defines the API routes for the different resources.
*   `src/middleware`: Contains middleware functions for authentication and other tasks.
*   `src/templates`: Contains email templates.

# Building and Running

## Client

To build and run the application, follow these steps:

1.  **Install Dependencies:**
    ```bash
    cd client
    npm install
    # or
    yarn install
    ```

2.  **Start Metro Bundler:**
    ```bash
    npm start
    # or
    yarn start
    ```

3.  **Run on Android:**
    ```bash
    npm run android
    # or
    yarn android
    ```

4.  **Run on iOS:**
    ```bash
    cd ios && pod install && cd ..
    npm run ios
    # or
    yarn ios
    ```

## Backend

To build and run the application, follow these steps:

1.  **Install Dependencies:**
    ```bash
    cd backend
    npm install
    # or
    yarn install
    ```

2.  **Start the Server:**
    ```bash
    npm start
    # or
    yarn start
    ```

The server will start on the port specified in the `.env` file.

# Development Conventions

## Client

*   **Linting:** The project uses ESLint for code linting. Run `npm run lint` to check for linting errors.
*   **Testing:** The project uses Jest for testing. Run `npm run test` to run the tests.
*   **Styling:** The application uses a custom theme defined in the `src/theme` directory. All colors, fonts, and spacing are defined in the theme files.
*   **State Management:** Global state is managed using React Context. The different contexts are defined in the `src/context` directory.
*   **API Requests:** All API requests are handled in the `src/network` directory. The `Client.ts` file configures the Axios client, and the other files in the directory define the API endpoints for different resources.

## Backend

*   **Linting:** The project does not have a linter configured.
*   **Testing:** The project does not have a testing framework configured.
*   **API Routes:** All API routes are defined in the `src/routes` directory. The routes are prefixed with `/api`.
*   **Authentication:** The application uses JWT for authentication. The `auth` middleware function in `src/middleware/auth.js` is used to protect routes that require authentication.
*   **Error Handling:** The application does not have a centralized error handling mechanism.
