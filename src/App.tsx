import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Card,
  Typography,
  Avatar,
  Box,
  Stack,
  Link as JoyLink,
} from "@mui/joy";
import Home from "../components/Home";
import Generate from "../components/Generate";

const App: React.FC = () => {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: "50%",
            minWidth: "300px",
            margin: "2rem auto", // Centered with spacing
            padding: "1.5rem",
            boxShadow: "lg",
            borderRadius: "12px",
            backgroundColor: "white",
            // Media query for smaller screens
            "@media (max-width: 768px)": {
              width: "100%", // Full width on small devices
              margin: "0", // Remove margins
              borderRadius: "0", // Remove rounded corners
              position: "absolute", // Stick to the top
              top: 0, // Align to the top
              left: 0,
              padding: "1rem", // Slightly smaller padding
            },
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Avatar
              src={"/spotify.png"}
              alt="playlistly"
              sx={{ width: 100, height: 100 }}
            />
            <Box textAlign="center">
              <Typography level="h1" sx={{ fontWeight: "bold" }}>
                playlistly
              </Typography>
              <Typography level="body-lg" color="neutral">
                <b>Welcome to playlistly.</b>
              </Typography>
            </Box>
            {/* Navigation Links */}
            <Box>
              <Stack direction="row" spacing={2} justifyContent="center">
                <JoyLink component={Link} to="/" color="primary">
                  Home
                </JoyLink>
                <JoyLink component={Link} to="/generate" color="primary">
                  Generate
                </JoyLink>
              </Stack>
            </Box>
          </Stack>
        </Card>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
