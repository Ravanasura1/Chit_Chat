# Chit Chat

Chit Chat is a real-time chat application where users can sign up, sign in, and communicate with others in real-time. After signing up, users can change their profile picture and interact with online users seamlessly. The app uses WebSocket technology for instant messaging and is built using modern technologies like React, Vite, TailwindCSS, DaisyUI, and more.

## Features
- User registration and login with JWT authentication.
- Profile management (change your profile picture).
- Real-time messaging using Socket.IO.
- Responsive design with TailwindCSS and DaisyUI.
- Secure authentication with JWT, BcryptJS, and cookie parsing.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies](#technologies)
4. [Contributing](#contributing)
5. [License](#license)

## Installation

To get the Chit Chat app up and running locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Ravanasura1/Chit_Chat.git
    ```

2. **Navigate into the project folder:**
    ```bash
    cd Chit_Chat
    ```

3. **Install the dependencies for both frontend and backend:**

   - Frontend (React app):
     ```bash
     cd frontend
     npm install
     ```

   - Backend (Node.js app):
     ```bash
     cd backend
     npm install
     ```

4. **Set up environment variables:**
    - Create a `.env` file in the `backend` directory and add the necessary environment variables:
      ```
      MONGO_URI=<your_mongo_connection_string>
      JWT_SECRET=<your_jwt_secret_key>
      COOKIE_SECRET=<your_cookie_secret_key>
      ```

5. **Start both frontend and backend:**
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```

   - Start the frontend development server (with Vite):
     ```bash
     cd frontend
     npm run dev
     ```

   The app should now be running at `http://localhost:3000`.

## Usage

Once the application is running locally, you can:

1. **Sign up** to create a new user account.
2. **Sign in** with your credentials.
3. **Change your profile picture** by uploading a new image.
4. **Talk with online users** in real-time using the chat interface.

The chat interface will automatically update when messages are sent or received, providing a smooth experience for users.

## Technologies

The Chit Chat app is built with the following technologies:

- **Frontend:**
  - Vite
  - React.js
  - TailwindCSS
  - DaisyUI (for UI components)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT (JSON Web Token) for authentication
  - BcryptJS for password hashing
  - Socket.IO for real-time communication
  - dotenv for managing environment variables
  - cookie-parser for parsing cookies

## Contributing

We welcome contributions to this project. If you have any suggestions or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

