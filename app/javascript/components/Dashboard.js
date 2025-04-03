import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Container, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success', 'error', 'info', 'warning'
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  const handleReferral = async () => {
    if (!email) {
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("/api/v1/referrals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSnackbarMessage("Referral sent successfully!");
        setSnackbarSeverity("success");
        setEmail(""); 
      } else {
        setSnackbarMessage("Failed to send referral");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error sending referral:", error);
      setSnackbarMessage("An unexpected error occurred. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
        padding: 3,
      }}
    >
      <Button
        variant="outlined"
        color="error"
        onClick={handleLogout}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        Logout
      </Button>

      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: "text.secondary" }}>
        Send referrals to invite others to join the platform.
      </Typography>

      <TextField
        label="Referral Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ maxWidth: 400 }}
        placeholder="Enter email address"
        type="email" 
        required
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleReferral}
        sx={{ marginTop: 2 }}
      >
        Send Referral
      </Button>

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
    </Container>
  );
};

export default Dashboard;
