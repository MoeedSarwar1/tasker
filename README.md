# Tasker

![Tasker Logo](client/assets/images/logo.png)

**Tasker** is a modern, cross-platform mobile application designed to help you manage your tasks, collaborate with friends, and stay organized. Whether you're tracking personal to-dos or coordinating on a project with others, Tasker provides a seamless and real-time experience.

## Features

*   **User Authentication:** Secure sign-up and login functionality.
*   **Task Management:** Create, view, update, and delete your personal tasks.
*   **Social Collaboration:** Add friends, assign tasks to them, and view tasks they've assigned to you.
*   **Real-time Updates:** Utilizes WebSockets to ensure your task lists are always in sync.
*   **Cross-Platform:** Built with React Native for a consistent experience on both iOS and Android.
*   **Customizable Theme:** Light and dark mode support to suit your preference.

## Tech Stack

Tasker is a full-stack application built with a modern technology stack.

### Client (Mobile App)

*   **Framework:** [React Native](https://reactnative.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Navigation:** [React Navigation](https://reactnavigation.org/)
*   **State Management:** React Context
*   **HTTP Client:** [Axios](https://axios-http.com/)
*   **WebSockets:** [Socket.io-client](https://socket.io/docs/v4/client-api/)

### Backend

*   **Framework:** [Express.js](https://expressjs.com/)
*   **Language:** [Node.js](https://nodejs.org/)
*   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
*   **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/)
*   **WebSockets:** [Socket.io](https://socket.io/)

## Getting Started

To get the application up and running on your local machine, follow these steps.

### Prerequisites

*   Node.js (>=20.x)
*   Yarn or npm
*   React Native development environment set up (see [React Native docs](https://reactnative.dev/docs/environment-setup))
*   MongoDB instance (local or cloud)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MoeedSarwar1/tasker.git
    cd tasker
    ```

2.  **Set up the Backend:**
    ```bash
    cd backend
    yarn install
    # Create a .env file based on .env.example and add your MongoDB URI and other secrets
    yarn start
    ```

3.  **Set up the Client:**
    ```bash
    cd ../client
    yarn install
    # Create a .env file with the API_URL pointing to your backend server
    ```

4.  **Run the application:**

    *   **For iOS:**
        ```bash
        cd ios && pod install && cd ..
        yarn ios
        ```
    *   **For Android:**
        ```bash
        yarn android
        ```

## Contributing

Contributions are welcome! If you have a feature request, bug report, or want to contribute to the code, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
