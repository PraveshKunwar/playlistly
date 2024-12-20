import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar, Button } from "@mui/joy";
import { UserData } from "../interfaces/UserData";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data) setUserData(data);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/login";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      {userData ? (
        <>
          <Avatar
            sx={{ width: 128, height: 128 }}
            src={userData.images[0]?.url}
          />
          <h3>Welcome back, {userData.display_name}!</h3>
          <Button
            variant="plain"
            onClick={() => navigate("/generate")}
            endDecorator={<LoginIcon />}
            style={{
              backgroundColor: "white",
              color: "#333",
              border: "2px solid #ddd",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Go to Playlist Generator
          </Button>
        </>
      ) : (
        <Button
          variant="plain"
          onClick={handleLogin}
          endDecorator={<LoginIcon />}
          style={{
            backgroundColor: "white",
            color: "#333",
            border: "2px solid #ddd",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Login;
