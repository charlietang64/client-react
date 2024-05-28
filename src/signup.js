import { useState, useEffect } from "react";
import axios from "axios";
import LoginPage from "./login";
import Modal from "react-modal";

/**
 * SignupPage Component
 * 
 * This component renders a signup form that allows users to create a new account. The form includes fields for username, password, email, first name, and last name. It also performs client-side validation for the password and email fields.
 * 
 * State Variables:
 * - username: The username entered by the user.
 * - secret: The password entered by the user.
 * - email: The email entered by the user.
 * - first_name: The first name entered by the user.
 * - last_name: The last name entered by the user.
 * - showLogin: A boolean that controls whether to display the login page.
 * - errorMessage: A string that holds error messages related to username or signup process.
 * - passwordError: A string that holds error messages related to password validation.
 * - emailError: A string that holds error messages related to email validation.
 * - showModal: A boolean that controls the display of the success modal.
 * - successMessage: A string that holds the success message to be displayed in the modal.
 * 
 * Functions:
 * - onSignup: Handles the form submission, validates inputs, and sends a signup request to the server.
 * - toggleLogin: Toggles the display of the login page.
 * 
 * useEffect Hooks:
 * - Validates the password to ensure it is at least 8 characters long and contains at least one numerical value.
 * - Validates the email to ensure it is from the "greenriver.edu" domain.
 * - Clears the error message when the username is updated.
 * 
 * Usage:
 * ```
 * <SignupPage onAuth={yourAuthHandler} />
 * ```
 * 
 * Notes:
 * - The `onAuth` prop should be a function that handles the authentication logic after a successful signup.
 * - Make sure to configure the `axios` requests to point to the correct API endpoints.
 * 
 */
const SignupPage = (props) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [showLogin, setLogin] = useState(false);
  const [errorMessage, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Handles the form submission for signup.
   * Validates the form inputs and sends a signup request to the server.
   * Displays success or error messages based on the response.
   */
  const onSignup = (e) => {
    e.preventDefault();

    // Check if there are any errors
    if (passwordError || errorMessage || emailError) {
      return; // Prevent form submission if there are errors
    }

    axios
      .post("https://chat-app-v84a.onrender.com/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((r) => {
        props.onAuth({ ...r.data, secret });
        setShowModal(true);
        setSuccessMessage("Sign up successful! Please check your email to verify your account.");
      })
      .catch((error) => {
        if (error.response) {
          setError("Username already exists");
        } else {
          console.log("Error");
        }
      });
  };

  /**
   * Validates the password to ensure it meets the requirements.
   */
  useEffect(() => {
    if (secret.length > 0 && (secret.length < 8 || !/\d/.test(secret))) {
      setPasswordError("Password must be at least 8 characters long and include at least one numerical value");
    } else {
      setPasswordError("");
    }
  }, [secret]);

  /**
   * Validates the email to ensure it is from the "greenriver.edu" domain.
   */
  useEffect(() => {
    if (!email.endsWith("greenriver.edu")) {
      setEmailError("Email must be from a greenriver.edu domain");
    } else {
      setEmailError("");
    }
  }, [email]);

  /**
   * Clears the error message when the username is updated.
   */
  useEffect(() => {
    setError("");
  }, [username]);

  /**
   * Toggles the display of the login page.
   */
  const toggleLogin = () => {
    setLogin(!showLogin);
  };

  if (showLogin) {
    // Display the LoginPage component if showLogin is true
    return <LoginPage {...props} />;
  }

  
  return (
    <div className="login-page">
      <div className="card">
      <form onSubmit={onSignup}>
        <div className="title">Sign Up</div>
        {errorMessage && <div style={{ color: "red"}}>{errorMessage}</div>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {passwordError && <div style={{ color: "red"}}>{passwordError}</div>}
        <input
          type="password"
          name="secret"
          placeholder="Password"
          onChange={(e) => setSecret(e.target.value)}
          required
        />
        {emailError && <div style={{ color:"red" }}>{emailError}</div>}
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <button id="submit" type="submit">SIGN UP</button>
      </form>
      <div>
          Already have an account?{" "}
          <button onClick={toggleLogin} className="sign-up-button" style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer", color: "#00563f", fontSize: "16px" }}>
            Login
          </button>
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
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      contentLabel="Success Modal"
      >
        <h2>Success!</h2>
        <p>{successMessage}</p>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>
  </div>
  );
};

export default SignupPage;