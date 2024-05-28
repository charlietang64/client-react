import { useState, useEffect } from "react";
import axios from "axios";
import SignupPage from "./signup";

/**
 * LoginPage Component
 * 
 * This component handles user login functionality and toggles to the signup page.
 * 
 * Props:
 * - props.onAuth: Function to be called upon successful authentication.
 */

const LoginPage = (props) => {
  // State variables to manage username, secret (password), error messages, and whether to show the signup page
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [showSignUp, setSignUp] = useState(false);
  const [error, setError] = useState("");

  // Effect to change the document title based on whether the signup page is shown
  useEffect(() => {
    document.title = showSignUp ? 'Sign up' : 'Login';
  }, [showSignUp]);

  /**
   * onLogin function
   * 
   * This function is called when the login form is submitted.
   * It sends a POST request to the login endpoint with the username and password.
   * If the login is successful, it calls the onAuth prop with the user data.
   * If there is an error, it sets an appropriate error message.
   * 
   * @param {Event} e - The form submission event.
   */
  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post(`https://chat-app-v84a.onrender.com/login`, { username, secret })
      .then((r) => {
        if (r && r.data) {
          props.onAuth({ ...r.data, secret });
        } else {
          console.log("Response or data is undefined:", r);
          setError("Invalid username or password");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError("Account not verified. Please check your email for verification link.");
        } else {
          setError("Invalid username or password.");
        }
        console.log("Error:", error);
      });
  };

  /**
   * toggleSignUp function
   * 
   * This function toggles the showSignUp state between true and false.
   */
  const toggleSignUp = () => {
    setSignUp(!showSignUp);
  };

  // If showSignUp is true, render the SignupPage component
  if (showSignUp) {
    return <SignupPage {...props} />;
  }

  return (
    <div className="login-page">
      <div className="card">
        <form onSubmit={onLogin}>
          <div className="title">Login</div>
          {error && <div style={{ color: "red" }} className="error">{error}</div>} {/* Display error message */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <button id="submit" type="submit">LOG IN</button>
        </form>
        {/* Link to toggle SignUp page */}
        <div>
          Don't have an account?{" "}
          <button onClick={toggleSignUp} className="sign-up-button" style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer", color: "#00563f", fontSize: "16px" }}>
            Sign Up
          </button>
        </div>
      </div>
      <style>{`
        .login-page { 
          width: 100vw; 
          height: 100vh; 
          padding-top: 6vw; 
          background: linear-gradient(180deg, rgba(34,139,34,1) 7%, rgba(34,139,34,1) 17%, rgba(0,128,0,1) 29%, rgba(50,205,50,1) 44%, rgba(60,179,113,1) 66%, rgba(85,107,47,1) 83%, rgba(107,142,35,1) 96%, rgba(124,252,0,1) 100%); 
        }
        .card { 
          width: 280px; /* Increased width for better form spacing */
          position: relative; 
          left: calc(50vw - 140px); /* Adjusted for increased widths */
          text-align: center; 
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.2); /* Enhanced shadow for better depth */
          background: #f0f0f0; /* Lighter background for the form area */
          padding: 20px;
          margin-top: 20px; /* Added margin top for better position */
        }
        .title { 
          margin-bottom: 20px; /* Increased space below title */
          font-size: 24px; /* Slightly larger font size */
          color: #00563f; /* Dark green, kept for consistency */
          font-weight: 700; 
        }
        input { 
          width: calc(100% - 20px); /* Adjust input width for padding */
          margin-top: 12px; 
          padding: 10px; /* Slightly larger padding for better readability */
          background-color: #ffffff; 
          outline: none; 
          border: 2px solid #00563f; 
          border-radius: 4px; 
          color: #00563f; /* Text color changed for better visibility */
          font-size: 16px; /* Larger font size for readability */
        }
        #submit { 
          margin-top: 16px; 
          width: calc(100% - 20px); /* Button width adjusted for padding */
          padding: 10px; 
          background-color: #007849; /* Adjusted button color for better visibility */
          color: #ffffff; 
          border: none; 
          border-radius: 4px; 
          font-size: 16px; /* Increased font size for buttons */
          font-weight: 600; /* Bold font weight for button text */
        }
        button:hover {
          background-color: #00563f; /* Slightly darker green on hover for feedback */
        }
        .sign-up-button {
          background: none;
          border: none;
          text-decoration: underline;
          cursor: pointer;
          color: #00563f;
          font-size: 16px;
        }
        .sign-up-button:hover {
          background-color: rgba(0, 86, 63, 0.1); /* Lighter green on hover */
        }
      `}</style>
    </div>
  );
};

export default LoginPage;