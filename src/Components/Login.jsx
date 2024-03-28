import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const WhiteTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "white",
  },
});

function LoginForm({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // State to hold login error
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/Login', { email, password })
      .then(result => { 
        console.log(result);
        if (result.data.token) {
          // If token received, store it in local storage
          localStorage.setItem('token', result.data.token);
          // Update isLoggedIn state
          setIsLoggedIn(true);
          // Redirect to Home page
          navigate('/Home');
        } else if (result.data.error === "Incorrect Password") {
          setLoginError("Incorrect Password"); // Set login error state
        } else {
          setLoginError("Account Not Found"); // Set login error state
        }
      })
      .catch(err => console.log(err));
  };
  
  
  return (
    <div className="sup">
      <div className="main">
        <h1>Login Now</h1>
        <p>{loginError}</p> {/* Render login error message */}
        <div className="login">
          <div className="container m-3" id="dd">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Enter Your Email</label>
              <Box sx={{ width: 500, maxWidth: "100%" }} className="as">
                <WhiteTextField
                  fullWidth
                  label="Email"
                  id="fullWidth"
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon style={{ color: "white" }} />
                    )
                  }}
                />
              </Box>
              <label htmlFor="password">Enter Your Password</label>
              <Box sx={{ width: 500, maxWidth: "100%" }} className="as1">
                <WhiteTextField
                  fullWidth
                  label="Password"
                  id="fullWidth"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <LockIcon style={{ color: "white" }} />
                    )
                  }}
                />
              </Box>
              <Checkbox name="remember" defaultChecked color="error" />
              <label htmlFor="remember">Remember me ?</label>
              <Link to="/Signup" className="m-3 btn btn-danger">
                Create Account
              </Link>
       
              <Button type="submit" variant="outlined" color="error" style={{ marginTop: '2rem', marginBottom: '2rem', display: 'block', marginRight: "12rem" }}>
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
