import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Clear previous errors
      const response = await axios.post("/api/v1/users/signup", { user: formData });
      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.token);
        alert("Signup successful! Please log in.");
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Signup failed. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="grey.100"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        p={3}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        maxWidth={400}
        width="100%"
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          Already have an account?{" "}
          <Button
            color="secondary"
            onClick={() => navigate("/login")}
            sx={{ textTransform: "none" }}
          >
            Log In
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
