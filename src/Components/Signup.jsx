import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import "../Components/Login.css";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";
import "../Components/Login.css";

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

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/signup', { name, email, password })
      .then(result =>{ console.log(result)
        navigate('/Login');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="sup">
      <div className="main" style={{ boxSizing: "border-box" }}>
        <div className="mini" style={{ marginTop: "-5rem", marginBottom: "15rem" }}>
          <h1>Create Account</h1>
          <div className="login" style={{ marginTop: "1rem" }}>
            <div className="container m-3" id="dd">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter Your Full Name</label>
                <Box sx={{ width: 500, maxWidth: "100%" }} className="as">
                  <WhiteTextField
                    fullWidth
                    label="name"
                    type="text"
                    id="fullWidth"
                    name="name"
                    placeholder="name"
                    className="input"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon style={{ color: "white" }} />
                      )
                    }}
                  />
                </Box>
                <label htmlFor="email">Enter Your Email</label>
                <Box sx={{ width: 500, maxWidth: "100%" }} className="as">
                  <WhiteTextField
                    fullWidth
                    label="Email"
                    id="fullWidth"
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon style={{ color: "white" }} />
                      )
                    }}
                  />
                </Box>
                <label htmlFor="password">Create Your Password</label>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <LockIcon style={{ color: "white" }} />
                      )
                    }}
                  />
                </Box>
                <label htmlFor="remember">Already Have Account ?</label>
                <Link to="/Login" className="m-3 btn btn-danger">
                  Login Now
                </Link>
                <Button type="submit" variant="outlined" color="error">
                  Sign up
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
