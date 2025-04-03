import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.post("/api/v1/users/login", formData);
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        setSnackbarMessage("Login successful! Redirecting to dashboard...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setSnackbarMessage(err.response.data.error || "Login failed. Please try again.");
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("An unexpected error occurred. Please try again later.");
        setSnackbarSeverity("error");
      }
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          Log In
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log In
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          Don't have an account?{" "}
          <Button
            color="secondary"
            onClick={() => navigate("/signup")}
            sx={{ textTransform: "none" }}
          >
            Sign Up
          </Button>
        </Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
