# Green River College Chat App

This is a chat application built with React.js, designed specifically for Green River College students and staff. The application provides a secure and user-friendly platform for direct messaging and community discussions.

## Features

- User authentication (signup, login, and email verification)
- Direct messaging between users
- Community chat room
- Admin panel for user management (view, delete users)
- Client-side form validation
- Responsive design

## Technologies Used

- React.js
- Axios (for API requests)
- react-chat-engine (for chat functionality)

## Getting Started

1. Clone the repository:
git clone https://github.com/your-repo/green-river-chat-app.git

2. Install dependencies:
- cd green-river-chat-app
- npm install

3. Configure the necessary environment variables for the API endpoints and Chat Engine project credentials.

4. Start the development server:
- npm start

5. Open your web browser and navigate to `http://localhost:3000` to see the application.

## Usage

### Authentication

- Users can sign up for a new account by providing their username, password, email, first name, and last name. Email addresses must be from the `greenriver.edu` domain.
- After signing up, users will receive a verification email to confirm their account.
- Existing users can log in with their username and password.

### Chat

- Authenticated users can access the direct messaging feature, which allows them to chat with other users.
- Users can also join the community chat room by clicking the house icon in the chat interface.

### Admin Panel

- Users with the username 'admin' will be redirected to the admin panel upon login.
- The admin panel displays a list of all registered users.
- Admins can delete users from the list, except for the 'admin' user.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
