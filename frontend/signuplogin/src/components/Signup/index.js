import "./index.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showHidePassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePassword = () => {
    setShowPassword(!showHidePassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let valid = true;

    if (!formData.username) {
      setUsernameError("Username is required");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!formData.email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Email is invalid");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!formData.password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const response = await axios.post(
          "http://localhost:3000/signup",
          formData
        );
        console.log("Signup successful", response.data);
        navigate("/");
      } catch (error) {
        console.error("Signup failed", error);
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Signup below</h1>
        <div>
          <label className="details-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            id="username"
            className="input-bar"
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
          {usernameError && <p className="warning">{usernameError}</p>}
        </div>
        <div>
          <label className="details-label" htmlFor="email">
            EMAIL ID
          </label>
          <br />
          <input
            type="text"
            className="input-bar"
            id="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          {emailError && <p className="warning">{emailError}</p>}
        </div>
        <div>
          <label className="details-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            type={showHidePassword ? "text" : "password"}
            className="input-bar"
            id="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
          />
          {passwordError && <p className="warning">{passwordError}</p>}
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="show-password" onChange={togglePassword} />
          <label htmlFor="show-password" className="show-hide-password">
            SHOW PASSWORD
          </label>
        </div>
        <div className="align-button">
          <button type="submit" className="signup-button">
            Signup
          </button>
        </div>
        <p>
          Already have an account?
          <a href="/" className="redirect">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
