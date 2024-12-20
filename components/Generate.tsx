import Logout from "./Logout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../interfaces/UserData";
import { Avatar, Box, Stack, Typography, Card } from "@mui/joy";

const Generate: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/me", { credentials: "include" })
      .then((res) => {
        if (res.status !== 200) {
          window.location.href = "http://localhost:5000/login";
          return null;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setUserData(data);
        }
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, [navigate]);
  return (
    <div className="generate-section">
      <section className="generate-data">
        {userData ? (
          <div className="generate-user-data">
            <Card
              variant="outlined"
              sx={{
                width: "50%",
                minWidth: "300px",
                margin: "2rem auto", // Centered with spacing
                padding: "1.5rem",
                boxShadow: "lg",
                borderRadius: "12px",
                backgroundColor: "gold",
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
                  src={userData.images[0]?.url}
                  alt="playlistly"
                  sx={{
                    width: userData.images[0]?.width,
                    height: userData.images[0]?.height,
                  }}
                />
                <Box textAlign="center">
                  <Typography level="h1" sx={{ fontWeight: "bold" }}>
                    {userData.display_name}
                  </Typography>
                  <Typography level="body-lg" color="neutral">
                    <b>Welcome {userData.display_name}!</b>
                  </Typography>
                  <Typography level="body-sm" color="neutral">
                    <b>Followers: {userData.followers.total}</b>
                  </Typography>
                  <Typography level="body-sm" color="neutral">
                    <b>email: {userData.email}</b>
                  </Typography>
                </Box>
              </Stack>
            </Card>
            <Logout />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
};
export default Generate;
