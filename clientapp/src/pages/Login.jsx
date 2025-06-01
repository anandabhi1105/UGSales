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
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
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
          Login to JD Sales
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
          Enter your credentials to access your sales dashboard.
        </Typography>

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
            />
          </FormGrid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" align="center" color="textSecondary" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#1976d2" }}>
                Sign up
              </Link>
            </Typography>
          </Grid>
        </Grid>

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
    </Box>
  );
};

export default Login;
