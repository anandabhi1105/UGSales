import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import {
  Paper,
  Typography,
  OutlinedInput,
  FormLabel,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, email, password, phoneNo);
      setSuccessDialogOpen(true);
    } catch (err) {
      setError("Sign up failed. Please try again.");
    }
  };

  const handleDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Your JD Sales Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          sx={{ mb: 3 }}
        >
          Sign up to manage your sales, track performance, and grow your business.
        </Typography>

        <form onSubmit={handleSignUp}>
          <Grid container spacing={3}>
            <FormGrid item xs={12}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <OutlinedInput
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                size="small"
                fullWidth
                required
              />
            </FormGrid>

            <FormGrid item xs={12}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <OutlinedInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                size="small"
                fullWidth
                required
              />
            </FormGrid>

            <FormGrid item xs={12}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <OutlinedInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                size="small"
                fullWidth
                required
              />
            </FormGrid>

            <FormGrid item xs={12}>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <OutlinedInput
                id="phone"
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Enter your phone number"
                size="small"
                fullWidth
              />
            </FormGrid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2" align="center">
                  {error}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" align="center" color="textSecondary">
                Already have an account?
                <Link to="/login" style={{ color: "#1976d2" }}>
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="caption"
          display="block"
          align="center"
          color="textSecondary"
          sx={{ mt: 4 }}
        >
          &copy; {new Date().getFullYear()} JD Sales. All rights reserved.
        </Typography>
      </Paper>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography>You have registered successfully. Please log in to continue.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SignUp;
