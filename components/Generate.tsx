import Logout from "./Logout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../interfaces/UserData";
import { Avatar, Box, Stack, Typography, Card } from "@mui/joy";
import HomeButton from "./HomeButton";
import GenerateForm from "./GenerateForm";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <section className="generate-data">
        {userData ? (
          <div className="generate-user-data">
            <Card
              variant="outlined"
              sx={{
                width: "50%",
                minWidth: "300px",
                margin: "0 auto",
                padding: "1.5rem",
                boxShadow: "lg",
                borderRadius: "12px",
                backgroundColor: "gold",
                textAlign: "center",
                "@media (max-width: 768px)": {
                  width: "100%",
                  margin: "0",
                  borderRadius: "0",
                  padding: "1rem",
                },
              }}
            >
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={userData.images[0]?.url}
                  alt="playlistly"
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
                <Box>
                  <Typography
                    level="h1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {userData.display_name}
                  </Typography>
                  <Typography level="body-lg">
                    <b>Welcome, {userData.display_name}!</b>
                  </Typography>
                  <Typography level="body-sm">
                    <b>Followers: {userData.followers.total}</b>
                  </Typography>
                  <Typography level="body-sm">
                    <b>Email: {userData.email}</b>
                  </Typography>
                </Box>
              </Stack>
            </Card>
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <HomeButton />
              <Logout />
            </div>
            <section className="generate-form-section">
              <GenerateForm />
            </section>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
};

export default Generate;
